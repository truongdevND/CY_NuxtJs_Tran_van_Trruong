<template>
  <div class="mt-6 border border-gray-900 pt-5">
    <div
      class="flex max-md:flex-col items-center justify-between px-3 md:px-11"
    >
      <div class="flex justify-between w-full">
        <div>
          <p class="font-medium text-lg leading-8 text-black whitespace-nowrap">
            Order id : #{{ itemOrder.id }}
          </p>
          <p class="font-medium text-lg leading-8 text-black whitespace-nowrap">
            {{ formatDate(itemOrder.created_at) }}
          </p>
        </div>
        <div>
          <p class="font-medium text-lg leading-8 text-black whitespace-nowrap">
            Address : {{ itemOrder.address }}
          </p>
          <p class="font-medium text-lg leading-8 text-black whitespace-nowrap">
            Phone : {{ itemOrder.phone }}
          </p>
        </div>
      </div>
    </div>
    <svg
      class="my-6 w-full"
      xmlns="http://www.w3.org/2000/svg"
      width="1216"
      height="2"
      viewBox="0 0 1216 2"
      fill="none"
    >
      <path d="M0 1H1216" stroke="#D1D5DB" />
    </svg>
    <div v-for="item in itemOrder.order_items" :key="item.id">
      <div
        class="flex max-lg:flex-col items-center justify-between  px-3 "
      >
        <div class=" w-full">
          <div
            class="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center"
          >
            <h6
              class="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap"
            >
             {{ item.name }}
            </h6>

            <div class="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
              <span
                class="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap"
                >Qty: {{ item.quantity }}</span
              >
              <p
                class="font-semibold text-xl leading-8 text-black whitespace-nowrap"
              >
                Price ${{ item.price }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
        
         
        </div>
      </div>
      <svg
        class="mt-9 w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="1216"
        height="2"
        viewBox="0 0 1216 2"
        fill="none"
      >
        <path d="M0 1H1216" stroke="#D1D5DB" />
      </svg>
    </div>

    <div
      class="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse"
    >
      <div class="flex h-[60px] max-sm:flex-col-reverse items-center">
        <p class="font-normal text-xl leading-8 text-gray-500 sm:pl-8">
          Payment Is Succesfull
        </p>
      </div>
      <p class="font-medium text-xl leading-8 text-black max-sm:py-4">
        <span class="text-gray-500">Total Price: </span> &nbsp;${{
          itemOrder.sub_total
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  itemOrder: {
    type: Object,
    required: true,
  },
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return date.toLocaleString("en-US", options);
}
</script>

<style lang="scss" scoped>
</style>