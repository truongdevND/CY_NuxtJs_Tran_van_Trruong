<script>
export default {
  name: "ItemProduct",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const toggle = (item) => {
      emit("add", item);
    };
    return {
      toggle,
    };
  },
};
</script>

<template>
  <div
    class=" cursor-pointer flex w-full justify-between flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
  >
    <div class="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" >
      <img
        class="object-cover w-full h-auto"
        :src="item.preview_img_path"
        alt="product image"
      />
    </div>
    <div class="mt-4 px-5 pb-5">
      <div>
        <h5 class="text-xl tracking-tight text-slate-900">{{ item.name }}</h5>
      </div>
      <p class="text-sm mt-4 text-end text-gray-400 font-medium">
        Số lượng còn lại: <span>{{ item.stock }}</span>
      </p>
      <div class="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span class="text-3xl font-bold text-red-700">${{ item.price }}</span>
        </p>
      </div>
      <button
        @click="toggle(item)"
        class="flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
        :disabled="item.stock <= 0"
        :class="
          item.stock
            ? 'bg-slate-900 hover:bg-gray-700'
            : 'bg-gray-400 cursor-not-allowed'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {{ item.stock <= 0 ? "Out of stock" : "Add to cart" }}
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>