<template>
   <div class="font-sans">
            <div class="grid lg:grid-cols-3 gap-4 max-lg:max-w-3xl mx-auto">
                <div class="lg:col-span-2 bg-white divide-y divide-gray-300 px-4">
              
                      <ItemCart/>
                      <ItemCart/>
                      <ItemCart/>
                   
                </div>

                <div class="bg-gradient-to-tl from-[#B0EBB4] via-[#BFF6C3] to-[#E0FBE2] p-6 lg:sticky top-0">
                    <ul class="text-gray-800 divide-y divide-gray-300">
                        <li class="flex flex-wrap gap-4 text-sm pb-4 font-semibold">Subtotal <span class="ml-auto">$46.00</span></li>
                        <li class="flex flex-wrap gap-4 text-sm py-4 font-semibold">Shipping <span class="ml-auto">$4.00</span></li>
                        <li class="flex flex-wrap gap-4 text-sm py-4 font-semibold">Tax <span class="ml-auto">$4.00</span></li>
                        <li class="flex flex-wrap gap-4 text-sm pt-4 font-bold">Total <span class="ml-auto">$54.00</span></li>
                    </ul>

                    <div class="mt-8">
                        <h3 class="text-base font-bold text-gray-800">Apply promo code</h3>
                        <div class="flex border border-blue-600 overflow-hidden max-w-md rounded-lg mt-4">
                            <input type="email" placeholder="Promo code"
                                class="w-full outline-none bg-white text-gray-800 text-sm px-4 py-3 bg-white" />

                            <button type='button' class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold tracking-wide text-sm text-white outline-none">
                                Apply
                            </button>
                        </div>
                    </div>

                    <button type="button" class="mt-8 max-w-md text-sm px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold tracking-wide rounded-lg">Pay Now</button>
                </div>
            </div>
        </div>
</template>

<script>
import ItemCart from './component/ItemCart.vue'

export default {
    components: {
        ItemCart
    },
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>