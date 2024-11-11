<template>
    <div class="bg-image flex items-center justify-center h-screen" style="   background-image: url('https://anhdephd.vn/wp-content/uploads/2022/05/background-dep.jpg'); /* Replace with your desired image URL */
      background-size: cover;
      background-position: center;">
        <div class="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg max-w-lg w-full">
            <h1 class="text-3xl font-semibold text-gray-800 text-center mb-6">Welcome to Our Platform</h1>
            <p class="text-lg text-gray-600 text-center mb-8">Let's get you started with just a few clicks!</p>
            <div class="flex flex-col items-center">
                <button onclick="window.location.href='/register'"
                    class="bg-indigo-600 text-white hover:bg-indigo-700 py-3 px-6 rounded-full text-lg mb-4 transition duration-300 ease-in-out transform hover:scale-105">
                    Sign Up
                </button>
                <p class="text-gray-600 text-sm">Already have an account?</p>
                <a href="/login" class="text-indigo-600 hover:underline font-semibold text-lg">Login here</a>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'nonav-layout'
})


</script>

<style lang="scss" scoped></style>