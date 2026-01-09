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
}
</style>
