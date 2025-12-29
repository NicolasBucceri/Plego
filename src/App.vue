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
  --scroll-offset: calc(var(--nav-height) + 135px);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--scroll-offset);
}

/* CLAVE: corrige TODOS los saltos por navbar fixed */
section[id] {
  scroll-margin-top: var(--scroll-offset);
}

</style>
