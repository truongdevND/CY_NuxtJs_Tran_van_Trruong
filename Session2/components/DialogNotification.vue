<template>
   <div v-if="useNotificationStore.openDialog" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
     
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="flex flex-col justify-center items-center">
            <div >
            <img class=" rounded-full object-cover w-[100px] h-[100px]" :src="useNotificationStore.urlImg" alt="">
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 ">
              <h3 class="text-base font-semibold text-gray-900" id="modal-title">{{ useNotificationStore.title }}</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">{{ useNotificationStore.textMess }}</p>
              </div>
            </div>
          </div>
        </div>
        <div  class="bg-gray-50 px-4 py-3 sm:px-6"> 
          <button @click="handleSubmit" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 ">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
   import notificationStore from "~/stores/notificationStore";
   const useNotificationStore = notificationStore();

   const handleSubmit = ()=>{
    useNotificationStore.dialog(false);
   }
</script>

<style lang="scss" scoped>

</style>