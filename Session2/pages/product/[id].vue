<script setup>
import { getProductById } from "~/service/products";
import { useRoute } from "vue-router";
import Loading from "~/components/Loading.vue";

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
          <img
            :src="productById.preview_img_path"
            alt="Product"
            class="w-full h-auto rounded-lg shadow-md mb-4"
            id="mainImage"
          />
        </div>

        <div class="w-full md:w-1/2 px-4">
          <h2 class="text-3xl font-bold mb-2">{{ productById.name }}</h2>
          <p class="text-gray-600 mb-4">#{{ productById.id }}</p>
          <div class="mb-4">
            <span class="text-2xl font-bold mr-2"
              >${{ productById.price }}</span
            >
          </div>

          <p class="text-gray-700 mb-6">{{}}</p>

          <div class="mb-6">
            <label
              for="quantity"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Quantity:</label
            >
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value="1"
              class="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div class="flex space-x-4 mb-6">
            <button
              class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Add to Cart
            </button>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Key Features:</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>Industry-leading noise cancellation</li>
              <li>30-hour battery life</li>
              <li>Touch sensor controls</li>
              <li>Speak-to-chat technology</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
</style>