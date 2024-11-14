<template>
  <div class="sticky z-40 top-0 w-full">
    <header
      class="flex shadow-lg py-4 px-4 sm:px-10 bg-white  font-[sans-serif] min-h-[70px] tracking-wide relative z-50"
    >
      <div
        class="w-full flex flex-wrap items-center lg:gap-y-4 gap-y-6 gap-x-4"
      >
        <a class="text-[30px] font-bold" href="/product">SHOPPING </a>

        <ul class="hidden gap-6 md:flex ml-8">
          <li
            class="max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-pink-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300"
          >
            <div class="text-[#333] block text-sm uppercase font-semibold">
              <NuxtLink to="/products"> home</NuxtLink>
            </div>
          </li>
          <li
            class="max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-pink-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300"
          >
            <div class="text-[#333] block text-sm uppercase font-semibold">
              <NuxtLink to="/products"> product</NuxtLink>
            </div>
          </li>
          <li
            class="max-lg:border-b max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-pink-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300"
          >
            <div class="text-[#333] block text-sm uppercase font-semibold">
              <NuxtLink to="/order-history"> order history</NuxtLink>
            </div>
          </li>
        </ul>

        <div class="flex items-center ml-auto">
          <ul class="flex space-x-4">
            <li
              class="relative px-1 after:absolute after:bg-pink-500 after:w-full after:h-[3px] after:block after:-bottom-2 after:left-0 after:transition-all after:duration-300"
            >
              <div
                class="flex flex-col justify-center items-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                    data-original="#000000"
                  />
                </svg>
                <span
                  @click="profile = !profile"
                  class="text-xs font-semibold mt-1"
                  >Profile</span
                >
              </div>
              <div
                v-if="profile"
                class="bg-white z-20 shadow-lg py-6 px-6 sm:min-w-[320px] max-sm:min-w-[250px] max-sm:-right-32 absolute right-0 top-14"
              >
                <h6 class="font-semibold text-sm">Welcome</h6>
                <p class="text-sm text-gray-500 mt-1">
                  {{ storedUser.username }}
                </p>

                <hr class="border-b-0 my-4" />

                <button
                  type="button"
                  @click="handleLogout"
                  class="bg-transparent border border-gray-300 hover:border-pink-500 px-4 py-2 mt-4 text-sm text-pink-500 font-semibold"
                >
                  LOGOUT
                </button>
              </div>
            </li>

            <li
              class="relative px-1 after:absolute after:bg-pink-500 after:w-0 hover:after:w-full hover:after:h-[3px] after:block after:-bottom-2 after:left-0 after:transition-all after:duration-300"
            >
              <p
                class="text-xl font-bold text-black absolute w-7 h-7 text-center top-[-5px] right-[-10px]"
              >
                {{ cartStore.cartList.length }}
              </p>
              <div
                class="flex flex-col justify-center items-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 489 489"
                >
                  <path
                    d="m440.1 422.7-28-315.3c-.6-7-6.5-12.3-13.4-12.3h-57.6C340.3 42.5 297.3 0 244.5 0s-95.8 42.5-96.6 95.1H90.3c-7 0-12.8 5.3-13.4 12.3l-28 315.3c0 .4-.1.8-.1 1.2 0 35.9 32.9 65.1 73.4 65.1h244.6c40.5 0 73.4-29.2 73.4-65.1 0-.4 0-.8-.1-1.2zM244.5 27c37.9 0 68.8 30.4 69.6 68.1H174.9c.8-37.7 31.7-68.1 69.6-68.1zm122.3 435H122.2c-25.4 0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5v-41h139.3v41c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5v-41h45.2l26.9 302.3c-.4 20.7-21.1 37.5-46.4 37.5z"
                    data-original="#000000"
                  />
                </svg>
                <span class="text-xs font-semibold mt-1">
                  <NuxtLink to="/cart">Bag</NuxtLink>
                </span>
              </div>
            </li>
          </ul>

          <div class="block ml-3 md:hidden">
            <button @click="menuReposive = !menuReposive"
              className="text-white cursor-pointer leading-none px-3 p outline-none focus:outline-none "
              type="button"
              aria-label="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#191919"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul v-if="menuReposive"
        class="absolute md:hidden top-[70px] right-0 bg-gray-300 w-full h-auto shadow-2xl flex flex-col justify-center p-[20px] px-8 gap-6 ml-8"
      >
        <li
          class="max-lg:border-b max-lg:py-3 relative after:absolute after:bg-pink-500 after:w-0 hover:after:w-full hover:after:h-[3px] after:block lg:after:-bottom-2 after:transition-all after:duration-300"
        >
          <div class="text-[#333] block text-sm uppercase font-semibold">
            <NuxtLink to="/products"> home</NuxtLink>
          </div>
        </li>
        <li
          class="max-lg:border-b max-lg:py-3 relative after:absolute after:bg-pink-500 after:w-0 hover:after:w-full hover:after:h-[3px] after:block lg:after:-bottom-2 after:transition-all after:duration-300"
        >
          <div class="text-[#333] block text-sm uppercase font-semibold">
            <NuxtLink to="/products"> product</NuxtLink>
          </div>
        </li>
        <li
          class="max-lg:border-b max-lg:py-3 relative after:absolute after:bg-pink-500 after:w-0 hover:after:w-full hover:after:h-[3px] after:block lg:after:-bottom-2 after:transition-all after:duration-300"
        >
          <div class="text-[#333] block text-sm uppercase font-semibold">
            <NuxtLink to="/order-history"> order history</NuxtLink>
          </div>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useCookie } from "#app";
import { logout } from "~/service/auth";
import useCartStore from "~/stores/cartStore";

const storedUser = computed(() => JSON.parse(localStorage.getItem("users")));
const cartStore = useCartStore();
const menuReposive = ref(false)

const profile = ref(false);
const cookieToken = useCookie("token");

const handleLogout = async () => {
  try {
    await logout();
    cookieToken.value = null;
    localStorage.clear();
    navigateTo("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>

<style lang="scss" scoped></style>