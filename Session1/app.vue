<template>
  <div class="flex flex-col justify-center items-center gap-[30px]">
    <h1 class="w-full text-4xl font-bold text-center mt-[30px]">TIN TỨC MỚI NHẤT</h1>
    <input type="search" v-model="textSearch"
      class="w-[600px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search product name...." required />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-[10px] lg:grid-cols- px-[50px] w-[80%] mx-auto h-auto">
      <div class="w-full h-[400px] overflow-y-hidden p-[20px] rounded-[20px] cursor-pointer"
        v-for="(item, index) in cutData" :key="index">
        <div class="transform hover:scale-105 transition duration-300 hover:text-2xl hover:font-medium hover:text-blue-500">
          <div>
            <img class="object-cover shadow-2xl w-full h-[250px] rounded-[10px] mb-[10px]" :src="item.urlToImage" />
            <p class="text-[18px]">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  setup() {
    const textSearch = ref('');
    const currentPage = ref(1);
    const itemsPerPage = ref(6);
    const newsData = ref([]);

    
    const filteredData = computed(() => {
      if (textSearch.value.length > 0) {
        return newsData.value.filter(item => 
          item.title.toLowerCase().includes(textSearch.value.toLowerCase())
        );
      }
      return newsData.value;
    });

    const fetchData = async () => {
      const res = await $fetch('/api/v1/news');
      newsData.value = res.data.articles;
    };

    watch(textSearch, () => {
      currentPage.value = 1;  
    });

    const cutData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredData.value.slice(start, end);
    });

    const changePage = (newPage) => {
      if (newPage >= 1 && newPage <= maxPage.value) {
        currentPage.value = newPage;
      }
    };

    const maxPage = computed(() => {
      return Math.ceil(filteredData.value.length / itemsPerPage.value);
    });

    fetchData();

    return {
      textSearch,
      newsData,
      cutData,
      currentPage,
      itemsPerPage,
      changePage,
      maxPage
    };
  },
};
</script>
