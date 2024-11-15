<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import useCartStore from '~/stores/cartStore'; 

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['add']);
const router = useRouter();
const cartStore = useCartStore();

const availableStock = computed(() => {
  const inCart = cartStore.cartList.find(cartItem => cartItem.id === props.item.id)?.quantity || 0;
  return props.item.stock - inCart;
});

const stockStatus = computed(() => {
  if (availableStock.value <= 0) return { text: 'Out of stock', class: 'text-red-600' };
  return { text: 'In stock', class: 'text-green-600' };
});

const toggle =  (item) => {
  if (availableStock.value <= 0) return;
    emit('add', item);
  
};

const goToProduct = (id) => {
  router.push(`/product/${id}`);
};
</script>

<template>
  <div class="cursor-pointer flex w-full justify-between flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow">
    <div class="relative mx-3 mt-3 flex h-60 z-1 overflow-hidden rounded-xl" @click="goToProduct(item.id)">
      <img class="object-cover w-full h-auto" :src="item.preview_img_path" alt="product image" />
      <div class="absolute top-2 right-2">
        <span class="px-2 py-1 rounded-full text-xs font-medium"
          :class="[
            stockStatus.class,
            'bg-white/90 backdrop-blur-sm shadow-sm'
          ]">
          {{ stockStatus.text }}
        </span>
      </div>
    </div>

    <div class="mt-4 px-5 pb-5">
      <div>
        <h5 class="text-xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors" @click="goToProduct(item.id)">
          {{ item.name }}
        </h5>
      </div>

      <div class="mt-4 flex justify-between items-center">
        <p class="text-sm text-gray-600 font-medium">
          Stock: <span :class="stockStatus.class">{{ availableStock }}</span>
        </p>
        <p v-if="cartStore.cartList.find(cartItem => cartItem.id === item.id)" class="text-sm text-blue-600 font-medium">
          In Cart: {{ cartStore.cartList.find(cartItem => cartItem.id === item.id).quantity }}
        </p>
      </div>

      <div class="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span class="text-3xl font-bold text-red-700">${{ item.price }}</span>
        </p>
      </div>

      <button @click="toggle(item)"
        class="w-full flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
        :disabled="availableStock <= 0"
        :class="[
          availableStock > 0
            ? 'bg-slate-900 hover:bg-gray-700'
            : 'bg-gray-400 cursor-not-allowed',
        ]">
        <svg xmlns="http://www.w3.org/2000/svg" 
          class="mr-2 h-6 w-6 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24"
          stroke="currentColor" 
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {{ availableStock <= 0 ? "Out of stock" : "Add to cart" }}
      </button>

   
    </div>
  </div>
</template>

<style  scoped>

</style>