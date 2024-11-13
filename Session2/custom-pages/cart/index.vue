<script setup>
import ItemCart from "./components/ItemCart"
import PayNow from "./components/PayNow"
import useCartStore from "~/stores/cartStore"
import DialogNotification from "~/components/DialogNotification"
const cartStore = useCartStore();

</script>

<template>
  <div class="bg-gray-50 py-8 antialiased md:py-12">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
        <div>
         
          <h2 class="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
            Cart
          </h2>
        </div>
      </div>
      <div class="font-sans">
        <div class="grid lg:grid-cols-3 gap-4 max-lg:max-w-3xl mx-auto">
          <div class="lg:col-span-2 bg-white divide-y divide-gray-300 px-4">
            <p v-if="cartStore.cartList.length === 0" class="text-center text-gray-500 py-4">
              Giỏ hàng trống
            </p>
            <ItemCart v-else />

          </div>
          <PayNow />
         
        </div>
      
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>