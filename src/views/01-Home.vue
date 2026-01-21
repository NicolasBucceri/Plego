<template>
  <section id="hero">
    <Hero />
  </section>

  <section id="soluciones">
    <SeccionSoluciones :slides="slidesSoluciones" />
  </section>

  <section id="texturas">
    <TexturasSection />
  </section>

  <section id="nosotros">
    <NosotrosSection />
  </section>

  <section id="comoTrabajamos">
    <ComoTrabajamos />
  </section>

  <section id="proyectoCarrusel">
    <ProyectosCarrusel />
  </section>

  <section id="nuestrosMuebles">
    <NuestrosMuebles />
  </section>

  <section id="Marcas">
    <Marcas />
  </section>

  <section id="contacto">
    <ContactoSection />
  </section>
</template>

<script setup>
import Hero from '@/views/02-Hero.vue'
import SeccionSoluciones from '@/views/03-SolucionesMedeidas.vue'
import TexturasSection from '@/views/04-TexturasMobiliario.vue'
import NosotrosSection from '@/views/05-Nosotros.vue'
import ComoTrabajamos from '@/views/06-ComoTrabajamos.vue'
import ProyectosCarrusel from '@/views/07-Proyectos.vue'
import NuestrosMuebles from '@/views/08-NuestrosMuebles.vue'
import Marcas from '@/views/09-Marcas.vue'


import banner1 from "@/assets/Img/BannerHero/Banner1Inicio.webp";
import banner2 from "@/assets/Img/BannerHero/Banner2Inicio.webp";
import banner3 from "@/assets/Img/BannerHero/Banner3Inicio.webp";
import banner4 from "@/assets/Img/BannerHero/Banner4Inicio.webp";
import banner5 from "@/assets/Img/BannerHero/Banner5Inicio.webp";

import solBanner1 from "@/assets/Img/BannerSolucionesMedidas/BannerSolucion1.webp";
import solBanner2 from "@/assets/Img/BannerSolucionesMedidas/BannerSolucion2.webp";
import solBanner3 from "@/assets/Img/BannerSolucionesMedidas/BannerSolucion3.webp";

const slidesSoluciones = [
  { src: solBanner1, alt: "Cocina moderna 1" },
  { src: solBanner2, alt: "Cocina moderna 2" },
  { src: solBanner3, alt: "Cocina moderna 3" },
];
</script>

<style scoped>
.full-section {
  width: 100%;
}
</style>
