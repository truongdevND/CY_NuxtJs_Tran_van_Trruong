import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([]);

  const addToCart = (item) => {
    const existingItem = cartList.value.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      cartList.value.push({ ...item, quantity: 1, total: item.price });
    }
  };

  const updateQuantity = (itemId, change) => {
    const item = cartList.value.find(cartItem => cartItem.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        item.quantity = newQuantity;
        item.total = newQuantity * item.price;
      } else {
        removeFromCart(itemId);
      }
    }
  };

  const removeFromCart = (itemId) => {
    cartList.value = cartList.value.filter(item => item.id !== itemId);
  };

  const totalPrice = computed(() => {
    return cartList.value.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  });

  return { cartList, addToCart, updateQuantity, removeFromCart, totalPrice };
}, {
  
    persist: {
      storage: persistedState.localStorage,
      key: 'my-cart',
      paths: ['cartList'],
      beforeRestore: (ctx) => {
        console.log('Before restore:', ctx)
      },
      afterRestore: (ctx) => {
        console.log('After restore:', ctx)
      },
    }
  }
);