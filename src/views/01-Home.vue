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

  <section id="nuestrosMuebles">
    <NuestrosMuebles />
  </section>

  <section id="proyectoCarrusel">
    <ProyectosCarrusel />
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
import NuestrosMuebles from '@/views/07-NuestrosMuebles.vue'
import ProyectosCarrusel from '@/views/08-Proyectos.vue'
import Marcas from '@/views/09-Marcas.vue'


import banner1 from "@/assets/Img/BannerHero/Banner1Inicio.png";
import banner2 from "@/assets/Img/BannerHero/Banner2Inicio.png";
import banner3 from "@/assets/Img/BannerHero/Banner3Inicio.png";
import banner4 from "@/assets/Img/BannerHero/Banner4Inicio.png";
import banner5 from "@/assets/Img/BannerHero/Banner5Inicio.png";

import solBanner4 from "@/assets/Img/BannerSolucionesMedidas/Banner4.png";
import solBanner5 from "@/assets/Img/BannerSolucionesMedidas/Banner5.png";
import solBanner6 from "@/assets/Img/BannerSolucionesMedidas/Banner6.png";

const slidesSoluciones = [
  { src: solBanner4, alt: "Cocina moderna 1" },
  { src: solBanner5, alt: "Cocina moderna 2" },
  { src: solBanner6, alt: "Cocina moderna 3" },
];
</script>

<style scoped>
.full-section {
  width: 100%;
}
</style>
