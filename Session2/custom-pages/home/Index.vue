<template>
  <div class=" py-8 antialiased md:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 2xl:px-0">
      <div
        class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8"
      >
        <h2 class="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
          Products
        </h2>
        <ComponentFilter />
      </div>

      <div
        class="grid gap-7 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-5"
      >
        <ItemProduct
          v-for="item in products"
          :key="item.id"
          :item="item"
          @add="cartStore.addToCart(item)"
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
import { useAsyncData } from "#app";
import { getProducts } from "~/service/products";
import ItemProduct from "./components/ItemProduct.vue";
import ComponentFilter from "./components/ComponentFilter.vue";
import useCartStore from "~/stores/cartStore";
import { useRoute } from "vue-router";
import Loading from "~/components/Loading.vue";

const route = useRoute();
const products = ref([]);
const currentPage = ref(1);
const hasMorePages = ref(true);
const slug = ref("");
const cartStore = useCartStore();


const { data, pending, refresh } = useAsyncData("products", async () => {
  const response = await getProducts(
    currentPage.value,
    route.query.name || "",
    route.query.category_id || "",
    route.query.min_price || "",
    route.query.max_price || "",
    slug.value
  );

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

const isLoading = computed(() => pending.value);

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const handleScroll = debounce(() => {
  if (isLoading.value || !hasMorePages.value) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.documentElement.scrollHeight - 200;

  if (scrollPosition >= threshold) {
    currentPage.value += 1;
    refresh();
  }
}, 500);

watch(
  () => route.query,
  debounce(async () => {
    currentPage.value = 1; 
    hasMorePages.value = true;
    await refresh();
  }, 300),
  { immediate: true, deep: true }
);

onMounted(() => {

    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => { 
    window.removeEventListener("scroll", handleScroll);
});
</script>
