<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow">

          <slot ></slot>
      
     
    </div>
    <Footer />
  </div>
</template>


<script>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
export default {
  props: {
    Header,
    Footer,
   
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>