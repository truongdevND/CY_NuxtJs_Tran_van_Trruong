import { defineStore } from "pinia";
import { ref } from "vue";

const useProductStore = defineStore("product", () => {
  const productList = ref([]);

  const newArrayProduct = (item) => {
    productList.value.push({
      ...item
    });
  };

  const clearProduct = () => {
    productList.value = [];
  };

  return {
    productList,
    newArrayProduct,
    clearProduct
  };
});

export default useProductStore;
