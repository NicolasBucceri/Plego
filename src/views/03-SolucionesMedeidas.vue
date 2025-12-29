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
        { src: "@/assets/Img/Banner4.png", alt: "Cocina moderna 1" },
        { src: "@/assets/Img/Banner5.png", alt: "Cocina moderna 2" },
        { src: "@/assets/Img/Banner6.png", alt: "Cocina moderna 3" },
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
      const text = encodeURIComponent(
        `Hola, vengo desde la web de Plego y estoy interesado en: ${contexto}.`
      );
      window.open(`${base}?text=${text}`, "_blank");
    },
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

/* SECTION LAYOUT */
.plego-soluciones-section {
  position: relative;
  height: 100vh;
  min-height: 100vh;
  color: var(--plego-text);
  background-color: #000;
  overflow: hidden;
}

/* Carrusel de fondo full-screen */
.plego-bg-carousel {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.carousel-item,
.plego-bg-img {
  height: 100%;
}

.plego-bg-img {
  width: 100%;
  object-fit: cover;
}

.plego-bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center,
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.8));
}

/* Contenido superpuesto */
.plego-soluciones-content {
  position: relative;
  z-index: 3;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 2rem;
  padding-inline: clamp(1.5rem, 6vw, 3rem);
  gap: 1.5rem;
}

/* Animación por sección */
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
  0% {
    opacity: 0;
    transform: translateY(24px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Título */
.plego-soluciones-title {
  font-size: clamp(1.8rem, 2.4vw, 2.4rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  position: relative;
  padding-bottom: 0.8rem;
}

.plego-soluciones-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 140px;
  height: 2px;
  transform: translateX(-50%);
  background: linear-gradient(to right,
      transparent,
      rgba(200, 162, 122, 0.9),
      transparent);
  border-radius: 8px;
}

/* Subtítulo */
.plego-subtitle {
  font-size: 0.9rem;
  opacity: 0.75;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0;
}

/* Wrapper círculos */
.plego-circles-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  margin-top: 1.5rem;
}

/* Labels */
.circle-label,
.circle-label-uno,
.circle-label-dev {
  text-align: center;
  font-size: 1.22rem !important;
  line-height: 1.33;
  letter-spacing: 0.03em;
  font-weight: 600;
  max-width: 80%;
  margin-inline: auto;
}

/* Círculo */
.plego-circle-btn {
  position: relative;
  width: clamp(310px, 33vw, 390px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: none;

  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px) brightness(1.15);

  color: var(--plego-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
  overflow: hidden;
  padding: 1.6rem;
  isolation: isolate;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
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

.plego-circle-btn:hover {
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.8);
  background: rgba(20, 16, 14, 0.96);
}

/* Línea separadora: oculta por defecto */
.circle-separator {
  width: 45%;
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
  margin: 4px auto 6px;

  opacity: 0;
  transform: scaleX(0.6);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

/* Texto descriptivo: oculto por defecto */
.circle-copy {
  font-size: 0.8rem;
  text-align: center;
  max-width: 15rem;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.plego-circle-btn:hover .circle-separator {
  opacity: 1;
  transform: scaleX(1);
}

.plego-circle-btn:hover .circle-copy {
  opacity: 0.9;
  transform: translateY(0);
}



/* ÓRBITAS */
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
  box-shadow:
    0 0 6px var(--plego-main),
    0 0 12px rgba(200, 162, 122, 0.8);
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: orbit 4.5s linear infinite;
}

.plego-circle-btn:hover .orbit-dot {
  animation-duration: 3.4s !important;
}

.plego-circle-btn:hover .circle-label {
  color: var(--plego-main);
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(47%);
  }

  100% {
    transform: rotate(360deg) translateX(47%);
  }
}

@keyframes orbit-trail {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .plego-soluciones-content {
    padding-top: 4rem;
    gap: 2rem;
  }

  .plego-circles-wrapper {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  .plego-circle-btn {
    width: 260px;
    padding: 1.4rem;
  }

  .circle-label,
  .circle-label-uno,
  .circle-label-dev {
    font-size: 1.05rem !important;
    max-width: 90%;
  }
}
</style>
