<template>
  <div class="flex gap-[50px]">
    <div
      class="flex items-center max-w-[500px] bg-gray-100 px-4 h-10 rounded-full flex-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192.904 192.904"
        width="18px"
        class="cursor-pointer fill-gray-500 mr-4 rotate-90"
      >
        <path
          d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"
        ></path>
      </svg>

      <input
        type="text"
        v-model="filters.name"
        placeholder="Search something..."
        class="outline-none text-sm bg-transparent flex-1"
        @input="handleSearch"
      />
    </div>
    <div class="cursor-pointer relative">
      <svg
        @click="toggleFilter"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
          stroke="black"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>

      <div
        v-if="isFilterOpen"
        class="box absolute z-40 right-[5px] top-[50px] z-999 rounded-xl border border-gray-300 bg-white p-6 w-[300px] md:max-w-sm"
      >
        <h6 class="font-medium text-base leading-7 uppercase text-black mb-5">
          Filter Product
        </h6>
        <div class="flex items-center mb-5 gap-1">
          <p
            class="block mb-2 text-sm font-medium text-gray-600 w-full uppercase"
          >
            Money
          </p>
          <div class="relative w-full">
            <input
              v-model="filters.min_price"
              type="number"
              class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
            />
          </div>
          <p class="px-1 font-normal text-sm leading-6 text-gray-600">to</p>
          <div class="relative w-full">
            <input
              v-model="filters.max_price"
              type="number"
              class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
            />
          </div>
        </div>

        <div class="relative w-full mb-7">
          <select
            v-model="filters.category_id"
            class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
          >
            <option value="">All Categories</option>
            <option v-for="item in categories" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <svg
            class="absolute top-1/2 -translate-y-1/2 right-4 z-50"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
              stroke="#111827"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <button
          @click="applyFilter"
          class="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-200"
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
              stroke="white"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import getCategory from "~/service/categories";

const emit = defineEmits(["filter"]);
const route = useRoute();
const router = useRouter();

const isFilterOpen = ref(false);
const categories = ref([]);

const filters = reactive({
  name: route.query.name || "",
  min_price: route.query.min_price || "",
  max_price: route.query.max_price || "",
  category_id: route.query.category || "",
});

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const fetchCategory = async () => {
  const dataCategory = await getCategory();
  if (dataCategory?.data) {
    categories.value = dataCategory.data;
  }
};

onMounted(() => {
  fetchCategory();
});
const handleSearch = () => {
  const query = {
    ...route.query,
    name: filters.name || undefined,
  };
  Object.keys(query).forEach((key) => {
    if (query[key] === undefined || query[key] === "") {
      delete query[key];
    }
  });
  router.push({ query });
  emit("search", filters);  
};
const applyFilter = () => {
  const query = {
    ...route.query,
    min_price: filters.min_price || undefined,
    max_price: filters.max_price || undefined,
    category_id: filters.category_id || undefined,
  };

  Object.keys(query).forEach((key) => {
    if (query[key] === undefined || query[key] === "") {
      delete query[key];
    }
  });

  router.push({ query });
  emit("filter", filters);
  isFilterOpen.value = false;
};
</script>
