import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

 const useCartStore = defineStore('cart', () => {
  const cartList = ref([]);

  const addToCart = (item:any) => {
    const existingItem = cartList.value.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      cartList.value.push({ ...item, quantity: 1, total: item.price });
    }
  };

  const updateQuantity = (itemId:Number, change:Number) => {
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

  const removeFromCart = (itemId:Number) => {
    cartList.value = cartList.value.filter(item => item.id !== itemId);
  };

  const totalPrice = computed(() => {
    return cartList.value.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  });
  const clearCart  = () =>{
    cartList.value = [];
  }

  return { cartList, addToCart, updateQuantity, removeFromCart, totalPrice, clearCart };
}, {
  
    persist: {
      storage: persistedState.localStorage,
      key: 'my-cart',
      paths: ['cartList'],
    }
  }
);

export default useCartStore;