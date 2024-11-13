<template>
  <div class="bg-gray-50 py-8 antialiased md:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 2xl:px-0">
      <div
        class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8"
      >
        <h2 class="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
          Products
        </h2>
        <SearchBar v-model="searchQuery" @search="handleSearch" />
        <ComponentFilter
          v-model:minimum="minimum"
          v-model:maximum="maximum"
          v-model:selected-category-id="categoryId"
          :category="categories"
          @search="handleSearch"
        />
      </div>

      <div
        class="grid gap-7 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-5"
      >
        <ItemProduct
          v-for="item in products"
          :key="item.id"
          :item="item"
          @add="cartStore.addToCart(item)"
          @click="goToProduct(item.id)"
        />
      </div>

      <Loading v-if="isLoading" />

      <div
        v-if="!isLoading && products.length === 0"
        class="text-center cursor-pointer py-8"
      >
        <p class="text-gray-500">No products found.</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { useAsyncData, useCookie } from "#app";
import { getProducts } from "~/service/products";
import getCategory from "~/service/categories";
import ItemProduct from "./components/ItemProduct.vue";
import SearchBar from "./components/ComponentInput.vue";
import ComponentFilter from "./components/ComponentFilter.vue";
import useCartStore from "~/stores/cartStore";
import { useRouter } from "vue-router";
import Loading from "~/components/Loading.vue";

const products = ref([]);
const categories = ref([]);
const currentPage = ref(1);
const hasMorePages = ref(true);
const searchQuery = ref("");
const minimum = ref(0);
const maximum = ref(0);
const slug = ref("");
const cartStore = useCartStore();
const router = useRouter();

const categoryId = ref();

const { data, pending, refresh } = useAsyncData("products", async () => {
  const cookieToken = useCookie("token");
  const response = await getProducts(
    cookieToken.value,
    currentPage.value,
    searchQuery.value,
    categoryId.value,
    minimum.value,
    maximum.value,
    slug.value
  );
  if (process.server) {
    console.log("Đang chạy trên SSR (server-side)");
  }
  if (process.client) {
    console.log("Đang chạy trên CSR (client-side)");
  }

  if (response?.data) {
    products.value =
      currentPage.value === 1
        ? response.data
        : [...products.value, ...response.data];
    hasMorePages.value = currentPage.value < Math.ceil(response.total / 10);
  } else {
    hasMorePages.value = false;
  }

  return response.data;
});
const fetchCategory = async () => {
  const cookieToken = useCookie("token");
  const dataCategory = await getCategory(cookieToken.value);
  if (process.server) {
    console.log("Đang chạy trên SSR (server-side)");
  }
  if (process.client) {
    console.log("Đang chạy trên CSR (client-side)");
  }
  if (dataCategory?.data) {
    categories.value = dataCategory.data;
  }
};

const isLoading = computed(() => pending.value);

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const handleScroll = debounce(() => {
  if (!process.client || isLoading.value || !hasMorePages.value) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.documentElement.scrollHeight - 200;

  if (scrollPosition >= threshold) {
    currentPage.value += 1;
    refresh();
  }
}, 500);

const handleSearch = debounce(async () => {
  hasMorePages.value = true;
  await refresh();
}, 300);

watchEffect(() => {
  if (searchQuery.value !== null) {
    handleSearch();
  }
});

onMounted(() => {
  fetchCategory();
  if (process.client) {
    window.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("scroll", handleScroll);
  }
});

const goToProduct = (id) => {
  router.push(`/product/${id}`);
};
</script>