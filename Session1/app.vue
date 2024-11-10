<template>
  <div class="flex flex-col justify-center items-center gap-[30px]">
    <h1 class="w-full text-4xl font-bold text-center mt-[30px]">
      TIN TỨC MỚI NHẤT
    </h1>
    
    <div class="relative w-[600px]">
      <input 
        type="search" 
        v-model="textSearch"
        class="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search product name...." 
        required 
      />
      <div v-if="isSearching" class="absolute right-3 top-1/2 -translate-y-1/2">
        <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-[10px] lg:grid-cols-3 px-[50px] w-[80%] mx-auto h-auto" ref="articleContainer">
      <div 
        class="w-full h-[400px] overflow-y-hidden p-[20px] rounded-[20px] cursor-pointer"
        v-for="(item, index) in displayedArticles" 
        :key="index"
      >
        <div class="transform hover:scale-105 transition duration-300 hover:text-2xl hover:font-medium hover:text-blue-500">
          <div>
            <img 
              class="object-cover shadow-2xl w-full h-[250px] rounded-[10px] mb-[10px]" 
              :src="item.urlToImage" 
              :alt="item.title"
              @error="handleImageError"
            />
            <p class="text-[18px] line-clamp-3">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center my-4">
      <div class="animate-spin rounded-full h-[100px] w-[100px] border-t-[5px] border-blue-500"></div>
    </div>

    <div v-if="!hasMorePages && displayedArticles.length > 0" class="text-center text-gray-500 my-4">
      No more articles to load
    </div>
    
    <div v-if="displayedArticles.length === 0 && !isLoading" class="text-center text-gray-500 my-4">
      No articles found
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const textSearch = ref("");
const articles = ref([]);
const currentPage = ref(1);
const hasMorePages = ref(true);
const isLoading = ref(false);
const isSearching = ref(false);
const searchTimeout = ref(null);
const articleContainer = ref(null);

const handleSearch = async () => {
  currentPage.value = 1;
  articles.value = [];
  hasMorePages.value = true;
  
  await loadMoreArticles();
};

watch(textSearch, () => {
  isSearching.value = true;
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  
  searchTimeout.value = setTimeout(async () => {
    await handleSearch();
    isSearching.value = false;
  }, 500);
});

const loadMoreArticles = async () => {
  if (isLoading.value || !hasMorePages.value) return;

  try {
    isLoading.value = true;
    const searchParam = textSearch.value ? `&q=${encodeURIComponent(textSearch.value)}` : '';
    const response = await fetch(`/api/v1/news?page=${currentPage.value}${searchParam}`);
    const result = await response.json();

    if (result.data) {
      if (currentPage.value === 1) {
        articles.value = result.data.articles;
      } else {
        articles.value = [...articles.value, ...result.data.articles];
      }

      hasMorePages.value = result.data.pagination.hasNextPage;

      if (hasMorePages.value) {
        currentPage.value++;
      }
    }
  } catch (error) {
    console.error("Error loading news:", error);
  } finally {
    isLoading.value = false;
  }
};

const displayedArticles = computed(() => {
  if (!textSearch.value) return articles.value;
  
  return articles.value.filter(item => 
    item.title.toLowerCase().includes(textSearch.value.toLowerCase())
  );
});


const handleScroll = () => {
  if (!articleContainer.value) return;

  const container = document.documentElement;
  const scrollPosition = window.innerHeight + container.scrollTop;
  const threshold = container.scrollHeight - 200;

  if (scrollPosition >= threshold) {
    loadMoreArticles();
  }
};

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const debouncedHandleScroll = debounce(handleScroll, 200);

onMounted(() => {
  loadMoreArticles();
  window.addEventListener("scroll", debouncedHandleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", debouncedHandleScroll);
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
});
</script>