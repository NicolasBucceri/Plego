<template>
  <MainLayout />
  <Logos />
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import Logos from '@/components/Logos.vue'
</script>

<style>
:root {
  --nav-height: 96px;
}

html {
  scroll-behavior: smooth;
  overflow-x: clip; /* ✅ mata el scroll horizontal fantasma */
}

body {
  overflow-x: clip; /* ✅ idem */
  width: 100%;
}
/* html, body {
  width: 100%;
  overflow-x: hidden;
} */

</style>
