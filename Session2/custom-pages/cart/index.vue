<template>
  <div class="bg-gray-50 py-8 antialiased md:py-12">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div
        class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8"
      >
        <div>
          <nav class="flex" aria-label="Breadcrumb">
            <ol
              class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
            >
              <li class="inline-flex items-center">
                <a
                  href="#"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <svg
                    class="me-2.5 h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                    />
                  </svg>
                  Home
                </a>
              </li>
              <li class="inline-flex items-center">
                <a
                  href="#"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <svg
                  class="me-2.5 h-3 w-3"

                    fill="#000000"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xml:space="preserve"
                  >
                    <path
                      id="XMLID_222_"
                      d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z"
                    />
                  </svg>
                  Cart
                </a>
              </li>
            </ol>
          </nav>
          <h2 class="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
            Products
          </h2>
        </div>
      </div>
      <div class="font-sans">
        <div class="grid lg:grid-cols-3 gap-4 max-lg:max-w-3xl mx-auto">
          <div class="lg:col-span-2 bg-white divide-y divide-gray-300 px-4">
            <ItemCart />
            <ItemCart />
            <ItemCart />
          </div>

          <div
            class="bg-gradient-to-tl from-[#B0EBB4] via-[#BFF6C3] to-[#E0FBE2] p-6 lg:sticky top-0"
          >
            <ul class="text-gray-800 divide-y divide-gray-300">
              <li class="flex flex-wrap gap-4 text-sm pb-4 font-semibold">
                Subtotal <span class="ml-auto">$46.00</span>
              </li>
              <li class="flex flex-wrap gap-4 text-sm py-4 font-semibold">
                Shipping <span class="ml-auto">$4.00</span>
              </li>
              <li class="flex flex-wrap gap-4 text-sm py-4 font-semibold">
                Tax <span class="ml-auto">$4.00</span>
              </li>
              <li class="flex flex-wrap gap-4 text-sm pt-4 font-bold">
                Total <span class="ml-auto">$54.00</span>
              </li>
            </ul>

            <div class="mt-8">
              <h3 class="text-base font-bold text-gray-800">
                Apply promo code
              </h3>
              <div
                class="flex border border-blue-600 overflow-hidden max-w-md rounded-lg mt-4"
              >
                <input
                  type="email"
                  placeholder="Promo code"
                  class="w-full outline-none bg-white text-gray-800 text-sm px-4 py-3 bg-white"
                />

                <button
                  type="button"
                  class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold tracking-wide text-sm text-white outline-none"
                >
                  Apply
                </button>
              </div>
            </div>

            <button
              type="button"
              class="mt-8 max-w-md text-sm px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold tracking-wide rounded-lg"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCart from "./component/ItemCart.vue";

export default {
  components: {
    ItemCart,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>