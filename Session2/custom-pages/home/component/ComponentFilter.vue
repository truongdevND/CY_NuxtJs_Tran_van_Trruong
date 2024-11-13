<template>
  <div class="cursor-pointer relative">
    <svg @click="toggleFilter" width="20" height="20" viewBox="0 0 20 20" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
        stroke="black" stroke-width="1.6" stroke-linecap="round" />
    </svg>

    <div v-if="filter"
      class="box absolute right-[5px] top-[30px] z-999 rounded-xl border border-gray-300 bg-white p-6 w-[300px] md:max-w-sm">
      <h6 class="font-medium text-base leading-7 uppercase text-black mb-5">
        Filter Product
      </h6>
      <div class="flex items-center mb-5 gap-1">
        <p class="block mb-2 text-sm font-medium text-gray-600 w-full uppercase">
          Money
        </p>
        <div class="relative w-full">
          <input :value="minimum" @input="updateMinimum" type="number"
            class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white" />
        </div>
        <p class="px-1 font-normal text-sm leading-6 text-gray-600">to</p>
        <div class="relative w-full">
          <input :value="maximum" @input="updateMaximum" type="number"
            class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white" />
        </div>
      </div>

      <div class="relative w-full mb-7">
        <select :value="selectedCategoryId" @change="updateSelectcategory"
          class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white">
          <option selected>Category</option>
          <option v-for="item in category" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
        <svg class="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16" height="16" viewBox="0 0 16 16"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" stroke-width="1.6"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <button @click="emitSearch"
        class="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-200">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
            stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Search
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ComponentFilter",
  props: {
    category: {
      type: Array,
      default: () => [],
    },
    minimum: {
      type: Number,
      default: 0,
    },
    maximum: {
      type: Number,
      default: 0,
    },
    selectedCategoryId: {
      type: Number,
      default: 0,

    }
  },
  setup(props, { emit }) {
    const filter = ref(false);

    const toggleFilter = () => {
      filter.value = !filter.value;
    };

    const updateMinimum = (event) => {
      const value = Number(event.target.value);
      emit("update:minimum", value);
    };

    const updateMaximum = (event) => {
      const value = Number(event.target.value);
      emit("update:maximum", value);
    };
    const updateSelectcategory = (event) => {
      const value = String(event.target.value);
      emit("update:selectedCategoryId", value);
    };


    const emitSearch = () => {
      emit("search", { minimum: props.minimum, maximum: props.maximum, selectedCategoryId: props.selectedCategoryId });
    };

    return {
      filter,
      toggleFilter,
      emitSearch,
      updateMinimum,
      updateMaximum,
      updateSelectcategory
      ,
    };
  },
};
</script>
