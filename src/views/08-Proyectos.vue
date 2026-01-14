<template>
  <section id="proyectos" class="projects-wrapper" ref="sectionRef" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <!-- HEADER -->
      <header class="projects-header">
        <span class="eyebrow">Ambientes Plego</span>
        <h2 class="title">Nuestros Proyectos</h2>
        <p class="subtitle">
          Algunos de los espacios donde nuestros muebles ya están siendo parte del día a día.
        </p>
      </header>

      <!-- =========================
           CARRUSEL PRINCIPAL
      ========================== -->
      <div ref="mainCarouselRef" class="projects-shell" @mouseenter="pauseAuto(0)" @mouseleave="resumeAuto(0)">
        <button class="nav-btn nav-left" @click="prev(0)" aria-label="Ver proyectos anteriores">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div ref="track0" class="projects-track" :class="{ 'is-dragging': isUserInteracting }"
          @scroll="onTrackScroll(0)" @pointerdown="onUserStart(0)" @pointerup="onUserEnd(0)"
          @pointercancel="onUserEnd(0)" @touchstart.passive="onUserStart(0)" @touchend="onUserEnd(0)">
          <article v-for="(item, i) in proyectos" :key="`main-${i}`" class="project-card"
            @click="openLightbox(item.img)">
            <img :src="item.img" :alt="item.alt" class="project-img" loading="lazy" />
          </article>
        </div>

        <button class="nav-btn nav-right" @click="next(0)" aria-label="Ver proyectos siguientes">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- CTA ARRIBA: SOLO CUANDO NO ESTÁ ABIERTO -->
      <div v-if="!showMore" class="cta-wrapper">
        <button class="cta-btn" type="button" @click="toggleMas">
          Descubrí más
        </button>
      </div>

      <!-- =========================
           3 CARRUSELES EXTRA (SIN TÍTULOS)
      ========================== -->
      <transition name="fade-slide">
        <div v-if="showMore" class="extras-wrapper">
          <!-- Extra 1 -->
          <div class="projects-shell" @mouseenter="pauseAuto(1)" @mouseleave="resumeAuto(1)">
            <button class="nav-btn nav-left" @click="prev(1)" aria-label="Anterior">
              <i class="fas fa-chevron-left"></i>
            </button>

            <div ref="track1" class="projects-track" :class="{ 'is-dragging': isUserInteracting }"
              @scroll="onTrackScroll(1)" @pointerdown="onUserStart(1)" @pointerup="onUserEnd(1)"
              @pointercancel="onUserEnd(1)" @touchstart.passive="onUserStart(1)" @touchend="onUserEnd(1)">
              <article v-for="(item, i) in proyectosExtra1" :key="`extra1-${i}`" class="project-card"
                @click="openLightbox(item.img)">
                <img :src="item.img" :alt="item.alt" class="project-img" loading="lazy" />
              </article>
            </div>

            <button class="nav-btn nav-right" @click="next(1)" aria-label="Siguiente">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <!-- Extra 2 -->
          <div class="projects-shell" @mouseenter="pauseAuto(2)" @mouseleave="resumeAuto(2)">
            <button class="nav-btn nav-left" @click="prev(2)" aria-label="Anterior">
              <i class="fas fa-chevron-left"></i>
            </button>

            <div ref="track2" class="projects-track" :class="{ 'is-dragging': isUserInteracting }"
              @scroll="onTrackScroll(2)" @pointerdown="onUserStart(2)" @pointerup="onUserEnd(2)"
              @pointercancel="onUserEnd(2)" @touchstart.passive="onUserStart(2)" @touchend="onUserEnd(2)">
              <article v-for="(item, i) in proyectosExtra2" :key="`extra2-${i}`" class="project-card"
                @click="openLightbox(item.img)">
                <img :src="item.img" :alt="item.alt" class="project-img" loading="lazy" />
              </article>
            </div>

            <button class="nav-btn nav-right" @click="next(2)" aria-label="Siguiente">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <!-- Extra 3 -->
          <div class="projects-shell" @mouseenter="pauseAuto(3)" @mouseleave="resumeAuto(3)">
            <button class="nav-btn nav-left" @click="prev(3)" aria-label="Anterior">
              <i class="fas fa-chevron-left"></i>
            </button>

            <div ref="track3" class="projects-track" :class="{ 'is-dragging': isUserInteracting }"
              @scroll="onTrackScroll(3)" @pointerdown="onUserStart(3)" @pointerup="onUserEnd(3)"
              @pointercancel="onUserEnd(3)" @touchstart.passive="onUserStart(3)" @touchend="onUserEnd(3)">
              <article v-for="(item, i) in proyectosExtra3" :key="`extra3-${i}`" class="project-card"
                @click="openLightbox(item.img)">
                <img :src="item.img" :alt="item.alt" class="project-img" loading="lazy" />
              </article>
            </div>

            <button class="nav-btn nav-right" @click="next(3)" aria-label="Siguiente">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <!-- ✅ CTA ABAJO DEL TODO -->
          <div class="cta-wrapper cta-wrapper--bottom">
            <button class="cta-btn" type="button" @click="toggleMas">
              Mostrar menos
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- LIGHTBOX -->
    <div v-if="lightboxOpen" class="lightbox-backdrop" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox" aria-label="Cerrar imagen ampliada">×</button>
      <div class="lightbox-content">
        <img :src="lightboxImg" class="lightbox-img" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue"

/* ===== IMÁGENES ===== */
import Carrusel1 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos1.jpg"
import Carrusel2 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos2.jpg"
import Carrusel3 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos3.jpg"
import Carrusel4 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos4.jpg"
import Carrusel5 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos5.jpg"
import Carrusel6 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos6.jpg"
import Carrusel7 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos7.jpg"
import Carrusel8 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos8.jpg"
import Carrusel9 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos9.jpg"
import Carrusel10 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos10.jpg"
import Carrusel11 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos11.jpg"
import Carrusel12 from "@/assets/Img/ProyectosCarrusel/CarruselProyectos12.jpg"

const proyectos = [
  { img: Carrusel1, alt: "Proyecto Plego 1" },
  { img: Carrusel2, alt: "Proyecto Plego 2" },
  { img: Carrusel3, alt: "Proyecto Plego 3" },
  { img: Carrusel4, alt: "Proyecto Plego 4" },
  { img: Carrusel5, alt: "Proyecto Plego 5" },
  { img: Carrusel6, alt: "Proyecto Plego 6" },
  { img: Carrusel7, alt: "Proyecto Plego 7" },
  { img: Carrusel8, alt: "Proyecto Plego 8" },
  { img: Carrusel9, alt: "Proyecto Plego 9" },
  { img: Carrusel10, alt: "Proyecto Plego 10" },
  { img: Carrusel11, alt: "Proyecto Plego 11" },
  { img: Carrusel12, alt: "Proyecto Plego 12" },
]

/* ✅ Por ahora duplican las mismas imágenes */
const proyectosExtra1 = proyectos
const proyectosExtra2 = proyectos
const proyectosExtra3 = proyectos

/* ===== ESTADO / REFS ===== */
const sectionRef = ref(null)
const mainCarouselRef = ref(null)

const isVisible = ref(false)
const showMore = ref(false)

/* ===== TRACK REFS (4 carruseles) ===== */
const track0 = ref(null)
const track1 = ref(null)
const track2 = ref(null)
const track3 = ref(null)
const tracks = [track0, track1, track2, track3]

/* ===== INDICES (4 carruseles) ===== */
const currentIndex = ref([0, 0, 0, 0])

/* ===== UX: user interaction ===== */
const isUserInteracting = ref(false)
let userIdleTimer = null

const onUserStart = (idx) => {
  isUserInteracting.value = true
  stopAuto(idx)
  if (userIdleTimer) clearTimeout(userIdleTimer)
}

const onUserEnd = (idx) => {
  if (userIdleTimer) clearTimeout(userIdleTimer)
  userIdleTimer = setTimeout(() => {
    isUserInteracting.value = false
    if (!lightboxOpen.value) startAuto(idx)
  }, 900)
}

/* ===== LIGHTBOX ===== */
const lightboxOpen = ref(false)
const lightboxImg = ref(null)

const openLightbox = (img) => {
  lightboxImg.value = img
  lightboxOpen.value = true
  stopAllAuto()
}

const closeLightbox = () => {
  lightboxOpen.value = false
  startAllAuto()
}

const onKeydown = (e) => {
  if (e.key === "Escape" && lightboxOpen.value) closeLightbox()
}

/* ===== HELPERS ===== */
const clampIndex = (index, total) => ((index % total) + total) % total

const getCardCenterLeft = (track, card) => {
  const trackCenter = track.clientWidth / 2
  const cardCenter = card.offsetLeft + card.clientWidth / 2
  return Math.max(0, cardCenter - trackCenter)
}

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

const getTrackEl = (idx) => tracks[idx]?.value

const scrollToIndex = (idx, index, opts = { smooth: true }) => {
  const track = getTrackEl(idx)
  if (!track) return

  const cards = track.querySelectorAll(".project-card")
  if (!cards.length) return

  const total = cards.length
  const safeIndex = clampIndex(index, total)
  currentIndex.value[idx] = safeIndex

  const target = cards[safeIndex]
  const left = getCardCenterLeft(track, target)

  if (opts.smooth) smoothScrollTo(track, left, 520)
  else track.scrollLeft = left
}

const next = (idx) => scrollToIndex(idx, currentIndex.value[idx] + 1)
const prev = (idx) => scrollToIndex(idx, currentIndex.value[idx] - 1)

let scrollTick = null
const onTrackScroll = (idx) => {
  const track = getTrackEl(idx)
  if (!track) return

  if (scrollTick) cancelAnimationFrame(scrollTick)
  scrollTick = requestAnimationFrame(() => {
    const cards = track.querySelectorAll(".project-card")
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

    currentIndex.value[idx] = bestIndex
  })
}

/* ===== AUTOPLAY (por carrusel) ===== */
const AUTO_DELAY = 3300
const autoTimers = [null, null, null, null]

const startAuto = (idx) => {
  if (autoTimers[idx]) return
  autoTimers[idx] = setInterval(() => {
    if (isUserInteracting.value || lightboxOpen.value) return
    next(idx)
  }, AUTO_DELAY)
}

const stopAuto = (idx) => {
  if (!autoTimers[idx]) return
  clearInterval(autoTimers[idx])
  autoTimers[idx] = null
}

const pauseAuto = (idx) => stopAuto(idx)
const resumeAuto = (idx) => {
  if (!lightboxOpen.value && !isUserInteracting.value) startAuto(idx)
}

const startAllAuto = () => {
  startAuto(0)
  if (showMore.value) {
    startAuto(1)
    startAuto(2)
    startAuto(3)
  }
}

const stopAllAuto = () => {
  stopAuto(0)
  stopAuto(1)
  stopAuto(2)
  stopAuto(3)
}

/* ===== Scroll UX al colapsar ===== */
const SCROLL_OFFSET = 90 // ajustá si tu navbar sticky tapa
const scrollToMainCarousel = () => {
  const el = mainCarouselRef.value
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
  window.scrollTo({ top, behavior: "smooth" })
}

/* ===== CTA: desplegar extras ===== */
const toggleMas = async () => {
  const goingToShow = !showMore.value
  showMore.value = goingToShow

  if (goingToShow) {
    await nextTick()
    scrollToIndex(1, 0, { smooth: false })
    scrollToIndex(2, 0, { smooth: false })
    scrollToIndex(3, 0, { smooth: false })
    startAllAuto()
  } else {
    stopAuto(1)
    stopAuto(2)
    stopAuto(3)

    await nextTick()
    scrollToMainCarousel()
  }
}

/* ===== INTERSECTION OBSERVER ===== */
let observer = null

onMounted(async () => {
  window.addEventListener("keydown", onKeydown)

  await nextTick()
  scrollToIndex(0, 0, { smooth: false })
  startAuto(0)

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
  stopAllAuto()
  if (observer) observer.disconnect()
  if (userIdleTimer) clearTimeout(userIdleTimer)
  window.removeEventListener("keydown", onKeydown)
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
  font-family: "Quicksand", sans-serif;
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

  scroll-snap-type: x mandatory;
  scroll-padding: 50%;

  -webkit-overflow-scrolling: touch;
  scroll-behavior: auto;
  overscroll-behavior-x: contain;
}

.projects-track.is-dragging {
  scroll-snap-type: none;
  cursor: grabbing;
}

.project-card {
  flex: 0 0 calc((100% - 3 * 1.5rem) / 4);
  scroll-snap-align: center;
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
   BOTONES (premium)
========================== */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 999px;

  border: 1px solid rgba(244, 200, 121, 0.28);
  background: rgba(8, 8, 8, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  color: rgba(255, 245, 230, 0.92);
  cursor: pointer;
  z-index: 3;

  display: grid;
  place-items: center;

  box-shadow:
    0 18px 50px rgba(0, 0, 0, 0.72),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);

  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease;
}

.nav-btn::after {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: inherit;
  background: radial-gradient(circle, rgba(244, 200, 121, 0.18), transparent 60%);
  opacity: 0;
  transition: opacity 0.18s ease;
  pointer-events: none;
}

.nav-btn i {
  font-size: 0.95rem;
  transition: transform 0.18s ease;
}

.nav-btn:hover {
  background: rgba(244, 200, 121, 0.92);
  border-color: rgba(244, 200, 121, 0.75);
  color: #0b0b0b;
  transform: translateY(-50%) scale(1.06);
  box-shadow:
    0 22px 65px rgba(0, 0, 0, 0.86),
    0 0 0 6px rgba(244, 200, 121, 0.10);
}

.nav-btn:hover::after {
  opacity: 1;
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.98);
}

.nav-btn:focus-visible {
  outline: none;
  box-shadow:
    0 22px 65px rgba(0, 0, 0, 0.86),
    0 0 0 4px rgba(244, 200, 121, 0.22);
}

/* adentro del carrusel */
.nav-left {
  left: 10px;
}

.nav-right {
  right: 10px;
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

.cta-wrapper--bottom {
  margin-top: 0.5rem;
  padding-bottom: 1.5rem;
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
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
}

.cta-btn:hover {
  background: rgba(244, 200, 121, 0.95);
  color: #050505;
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
}

/* ==========================
   EXTRAS
========================== */
.extras-wrapper {
  margin-top: 2.5rem;
  display: grid;
  gap: 2.2rem;
}

/* ==========================
   TRANSITION
========================== */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
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
  display: grid;
  place-items: center;
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
    left: 8px;
  }

  .nav-right {
    right: 8px;
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
    width: 40px;
    height: 40px;
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
