<script>
import { useCartStore } from "~/stores/cartStore"
export default {
    name: "DialogCart",
    components: {},
    props: {
        cart: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const cartStore = useCartStore();

        
        return {
            cartStore
        }
    }
}
</script>
<template>
    <div>
        <h2 class="text-center text-2xl font-bold">Giỏ hàng</h2>
        <div class="border-b-[1px] border-gray-300"></div>

        <p v-if="cartStore.cart.cartList.length === 0" class="text-center text-gray-500 py-4">
            Giỏ hàng trống
        </p>

        <ul v-else class="flex-col flex gap-2.5 max-h-[400px] overflow-y-auto">
            <li v-for="item in cartStore.cartList" :key="item.id"
                class="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <div class="flex gap-2">
                    <img :src="item.thumbnail" alt="" class="w-[50px] object-cover rounded" />
                    <div>
                        <p class="font-medium">{{ item.title }}</p>
                        <p class="text-sm text-gray-600">{{ item.price }} $</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button @click="cartStore.updateQuantity(item.id, -1)"
                        class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                        -
                    </button>
                    <span class="w-8 text-center">{{ item.quantity }}</span>
                    <button @click="cartStore.updateQuantity(item.id, 1)"
                        class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                        +
                    </button>
                    <button @click="cartStore.removeFromCart(item.id)" class="ml-2 text-red-500 hover:text-red-700">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </li>
        </ul>

        <div class="border-t-[1px] border-gray-300 mt-2 pt-2">
            <div class="flex justify-between items-center text-xl font-bold">
                <p>Tổng:</p>
                <p class="text-red-700">{{ cartStore.totalPrice }} $</p>
            </div>
            <button
                class="w-full h-[40px] mt-2 rounded-[10px] bg-red-500 hover:bg-red-600 text-white text-[16px] transition-colors">
                Thanh toán
            </button>
        </div>
    </div>

</template>



<style lang="scss" scoped></style>