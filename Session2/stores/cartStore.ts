import { defineStore } from "pinia";
import { ref, computed } from "vue";

const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);

    const checkStock = (item: any) => {
      if (!item.stock) {
        return false;
      }
      return true;
    };

    const addToCart = (item: any) => {
      const existingItem = cartList.value.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        if (!checkStock(item)) {
          return false;
        }
        existingItem.quantity++;
        existingItem.total = existingItem.quantity * existingItem.price;
        existingItem.stockAvailable -= 1;
      } else {
        if (!checkStock(item)) {
          return false;
        }
        const checkstock = item.stock - 1;
        cartList.value.push({
          ...item,
          quantity: 1,
          total: item.price,
          stockAvailable: checkstock,
        });
      }
      return true;
    };

    const updateQuantity = (itemId: Number, change: Number) => {
      const item = cartList.value.find((cartItem) => cartItem.id === itemId);

      if (item) {
        const newQuantity = item.quantity + change;

        if (change < 0) {
          if (newQuantity > 0) {
            item.quantity = newQuantity;
            item.total = newQuantity * item.price;
            item.stockAvailable += 1;
          } else {
            removeFromCart(itemId);
          }
          return true;
        }
        if (!checkStock(item, change)) {
          return false;
        }
        item.stockAvailable -= 1;

        item.quantity = newQuantity;
        item.total = newQuantity * item.price;
        return true;
      }
    };

    const removeFromCart = (itemId: Number) => {
      cartList.value = cartList.value.filter((item) => item.id !== itemId);
    };

    const totalPrice = computed(() => {
      return cartList.value
        .reduce((sum, item) => sum + item.total, 0)
        .toFixed(2);
    });

    const clearCart = () => {
      cartList.value = [];
    };

    return {
      cartList,
      addToCart,
      updateQuantity,
      removeFromCart,
      totalPrice,
      clearCart,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
      key: "my-cart",
      paths: ["cartList"],
    },
  }
);

export default useCartStore;
