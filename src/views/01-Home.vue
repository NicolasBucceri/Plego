<template>
  <section id="hero" class="full-section">
    <Hero />
  </section>

  <section id="soluciones" class="full-section">
    <SeccionSoluciones :slides="slidesSoluciones" />
  </section>

  <section id="texturas" class="full-section">
    <TexturasSection />
  </section>

  <section id="nosotros" class="full-section">
    <NosotrosSection />
  </section>

  <section id="comoTrabajamos" class="full-section">
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

  <section id="contacto" class="full-section">
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


import banner4 from '@/assets/Img/Banner4.png'
import banner5 from '@/assets/Img/Banner5.png'
import banner6 from '@/assets/Img/Banner6.png'

const slidesSoluciones = [
  { src: banner4, alt: 'Cocina 1' },
  { src: banner5, alt: 'Cocina 2' },
  { src: banner6, alt: 'Cocina 3' }
]
</script>

<style scoped>
.full-section {
  width: 100%;
}
</style>
