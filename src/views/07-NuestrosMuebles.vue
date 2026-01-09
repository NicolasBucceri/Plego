<template>
  <section ref="sectionRef" class="muebles-wrapper" :class="{ 'is-visible': isVisible }">
    <div class="container">

      <!-- HEADER -->
      <header class="muebles-header">

        <h2 class="title">Nuestros Muebles</h2>
        <p class="subtitle">Información sobre su confección, calidad y detalles</p>
      </header>

      <!-- GRID -->
      <div class="muebles-grid">
        <div v-for="(item, i) in features" :key="i" class="feature-item">
          <!-- ÍCONO FONT AWESOME -->
          <i :class="item.icon" class="feature-icon"></i>

          <!-- TÍTULO -->
          <h3 class="feature-title">{{ item.title }}</h3>

          <!-- TEXTO -->
          <p class="feature-text">{{ item.text }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const features = [
  {
    title: "Materiales",
    icon: "fas fa-layer-group",
    text: "Trabajamos con placas Egger y Faplac, referentes del mercado por su calidad, resistencia y terminaciones premium."
  },
  {
    title: "Herrajes",
    icon: "fas fa-door-open",
    text: "Utilizamos herrajes lideres mundiales como Häfele, entre otros, en precisión y rendimiento para mobiliario de alta gama."
  },
  {
    title: "Diseño",
    icon: "fas fa-pencil-ruler",
    text: "Diseños exclusivos desarrollados a medida para potenciar cada espacio."
  },
  {
    title: "Terminaciones",
    icon: "fas fa-info-circle",
    text: "Acabados finos y detallados que reflejan nuestro estándar de calidad artesanal."
  }
];

const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  const el = sectionRef.value;
  if (!el || !("IntersectionObserver" in window)) {
    isVisible.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(el);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<style scoped>
/* ============================
   WRAPPER
============================ */
.muebles-wrapper {
  background: #111;
  padding: 6rem 0 5.5rem;
  color: #f3eee5;
}

/* ============================
   CONTENEDOR
============================ */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ============================
   HEADER
============================ */
.muebles-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(24px);
}

.section-separator {
  width: 420px;
  height: 2px;
  margin: 0 auto 2.4rem auto;
  background: linear-gradient(to right,
      rgba(244, 200, 121, 0),
      rgba(244, 200, 121, 0.9),
      rgba(244, 200, 121, 0));
  box-shadow: 0 0 14px rgba(244, 200, 121, 0.3);
}

.title {
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  letter-spacing: 0.5px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  /* opcional si querés controlarlo mejor */
  line-height: 1.1;
}

.subtitle {
  font-size: 1rem;
  opacity: 0.75;
}

/* ============================
   GRID
============================ */
.muebles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  opacity: 0;
  transform: translateY(28px);
}

/* ============================
   FEATURE ITEM
============================ */
.feature-item {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.feature-item:hover {
  transform: translateY(6px);
}

.feature-icon {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  color: #f4c879;
}

.feature-title {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.feature-text {
  font-size: 0.95rem;
  color: #c7bfb2;
  line-height: 1.7;
  max-width: 280px;
  margin: 0 auto;
}

/* ============================
   ANIMACIONES
============================ */
.muebles-wrapper.is-visible .muebles-header {
  animation: fadeUp 0.7s ease-out forwards;
}

.muebles-wrapper.is-visible .muebles-grid {
  animation: fadeUp 0.9s ease-out forwards;
}

.muebles-wrapper.is-visible .feature-item:nth-child(1) {
  animation: fadeCard 0.7s ease-out forwards;
  animation-delay: 0.15s;
}

.muebles-wrapper.is-visible .feature-item:nth-child(2) {
  animation: fadeCard 0.7s ease-out forwards;
  animation-delay: 0.25s;
}

.muebles-wrapper.is-visible .feature-item:nth-child(3) {
  animation: fadeCard 0.7s ease-out forwards;
  animation-delay: 0.35s;
}

.muebles-wrapper.is-visible .feature-item:nth-child(4) {
  animation: fadeCard 0.7s ease-out forwards;
  animation-delay: 0.45s;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeCard {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================
   RESPONSIVE
============================ */
@media (max-width: 1024px) {
  .muebles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .muebles-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .section-separator {
    width: 250px;
  }
}
</style>
