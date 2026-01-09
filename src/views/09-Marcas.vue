<template>
  <section class="brands-section" ref="sectionRef" :class="{ 'is-visible': isVisible }">
    <div class="brands-container">

      <!-- TEXTO IZQUIERDA -->
      <div class="brands-text">
        <span class="brands-eyebrow">Marcas con las que trabajamos</span>
        <h2 class="brands-title">
          Calidad que marca<br />
          la diferencia
        </h2>

        <p class="brands-copy">
          Trabajamos con proveedores líderes en herrajes, tableros y soluciones
          para mobiliario, asegurando terminaciones duraderas y de alta performance.
        </p>
      </div>

      <!-- LÍNEA DIVISORA -->
      <div class="brands-divider"></div>

      <!-- LOGOS DERECHA -->
      <div class="brands-logos">
        <div v-for="(brand, i) in marcas" :key="i" class="brand-item" :class="{ 'brand-boost': brand.boost }">
          <img :src="brand.logo" :alt="brand.nombre" />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

import faplac from "@/assets/Img/Marcas/Faplac.png";
import hafele from "@/assets/Img/Marcas/HAFELE.png";
import egger from "@/assets/Img/Marcas/EGGER.png";
import eurohard from "@/assets/Img/Marcas/EUROHARD.png";
import greenwey from "@/assets/Img/Marcas/GREENWEY.png";

const marcas = [
  { nombre: "Faplac", logo: faplac },
  { nombre: "Häfele", logo: hafele },
  { nombre: "Egger", logo: egger, boost: true },      // 👈 necesita lectura
  { nombre: "Eurohard", logo: eurohard },
  { nombre: "Greenwey", logo: greenwey, boost: true } // 👈 necesita lectura
];

/* ==== Animación on-scroll con IntersectionObserver ==== */
const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ========== SECCIÓN GENERAL ========== */
.brands-section {
  position: relative;
  padding: 5.5rem 0;
  background: #111;
  overflow: hidden;
}

.brands-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) auto minmax(0, 2fr);
  gap: 3.5rem;
  align-items: center;
}

/* ========== TEXTO ========== */
.brands-text {
  color: #f5f5f5;
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.brands-section.is-visible .brands-text {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.1s;
}

.brands-eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.brands-title {
  font-family: 'Quicksand', sans-serif;
  margin-top: 1.1rem;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.15;
  letter-spacing: 0.02em;
  color: #f7f7f7;
}

.brands-copy {
  margin-top: 1.5rem;
  max-width: 26rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.68);
}

/* ========== LÍNEA CENTRAL ========== */
.brands-divider {
  width: 1px;
  height: 100%;
  min-height: 180px;
  background: linear-gradient(to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.55) 50%,
      rgba(255, 255, 255, 0) 100%);

  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.brands-section.is-visible .brands-divider {
  opacity: 0.9;
  transform: translateY(0);
  transition-delay: 0.2s;
}

/* ========== LOGOS ========== */
.brands-logos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 3rem 3.5rem;
  align-items: center;

  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.9s ease-out, transform 0.9s ease-out;
}

.brands-section.is-visible .brands-logos {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.25s;
}

.brand-item {
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.brands-section.is-visible .brand-item {
  opacity: 1;
  transform: translateY(0);
}

/* Base logo */
.brand-item img {
  max-width: 140px;
  max-height: 60px;
  object-fit: contain;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}

/* Hover fino */
.brand-item:hover img {
  transform: translateY(-3px) scale(1.04);
  opacity: 0.95;
}

/* =========================================================
   ✅ SOLUCIÓN: “solo lo negro se lee blanco” sin tocar colores
   - Agrega un contorno/glow blanco MUY sutil
   - SOLO a las marcas que lo necesitan (brand-boost)
========================================================= */
.brand-item.brand-boost img {
  filter:
    drop-shadow(0 0 1px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.18));
}

.brand-item.brand-boost:hover img {
  filter:
    drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.98)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.22));
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .brands-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .brands-divider {
    width: 40%;
    margin: 0 auto;
    height: 1px;
    min-height: 1px;
    background: linear-gradient(to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.55) 50%,
        rgba(255, 255, 255, 0) 100%);
  }

  .brands-title {
    font-size: 2.1rem;
  }
}

@media (max-width: 600px) {
  .brands-section {
    padding: 4.5rem 0;
  }

  .brands-logos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.6rem 1.2rem;
  }

  .brand-item img {
    max-width: 110px;
  }
}
</style>
