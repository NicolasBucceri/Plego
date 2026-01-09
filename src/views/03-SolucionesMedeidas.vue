<template>
  <section id="soluciones" class="plego-soluciones-section position-relative overflow-hidden">
    <!-- Carrusel de fondo -->
    <div id="plegoSolucionesCarousel" class="carousel slide plego-bg-carousel" data-bs-ride="carousel"
      data-bs-interval="4500" data-bs-pause="false">
      <div class="carousel-inner">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-item" :class="{ active: index === 0 }">
          <img :src="slide.src" :alt="slide.alt || 'Proyecto Plego'" class="d-block w-100 plego-bg-img" />
          <div class="plego-bg-overlay"></div>
        </div>
      </div>
    </div>

    <!-- Contenido superpuesto -->
    <div ref="solucionesContent" class="plego-soluciones-content container-fluid">
      <h2 class="plego-soluciones-title text-center">SOLUCIONES A MEDIDA</h2>

      <p class="plego-subtitle text-center">Diseñamos · Fabricamos · Perfeccionamos</p>

      <div class="plego-circles-wrapper">
        <!-- Círculo 1 -->
        <button class="plego-circle-btn" type="button" @click="goToWhatsApp('Asesoramiento a medida')"
          @mouseenter="setHover(0)" @mouseleave="setHover(null)">
          <div class="plego-circle-orbit">
            <span class="orbit-trail"></span>
            <span class="orbit-dot"></span>
          </div>

          <span class="circle-label circle-label-uno">
            Asesoramiento a medida <br />para tu hogar
          </span>

          <div class="circle-separator"></div>

          <p v-if="hoverTarget === 0" class="circle-copy">
            Creamos tu espacio perfecto. Diseños únicos, estética que inspira, funcionalidad total. Un acompañamiento
            personalizado que transforma tu hogar. Contáctanos AHORA!
          </p>
        </button>

        <!-- Círculo 2 -->
        <button class="plego-circle-btn" type="button" @click="goToWhatsApp('Proyectos y desarrollos')"
          @mouseenter="setHover(1)" @mouseleave="setHover(null)">
          <div class="plego-circle-orbit">
            <span class="orbit-trail"></span>
            <span class="orbit-dot"></span>
          </div>

          <span class="circle-label circle-label-dev">
            Acompañamos a desarrolladores, estudios de arquitectura y constructoras
          </span>

          <div class="circle-separator"></div>

          <p v-if="hoverTarget === 1" class="circle-copy">
            Gestionamos proyectos con foco en los plazos, el cuidado del detalle y una ejecución precisa, garantizando
            resultados finales sólidos, confiables y de alta calidad.
          </p>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SeccionSoluciones",
  props: {
    slides: {
      type: Array,
      default: () => [
        { src: "@/assets/Img/BannerSolucionesMedida/Banner4.png", alt: "Cocina moderna 1" },
        { src: "@/assets/Img/BannerSolucionesMedida/Banner5.png", alt: "Cocina moderna 2" },
        { src: "@/assets/Img/BannerSolucionesMedida/Banner6.png", alt: "Cocina moderna 3" },
      ],
    },
  },
  data() {
    return {
      hoverTarget: null, // ahora es 0/1 en vez de "design/devs"
      whatsappNumber: "5491155798761",
      hasAnimated: false,
    };
  },
  mounted() {
    const el = this.$refs.solucionesContent;
    if (!el) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true;
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
    } else {
      this.hasAnimated = true;
      el.classList.add("is-visible");
    }
  },
  methods: {
    setHover(target) {
      this.hoverTarget = target;
    },
    goToWhatsApp(contexto) {
      const base = `https://wa.me/${this.whatsappNumber}`;

      const mensaje =
        `Hola, Plego.\n` +
        `Quería consultarles cuál es el proceso para cotizar mobiliario a medida ` +
        `y si existe la posibilidad de coordinar una reunión para evaluar el proyecto.\n` +
        `\n` +
        `Estoy interesado en: ${contexto}.\n` +
        `Quedo atento, muchas gracias.`;

      const text = encodeURIComponent(mensaje);
      window.open(`${base}?text=${text}`, "_blank");
    }

  },
};
</script>

<style scoped>
:root {
  --plego-main: #c8a27a;
  --plego-dark: #15110f;
  --plego-overlay: rgba(0, 0, 0, 0.55);
  --plego-circle-bg: rgba(25, 20, 18, 0.88);
  --plego-text: #ffffff;
}

/* =========================
   SECTION LAYOUT
========================= */
.plego-soluciones-section {
  position: relative;
  height: auto;
  min-height: 100vh;
  min-height: 100svh;
  min-height: 100dvh;
  color: var(--plego-text);
  background-color: #000;
  overflow: hidden;
}

/* =========================
   BACKGROUND CAROUSEL
========================= */
.plego-bg-carousel {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.plego-bg-carousel .carousel-inner,
.plego-bg-carousel .carousel-item {
  height: 100%;
}

.plego-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  /* ayuda a evitar “parpadeos” al cargar */
  transform: translateZ(0);
}

.plego-bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.45),
    rgba(0, 0, 0, 0.82)
  );

  /* capa estable para que el blur tenga “algo” detrás */
  transform: translateZ(0);
}

/* =========================
   CAROUSEL HEIGHT FIX
========================= */
.plego-bg-carousel,
.plego-bg-carousel .carousel-inner,
.plego-bg-carousel .carousel-item {
  height: 100%;
  min-height: 100%;
}

.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
  display: block;
}

/* =========================
   CONTENT OVERLAY
========================= */
.plego-soluciones-content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-block: clamp(2rem, 5vh, 4rem);
  padding-inline: clamp(1rem, 5vw, 3.25rem);
  gap: clamp(1rem, 2vh, 1.6rem);
}

/* =========================
   REVEAL ANIM
========================= */
.plego-soluciones-title,
.plego-subtitle,
.plego-circles-wrapper {
  opacity: 0;
  transform: translateY(24px);
}

.plego-soluciones-content.is-visible .plego-soluciones-title,
.plego-soluciones-content.is-visible .plego-subtitle,
.plego-soluciones-content.is-visible .plego-circles-wrapper {
  animation: fadeDown 0.9s ease forwards;
}

.plego-soluciones-content.is-visible .plego-subtitle {
  animation-delay: 0.15s;
}

.plego-soluciones-content.is-visible .plego-circles-wrapper {
  animation-delay: 0.3s;
}

@keyframes fadeDown {
  0% { opacity: 0; transform: translateY(24px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* =========================
   TITLE + SUBTITLE (FIX CENTRADO)
========================= */
.plego-soluciones-title {
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(1.55rem, 2.2vw, 2.4rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  position: relative;
  padding-bottom: 0.8rem;
  margin: 0;

  width: 100%;
  text-align: center;
  margin-inline: auto;
}

.plego-soluciones-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: min(140px, 60vw);
  height: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    to right,
    transparent,
    rgba(200, 162, 122, 0.9),
    transparent
  );
  border-radius: 8px;
}

.plego-subtitle {
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(0.78rem, 1.2vw, 0.95rem);
  opacity: 0.75;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0;
  max-width: 70ch;

  width: 100%;
  text-align: center;
  margin-inline: auto;
}

/* =========================
   CIRCLES WRAPPER
========================= */
.plego-circles-wrapper {
  width: min(1250px, 100%);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  place-items: center;
  gap: clamp(1.5rem, 3vw, 3rem);
  margin-top: clamp(1rem, 2vh, 1.8rem);
}

/* =========================
   LABELS (FIX BUG VISUAL)
========================= */
.circle-label,
.circle-label-uno,
.circle-label-dev {
  font-family: 'Quicksand', sans-serif;

  display: block;
  width: 100%;
  text-align: center;
  margin-inline: auto;

  font-size: clamp(1.05rem, 1.05vw, 1.2rem) !important;
  line-height: 1.35;
  letter-spacing: 0.12em;
  font-weight: 600;
  max-width: 85%;
  text-wrap: balance;
}

/* =========================
   CIRCLE BUTTON (BLUR CONSISTENTE)
========================= */
.plego-circle-btn {
  position: relative;
  width: clamp(310px, 28vw, 370px); /* un poquito más chico */
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: none;

  background: rgba(255, 255, 255, 0.075);

  /* blur estable */
  backdrop-filter: blur(28px) saturate(1.25) brightness(1.08);
  -webkit-backdrop-filter: blur(28px) saturate(1.25) brightness(1.08);

  color: var(--plego-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 0.6rem;
  cursor: pointer;
  overflow: hidden;
  padding: 1.5rem;
  isolation: isolate;
  text-align: center;

  /* ✅ fix “a veces no toma blur”: fuerza capa */
  transform: translateZ(0);
  will-change: transform, backdrop-filter;

  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.plego-circle-btn::before {
  content: "";
  position: absolute;
  inset: -20%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 70%);
  z-index: -1;
  filter: blur(24px);
}

.plego-circle-btn::after {
  content: "";
  position: absolute;
  bottom: -5%;
  width: 120%;
  height: 40%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
  border-radius: 50%;
  opacity: 0.6;
}

@media (hover: hover) and (pointer: fine) {
  .plego-circle-btn:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 22px 55px rgba(0, 0, 0, 0.8);
    background: rgba(20, 16, 14, 0.96);
  }
}

/* Línea separadora */
.circle-separator {
  width: 45%;
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
  margin: 4px auto 6px;
  opacity: 0;
  transform: scaleX(0.6);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

/* Texto descriptivo */
.circle-copy {
  font-size: clamp(0.85rem, 0.9vw, 1rem);
  text-align: center;
  max-width: min(20rem, 78%);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

@media (hover: hover) and (pointer: fine) {
  .plego-circle-btn:hover .circle-separator {
    opacity: 1;
    transform: scaleX(1);
  }

  .plego-circle-btn:hover .circle-copy {
    opacity: 0.9;
    transform: translateY(0);
  }

  .plego-circle-btn:hover .circle-label {
    color: var(--plego-main);
  }
}

/* =========================
   ORBITS
========================= */
.plego-circle-orbit {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
}

.orbit-trail {
  position: absolute;
  width: 94%;
  height: 94%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border-top: 2px solid rgba(200, 162, 122, 0.6);
  border-right: 2px solid rgba(200, 162, 122, 0.25);
  border-bottom: 2px solid rgba(200, 162, 122, 0.05);
  border-left: 2px solid transparent;
  filter: blur(0.4px);
  animation: orbit-trail 4.5s linear infinite;
}

.orbit-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--plego-main);
  box-shadow: 0 0 6px var(--plego-main), 0 0 12px rgba(200, 162, 122, 0.8);
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: orbit 4.5s linear infinite;
}

@media (hover: hover) and (pointer: fine) {
  .plego-circle-btn:hover .orbit-dot {
    animation-duration: 3.4s !important;
  }
}

@keyframes orbit {
  0% { transform: rotate(0deg) translateX(47%); }
  100% { transform: rotate(360deg) translateX(47%); }
}

@keyframes orbit-trail {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* =========================
   MOBILE
========================= */
@media (max-width: 768px) {
  .plego-soluciones-content {
    justify-content: flex-start;
    padding-top: clamp(3.2rem, 7vh, 4.6rem);
    padding-bottom: calc(clamp(1.2rem, 4vh, 2.2rem) + env(safe-area-inset-bottom));
    gap: 1rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .plego-circles-wrapper {
    grid-template-columns: 1fr;
    row-gap: 2rem;
    width: 100%;
  }

  .plego-circle-btn {
    width: clamp(235px, 82vw, 315px);
    padding: 1.35rem;

    /* blur también en mobile (mismos valores base) */
    backdrop-filter: blur(28px) saturate(1.3) brightness(1.08);
    -webkit-backdrop-filter: blur(28px) saturate(1.3) brightness(1.08);
  }

  .circle-label,
  .circle-label-uno,
  .circle-label-dev {
    max-width: 92%;
    letter-spacing: 0.1em;
    font-size: 1.05rem !important;
  }

  .orbit-trail { width: 92%; height: 92%; }
}

/* Pantallas bajitas */
@media (max-height: 740px) {
  .plego-soluciones-section {
    height: auto;
    min-height: 100svh;
  }

  .plego-soluciones-content {
    justify-content: flex-start;
    padding-top: 3rem;
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
    gap: 0.9rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

</style>






