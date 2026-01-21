<template>
  <section ref="sectionRef" class="work-wrapper" :class="{ 'is-visible': isVisible }">
    <div class="container">

      <!-- ============ HEADER DE SECCIÓN ============ -->
      <header class="work-header">
        <div class="section-separator"></div>

        <span class="work-eyebrow">Proceso Plego</span>

        <h2 class="work-title">¿Cómo trabajamos?</h2>
      </header>

      <!-- ============ GRID DE PASOS ============ -->
      <div class="work-grid">
        <div v-for="(item, i) in pasos" :key="i" class="work-item">
          <span class="number">
            {{ String(i + 1).padStart(2, '0') }}.
          </span>

          <h3 class="item-title">{{ item.titulo }}</h3>

          <p class="item-text">
            {{ item.texto }}
          </p>

          <div class="item-line"></div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* PASOS DEL PROCESO */
const pasos = [
  {
    titulo: 'Contacto',
    texto:
      'Para consultas o cotizaciones podés escribirnos por WhatsApp o enviarnos un mail a plegoamoblamientos@gmail.com y te responderemos a la brevedad'
  },
  {
    titulo: 'Información',
    texto:
      'Comenzamos con una reunión para conocer tus ideas y necesidades. Luego desarrollamos una propuesta adaptada a tu espacio, que ajustamos en conjunto hasta definir el diseño'
  },
  {
    titulo: 'Anteproyecto',
    texto:
      'El anteproyecto se presenta con planos y definiciones técnicas para evaluar distribución, medidas y materiales, base clave para presupuestar y avanzar con la fabricación.'
  },
  {
    titulo: 'Entrega',
    texto:
      'Finalizada la fabricación, el mobiliario será trasladado y colocado bajo la supervisión de nuestro personal, asegurando calidad, compromiso y excelencia en todo el proceso.'
  }
]

/* INTERSECTION OBSERVER */
const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  const el = sectionRef.value
  if (!el || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.25 }
  )

  observer.observe(el)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
/* ===========================
   WRAPPER GENERAL
   =========================== */
.work-wrapper {
  background: #111;
  padding: 6rem 0 5.5rem;
  color: #f3eee5;
}

/* ===========================
   CONTENEDOR
   =========================== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ===========================
   HEADER
   =========================== */
.work-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(24px);
}

.section-separator {
  position: relative;
  width: 360px;
  height: 12px;
  margin: 0 auto 2.8rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.section-separator::before {
  content: '';
  position: absolute;
  inset: 50% 0;
  transform: translateY(-50%);
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(to right,
      rgba(244, 200, 121, 0),
      rgba(244, 200, 121, 0.95),
      rgba(244, 200, 121, 0));
}

.section-separator::after {
  content: '';
  position: absolute;
  inset: 50% -18%;
  transform: translateY(-50%);
  height: 100%;
  border-radius: 999px;
  background: radial-gradient(ellipse at center,
      rgba(244, 200, 121, 0.45),
      transparent 65%);
  filter: blur(10px);
  opacity: 0.9;
  pointer-events: none;
}

.work-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(243, 238, 229, 0.65);
  margin-bottom: 0.45rem;
}

.work-title {
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  letter-spacing: 0.5px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  line-height: 1.1;
}

/* ===========================
   GRID
   =========================== */
.work-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 3rem;
  opacity: 0;
  transform: translateY(28px);
}

/* ===========================
   ITEMS
   =========================== */
.work-item {
  display: flex;
  flex-direction: column;
  max-width: 260px;
  padding-bottom: 1.5rem;
  transform: translateY(18px);
  opacity: 0;
  transition:
    transform 0.25s ease-out,
    opacity 0.25s ease-out;
}

.work-item:hover {
  transform: translateY(6px);
}

.number {
  font-size: 2.1rem;
  font-weight: 300;
  color: #f7f1e6;
  letter-spacing: 0.14em;
  margin-bottom: 0.4rem;
}

.item-title {
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #f0e6d7;
  margin-bottom: 1rem;
  font-weight: 500;
}

.item-text {
  font-size: 0.93rem;
  line-height: 1.8;
  color: #c7bfb2;
  margin-bottom: 1.6rem;
}

.item-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right,
      rgba(244, 200, 121, 0),
      rgba(244, 200, 121, 0.85),
      rgba(244, 200, 121, 0));
  margin-top: auto;
}

/* ===========================
   BANNER
   =========================== */
.banner-wrapper {
  width: 100%;
  max-width: 1400px;
  margin: 4rem auto 0;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16 / 4;
  max-height: 420px;
  background: #000;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.55);
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.03);
  transition:
    transform 0.6s ease-out,
    filter 0.6s ease-out;
  filter: saturate(1.05) contrast(1.05);
}

.banner-wrapper:hover .banner-img {
  transform: scale(1.06);
}

.banner-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center,
      transparent 60%,
      rgba(0, 0, 0, 0.35) 100%);
  pointer-events: none;
}

/* ===========================
   ANIMACIONES
   =========================== */
.work-wrapper.is-visible .work-header {
  animation: fadeUp 0.8s ease-out forwards;
}

.work-wrapper.is-visible .section-separator {
  opacity: 1;
  transform: translateY(0);
}

.work-wrapper.is-visible .work-grid {
  animation: fadeUp 0.9s ease-out forwards;
  animation-delay: 0.08s;
}

.work-wrapper.is-visible .work-item:nth-child(1) {
  animation: fadeCard 0.8s ease-out forwards;
  animation-delay: 0.18s;
}

.work-wrapper.is-visible .work-item:nth-child(2) {
  animation: fadeCard 0.8s ease-out forwards;
  animation-delay: 0.28s;
}

.work-wrapper.is-visible .work-item:nth-child(3) {
  animation: fadeCard 0.8s ease-out forwards;
  animation-delay: 0.38s;
}

.work-wrapper.is-visible .work-item:nth-child(4) {
  animation: fadeCard 0.8s ease-out forwards;
  animation-delay: 0.48s;
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

/* ===========================
   RESPONSIVE
   =========================== */
@media (max-width: 1024px) {
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem 2.5rem;
  }
}

@media (max-width: 640px) {
  .work-wrapper {
    padding: 4.5rem 0 4rem;
  }

  .container {
    padding: 0 1.25rem;
  }

  .work-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    justify-items: center;
  }

  .work-item {
    max-width: 520px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 0 0.25rem;
  }

  .item-text {
    margin-left: auto;
    margin-right: auto;
    max-width: 34ch;
  }

  .item-line {
    width: min(420px, 100%);
    margin-left: auto;
    margin-right: auto;
  }

  .work-title {
    font-size: 2rem;
  }

  .section-separator {
    width: 260px;
  }
}
</style>
