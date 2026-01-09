<template>
  <div class="banner-wrapper">
    <img :src="src" :alt="alt" class="banner-img" />
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Banner Plego' }
})
</script>

<style scoped>
/* ===========================
   BANNER PANORÁMICO PREMIUM
   =========================== */
.banner-wrapper{
  width: 100%;
  max-width: 1400px;
  margin: 4rem auto 0;
  border-radius: 18px;
  overflow: hidden;
  position: relative;

  /* más alto → menos recorte */
  aspect-ratio: 16 / 6;
  max-height: 520px;

  background: #000;
  box-shadow: 0 18px 38px rgba(0,0,0,.55);
}

/* IMAGEN */
.banner-img{
  width: 100%;
  height: 100%;
  display: block;

  object-fit: cover;
  object-position: center 34%; /* encuadre calibrado */
  transform: scale(1);        /* sin zoom forzado */

  filter: saturate(1.05) contrast(1.05);
  transition: transform .6s ease, filter .6s ease;
}

/* hover elegante */
.banner-wrapper:hover .banner-img{
  transform: scale(1.02);
}

/* viñeta suave para fundir con fondo */
.banner-wrapper::after{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background: radial-gradient(ellipse at center,
    transparent 60%,
    rgba(0,0,0,.35) 100%);
}
</style>
