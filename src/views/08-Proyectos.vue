<template>
  <section id="proyectos" class="projects-wrapper" ref="sectionRef" :class="{ 'is-visible': isVisible }">
    <div class="container">

      <!-- HEADER -->
      <header class="projects-header">
        <span class="eyebrow">Ambientes Plego</span>
        <h2 class="title">Proyectos</h2>
        <p class="subtitle">
          Algunos de los espacios donde nuestros muebles ya están siendo parte del día a día.
        </p>
      </header>

      <!-- CARRUSEL -->
      <div class="projects-shell" @mouseenter="pauseAuto" @mouseleave="resumeAuto">
        <!-- FLECHA IZQUIERDA -->
        <button class="nav-btn nav-left" @click="prev" aria-label="Ver proyectos anteriores">
          <i class="fas fa-chevron-left"></i>
        </button>

        <!-- TRACK -->
        <div ref="trackRef" class="projects-track" :class="{ 'is-dragging': isUserInteracting }" @scroll="onTrackScroll"
          @pointerdown="onUserStart" @pointerup="onUserEnd" @pointercancel="onUserEnd" @touchstart.passive="onUserStart"
          @touchend="onUserEnd">
          <article v-for="(item, i) in proyectos" :key="i" class="project-card" @click="openLightbox(item.img)">
            <img :src="item.img" :alt="item.alt" class="project-img" loading="lazy" />
          </article>
        </div>

        <!-- FLECHA DERECHA -->
        <button class="nav-btn nav-right" @click="next" aria-label="Ver proyectos siguientes">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- CTA -->
      <div class="cta-wrapper">
        <a href="https://www.instagram.com/plegoamoblamientos" target="_blank" rel="noopener noreferrer"
          class="cta-btn">
          Descubrí más
        </a>
      </div>
    </div>

    <!-- ============= LIGHTBOX ============= -->
    <div v-if="lightboxOpen" class="lightbox-backdrop" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox" aria-label="Cerrar imagen ampliada">
        ×
      </button>

      <div class="lightbox-content">
        <img :src="lightboxImg" class="lightbox-img" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

/* ===== IMÁGENES ===== */
import Carrusel1 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos1.jpg'
import Carrusel2 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos2.jpg'
import Carrusel3 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos3.jpg'
import Carrusel4 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos4.jpg'
import Carrusel5 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos5.jpg'
import Carrusel6 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos6.jpg'
import Carrusel7 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos7.jpg'
import Carrusel8 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos8.jpg'
import Carrusel9 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos9.jpg'
import Carrusel10 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos10.jpg'
import Carrusel11 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos11.jpg'
import Carrusel12 from '@/assets/Img/ProyectosCarrusel/CarruselProyectos12.jpg'

const proyectos = [
  { img: Carrusel1, alt: 'Proyecto Plego 1' },
  { img: Carrusel2, alt: 'Proyecto Plego 2' },
  { img: Carrusel3, alt: 'Proyecto Plego 3' },
  { img: Carrusel4, alt: 'Proyecto Plego 4' },
  { img: Carrusel5, alt: 'Proyecto Plego 5' },
  { img: Carrusel6, alt: 'Proyecto Plego 6' },
  { img: Carrusel7, alt: 'Proyecto Plego 7' },
  { img: Carrusel8, alt: 'Proyecto Plego 8' },
  { img: Carrusel9, alt: 'Proyecto Plego 9' },
  { img: Carrusel10, alt: 'Proyecto Plego 10' },
  { img: Carrusel11, alt: 'Proyecto Plego 11' },
  { img: Carrusel12, alt: 'Proyecto Plego 12' }
]

/* ===== REFS / ESTADO ===== */
const trackRef = ref(null)
const sectionRef = ref(null)

const currentIndex = ref(0)
const isVisible = ref(false)

/* ===== UX: detecta interacción del user (evita autoplayer peleador) ===== */
const isUserInteracting = ref(false)
let userIdleTimer = null

const onUserStart = () => {
  isUserInteracting.value = true
  stopAuto()
  if (userIdleTimer) clearTimeout(userIdleTimer)
}

const onUserEnd = () => {
  if (userIdleTimer) clearTimeout(userIdleTimer)
  userIdleTimer = setTimeout(() => {
    isUserInteracting.value = false
    if (!lightboxOpen.value) startAuto()
  }, 900)
}

/* ===== LIGHTBOX ===== */
const lightboxOpen = ref(false)
const lightboxImg = ref(null)

const openLightbox = (img) => {
  lightboxImg.value = img
  lightboxOpen.value = true
  stopAuto()
}

const closeLightbox = () => {
  lightboxOpen.value = false
  startAuto()
}

/* Cerrar con ESC */
const onKeydown = (e) => {
  if (e.key === 'Escape' && lightboxOpen.value) closeLightbox()
}

/* ===== HELPERS ===== */
const clampIndex = (index, total) => ((index % total) + total) % total

const getCardCenterLeft = (track, card) => {
  const trackCenter = track.clientWidth / 2
  const cardCenter = card.offsetLeft + card.clientWidth / 2
  return Math.max(0, cardCenter - trackCenter)
}

/* Smooth “premium” (RAF easing) */
const smoothScrollTo = (el, to, duration = 520) => {
  const start = el.scrollLeft
  const change = to - start
  const startTime = performance.now()

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  const animate = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(1, elapsed / duration)
    el.scrollLeft = start + change * easeOutCubic(progress)
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

/* ===== SCROLL A CARD (centrada) ===== */
const scrollToIndex = (index, opts = { smooth: true }) => {
  const track = trackRef.value
  if (!track) return

  const cards = track.querySelectorAll('.project-card')
  if (!cards.length) return

  const total = cards.length
  const safeIndex = clampIndex(index, total)
  currentIndex.value = safeIndex

  const target = cards[safeIndex]
  const left = getCardCenterLeft(track, target)

  if (opts.smooth) smoothScrollTo(track, left, 520)
  else track.scrollLeft = left
}

const next = () => scrollToIndex(currentIndex.value + 1)
const prev = () => scrollToIndex(currentIndex.value - 1)

/* ===== Sync index cuando el user scrollea ===== */
let scrollTick = null
const onTrackScroll = () => {
  const track = trackRef.value
  if (!track) return

  if (scrollTick) cancelAnimationFrame(scrollTick)
  scrollTick = requestAnimationFrame(() => {
    const cards = track.querySelectorAll('.project-card')
    if (!cards.length) return

    const trackCenter = track.scrollLeft + track.clientWidth / 2

    let bestIndex = 0
    let bestDist = Infinity

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const dist = Math.abs(cardCenter - trackCenter)
      if (dist < bestDist) {
        bestDist = dist
        bestIndex = i
      }
    })

    currentIndex.value = bestIndex
  })
}

/* ===== AUTOPLAY ===== */
let autoTimer = null
const AUTO_DELAY = 3300 // 👈 más ágil

const startAuto = () => {
  if (autoTimer) return
  autoTimer = setInterval(() => {
    if (isUserInteracting.value || lightboxOpen.value) return
    next()
  }, AUTO_DELAY)
}

const stopAuto = () => {
  if (!autoTimer) return
  clearInterval(autoTimer)
  autoTimer = null
}

const pauseAuto = () => stopAuto()
const resumeAuto = () => {
  if (!lightboxOpen.value && !isUserInteracting.value) startAuto()
}

/* ===== INTERSECTION OBSERVER ===== */
let observer = null

onMounted(async () => {
  window.addEventListener('keydown', onKeydown)

  await nextTick()
  scrollToIndex(0, { smooth: false })
  startAuto()

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  stopAuto()
  if (observer) observer.disconnect()
  if (userIdleTimer) clearTimeout(userIdleTimer)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* ==========================
   WRAPPER
========================== */
.projects-wrapper {
  background: #111;
  padding: 5.5rem 0;
  color: #f3eee5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ==========================
   HEADER
========================== */
.projects-header {
  text-align: center;
  margin-bottom: 3.5rem;
  opacity: 0;
  transform: translateY(-24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.projects-wrapper.is-visible .projects-header {
  opacity: 1;
  transform: translateY(0);
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.65;
}

.title {
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  color: #fff;
}

.subtitle {
  font-size: 0.95rem;
  opacity: 0.75;
}

/* ==========================
   CARRUSEL
========================== */
.projects-shell {
  position: relative;
  max-width: 1050px;
  margin: 0 auto 3rem;
  opacity: 0;
  transform: translateX(60px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}

.projects-wrapper.is-visible .projects-shell {
  opacity: 1;
  transform: translateX(0);
}

.projects-track {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0.75rem 0.25rem;

  /* ✅ se siente “carrusel”, no “scroll cualquiera” */
  scroll-snap-type: x mandatory;
  scroll-padding: 50%;

  /* ✅ mejora la suavidad y performance */
  -webkit-overflow-scrolling: touch;
  scroll-behavior: auto;
  overscroll-behavior-x: contain;
}

.projects-track.is-dragging {
  scroll-snap-type: none;
  /* mientras arrastra, no pega saltos raros */
  cursor: grabbing;
}

.project-card {
  flex: 0 0 calc((100% - 3 * 1.5rem) / 4);
  scroll-snap-align: center;
  /* 👈 ahora centra */
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: #111;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6);
  cursor: zoom-in;
  user-select: none;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease, filter 0.35s ease;
}

.project-card:hover .project-img {
  transform: scale(1.04);
  filter: brightness(1.05);
}

/* ocultar scrollbar */
.projects-track::-webkit-scrollbar {
  display: none;
}

.projects-track {
  scrollbar-width: none;
}

/* ==========================
   BOTONES
========================== */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(12, 12, 12, 0.9);
  color: #f3eee5;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-left {
  left: -18px;
}

.nav-right {
  right: -18px;
}

.nav-btn:hover {
  background: rgba(244, 200, 121, 0.95);
  color: #050505;
  transform: translateY(-50%) translateY(-2px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.95);
}

/* ==========================
   CTA
========================== */
.cta-wrapper {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.projects-wrapper.is-visible .cta-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.9rem;
  border-radius: 999px;
  font-size: 0.92rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(244, 200, 121, 0.9);
  color: #f7f1e6;
  background: transparent;
  text-decoration: none;
  transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
}

.cta-btn:hover {
  background: rgba(244, 200, 121, 0.95);
  color: #050505;
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
}

/* ==========================
   LIGHTBOX
========================== */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
  backdrop-filter: blur(4px);
}

.lightbox-content {
  max-width: 1000px;
  width: 100%;
  text-align: center;
  animation: lightbox-in 0.25s ease-out;
}

.lightbox-img {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.9);
}

.lightbox-close {
  position: fixed;
  top: 1.5rem;
  right: 1.8rem;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: none;
  background: rgba(12, 12, 12, 0.9);
  color: #f3eee5;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.85);
}

.lightbox-close:hover {
  background: rgba(244, 200, 121, 0.95);
  color: #050505;
}

@keyframes lightbox-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ==========================
   RESPONSIVE
========================== */
@media (max-width: 1024px) {
  .project-card {
    flex: 0 0 calc((100% - 1.5rem) / 2);
  }

  .nav-left {
    left: -8px;
  }

  .nav-right {
    right: -8px;
  }
}

@media (max-width: 640px) {
  .projects-wrapper {
    padding: 4.5rem 0 4rem;
  }

  .project-card {
    flex: 0 0 80vw;
  }

  .nav-btn {
    width: 34px;
    height: 34px;
  }

  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 34px;
    height: 34px;
    font-size: 1.3rem;
  }
}
</style>
