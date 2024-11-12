<template>
    <div class="bg-gray-50 py-8 antialiased md:py-12">
        <div class="mx-auto max-w-screen-2xl px-4 2xl:px-0">
            <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                <div>
                    <nav class="flex" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li class="inline-flex items-center">
                                <NuxtLink to="/"
                                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600">
                                    <svg class="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Home
                                </NuxtLink>
                            </li>
                        </ol>
                    </nav>
                    <h2 class="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">Products</h2>
                </div>
                <SearchBar v-model="searchQuery" @search="handleSearch" />
            </div>

            <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-5">
                <ClientOnly>
                    <ItemProduct :products="filteredProducts" />
                    <template #fallback>
                        <div class="animate-pulse bg-gray-200 rounded-lg h-48"></div>
                    </template>
                </ClientOnly>
            </div>

            <div v-if="isLoading" class="flex justify-center my-4">
                <div class="animate-spin rounded-full h-[100px] w-[100px] border-t-[5px] border-blue-500"></div>
            </div>

            <div v-if="!isLoading && filteredProducts.length === 0" class="text-center py-8">
                <p class="text-gray-500">No products found.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { useAsyncData, useCookie } from '#app';
import { getProducts } from '~/service/products';
import ItemProduct from './component/ItemProduct.vue';
import SearchBar from './component/ComponentInput.vue';

const products = ref([]);
const isLoading = ref(false);
const currentPage = ref(1);
const hasMorePages = ref(true);
const searchQuery = ref('');

const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value;

    const query = searchQuery.value.toLowerCase();
    return products.value.filter(product =>
        product.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
    );
});

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const fetchProducts = async (page = 1, reset = false) => {
    if (isLoading.value || (!hasMorePages.value && !reset)) return;

    try {
        isLoading.value = true;
        const cookieToken = useCookie('token');
        const response = await getProducts(cookieToken.value, page);
        if (process.server) {
            console.log("Đang chạy trên SSR (server-side)");
        }
        if (process.client) {
            console.log("Đang chạy trên CSR (client-side)");
        }


        if (!response.data?.length) {
            hasMorePages.value = false;
            return;
        }

        products.value = reset ? response.data : [...products.value, ...response.data];
        hasMorePages.value = page < Math.ceil(response.total / 10);

        if (hasMorePages.value) {
            currentPage.value = page + 1;
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        isLoading.value = false;
    }
};

const { data: initialData } = await useAsyncData(
    'initial-products',
    async () => {
        if (process.server) {
            console.log("Đang chạy trên SSR (server-side)");
        }
        if (process.client) {
            console.log("Đang chạy trên CSR (client-side)");
        }

        const cookieToken = useCookie('token');
        return await getProducts(cookieToken.value, 1);
    },
    {
        server: true,
        lazy: false
    }
);

if (initialData.value?.data) {
    products.value = initialData.value.data;
    currentPage.value = 2;
    hasMorePages.value = currentPage.value < Math.ceil(initialData.value.total / 10);
}

const handleScroll = debounce(() => {
    if (!process.client) return;

    const container = document.documentElement;
    const scrollPosition = window.innerHeight + container.scrollTop;
    const threshold = container.scrollHeight - 200;

    if (scrollPosition >= threshold) {
        fetchProducts(currentPage.value);
    }
}, 500);

const handleSearch = debounce(async () => {
    currentPage.value = 1;
    hasMorePages.value = true;
    await fetchProducts(1, true);
}, 300);

watchEffect(() => {
    if (searchQuery.value !== null) {
        handleSearch();
    }
});

onMounted(() => {
    if (process.client) {
        window.addEventListener('scroll', handleScroll);
    }
});

onUnmounted(() => {
    if (process.client) {
        window.removeEventListener('scroll', handleScroll);
    }
});
</script>