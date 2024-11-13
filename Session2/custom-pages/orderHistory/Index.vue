<template>
  <div class="bg-gray-50 py-8 antialiased md:py-12">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div
        class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8"
      >
        <div>
          <h2 class="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
            Order History
          </h2>
        </div>
      </div>
      <section class="relative">
        <div class="h-[550px] overflow-y-auto">
          <Loading v-if="!orderData" />
          <ItemOrderHistory v-else
            v-for="item in orderData"
            :key="item.key"
            :item-order="item"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import ItemOrderHistory from "./components/ItemOrderHistory";
import { getCart } from "~/service/carts";
import Loading from "~/components/Loading.vue";


const cookieToken = useCookie("token");
const orderData = ref(null);

const fetchdata = async () => {
  const res = await getCart(cookieToken.value);
  orderData.value = res;
};
watchEffect(() => {
  fetchdata();
});
</script>

<style lang="scss" scoped>
</style>