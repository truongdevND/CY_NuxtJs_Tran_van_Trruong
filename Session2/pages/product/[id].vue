<script setup>
import { getProductById } from "~/service/products";
import { useRoute } from "vue-router";
import Loading from "~/components/Loading.vue";
import useCartStore from "~/stores/cartStore"
const cartStore = useCartStore();

const route = useRoute();
const productId = route.params.id;
const cookieToken = useCookie("token");
const productById = ref(null);

const fetchdata = async () => {
  const response = await getProductById(cookieToken.value, productId);
  productById.value = response;
};
watchEffect(() => {
  fetchdata();
});
</script>
<template>
  <div class="mt-[30px]">
    <div class="container mx-auto px-4 py-8">
      <Loading v-if="!productById" />
      <div v-else class="flex flex-wrap -mx-4">
        <div class="w-full md:w-1/2 px-4 mb-8">
          <img :src="productById.preview_img_path" alt="Product" class="w-full h-auto rounded-lg shadow-md mb-4"
            id="mainImage" />
        </div>

        <div class="w-full md:w-1/2 px-4">
          <h2 class="text-3xl font-bold mb-2">{{ productById.name }}</h2>
          <p class="text-gray-600 mb-4">#{{ productById.id }}</p>
          <div class="mb-4">
            <span class="text-2xl font-bold mr-2">${{ productById.price }}</span>
          </div>

          <p class="text-gray-800 mb-6">Stock: {{productById.stock}}</p>


          <div class="flex space-x-4 mb-6">
            <button @click="cartStore.addToCart(productById)"
              class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              Add to Cart
            </button>
          </div>
        
        </div>
        <p class="text-2xl font-bold uppercase w-full text-center ">product information</p>
          
          <p class="text-gray-700 text-xl mb-6 w-full text-center">{{ productById.description }}</p>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped></style>