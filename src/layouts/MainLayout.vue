<template>
  <div class="bg-dark text-light min-vh-100 d-flex flex-column">

    <!-- NAVBAR GLOBAL -->
    <Navbar />

    <!-- CONTENIDO SEGÚN LA RUTA -->
    <main class="flex-grow-1">
      <RouterView />
    </main>

    <!-- FOOTER GLOBAL -->
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
main {
  padding-top: 0; /* útil si el navbar es fixed */
}
</style>
