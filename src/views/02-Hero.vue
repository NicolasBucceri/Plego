<template>
  <section class="hero-plego">
    <!-- CARRUSEL SOLO DE FONDO -->
    <div id="heroCarousel" class="carousel slide carousel-fade hero-bg" data-bs-ride="carousel" data-bs-interval="3000"
      data-bs-pause="false" data-bs-touch="true">

      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="hero-slide" :style="{ backgroundImage: `url(${banner1})` }">
            <div class="hero-overlay"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="{ backgroundImage: `url(${banner2})` }">
            <div class="hero-overlay"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="{ backgroundImage: `url(${banner3})` }">
            <div class="hero-overlay"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="{ backgroundImage: `url(${banner4})` }">
            <div class="hero-overlay"></div>
          </div>
        </div>

        <div class="carousel-item">
          <div class="hero-slide" :style="{ backgroundImage: `url(${banner5})` }">
            <div class="hero-overlay"></div>
          </div>
        </div>
      </div>

      <!-- CONTROLES (ocultos por CSS) -->
      <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>

    <!-- LÁMPARAS / TIRA LED -->
    <Lamparas3D />

    <!-- TEXTO ENCIMA DEL FONDO -->
    <div class="hero-content container">
      <h1 class="hero-title-inline">
        <span class="hero-italic">Viví el diseño</span>
        <span class="hero-federo">PLEGO!</span>
      </h1>

      <p class="hero-text">
        La experiencia de un servicio integral en <strong>amoblamientos</strong> a medida.
        Cocinas, vestidores y mobiliarios que elevan tus espacios.
      </p>

      <button class="btn-hero" @click="irASoluciones">Consultanos</button>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import banner1 from "@/assets/Img/BannerHero/Banner1Inicio.png";
import banner2 from "@/assets/Img/BannerHero/Banner2Inicio.png";
import banner3 from "@/assets/Img/BannerHero/Banner3Inicio.png";
import banner4 from "@/assets/Img/BannerHero/Banner4Inicio.png";
import banner5 from "@/assets/Img/BannerHero/Banner5Inicio.png";


import Lamparas3D from "@/components/Lamparas3D.vue";

const irASoluciones = () => {
  const el = document.getElementById("soluciones");
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

onMounted(() => {
  setTimeout(() => {
    document.querySelector(".hero-content")?.classList.add("hero-animate");
  }, 150);
});
</script>

<style scoped>
/* ======================= */
/* HERO BASE */
/* ======================= */
.hero-plego {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.hero-bg,
.hero-plego .carousel-inner,
.hero-plego .carousel-item {
  height: 100vh;
}

.hero-slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

/* ======================= */
/* TEXTO HERO */
/* ======================= */
.hero-content {
  position: absolute;
  top: 50%;
  left: clamp(3rem, 9vw, 7rem);
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  color: #fff;
}

/* TÍTULO EN LÍNEA */
.hero-title-inline {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  white-space: nowrap;
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  margin-bottom: 1.6rem;
}

.hero-italic {
  font-family: "Playfair Display", serif;
  font-style: italic;
}

.hero-federo {
  font-family: "Federo", sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* TEXTO */
.hero-text {
  font-family: 'Quicksand', sans-serif;
  font-size: 1.15rem;
  line-height: 1.8;
  max-width: 680px;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  color: #f1f1f1;
}

.hero-text strong {
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: lowercase;
  color: #ffffff;
}

/* BOTÓN */
.btn-hero {
  font-family: 'Quicksand', sans-serif;
  letter-spacing: 0.18em;
  font-weight: 600;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  padding: 0.75rem 2.1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #ffffff, #ececec);
  color: #222;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: all 0.35s cubic-bezier(.16, .84, .44, 1.2);
}

.btn-hero:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.45);
}


/* ======================= */
/* 🔥 ANIMACIONES */
/* ======================= */

.hero-animate .hero-title-inline {
  animation: fadeLeft 0.9s ease-out forwards;
}

.hero-animate .hero-text {
  animation: fadeUp 1s ease-out forwards;
  animation-delay: 0.25s;
}

.hero-animate .btn-hero {
  animation: dropIn 0.9s cubic-bezier(.16, .84, .44, 1.2) forwards;
  animation-delay: 0.45s;
}

@keyframes fadeLeft {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(25px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropIn {
  0% {
    opacity: 0;
    transform: translateY(-35px);
  }

  60% {
    opacity: 1;
    transform: translateY(8px);
  }

  100% {
    transform: translateY(0);
  }
}

/* ======================= */
/* ❌ BORRAR FLECHAS CARRUSEL */
/* ======================= */
.carousel-control-prev,
.carousel-control-next {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

:deep(.carousel-control-prev),
:deep(.carousel-control-next) {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* ======================= */
/* RESPONSIVE */
/* ======================= */
@media (max-width: 768px) {
  .hero-content {
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    align-items: center;
  }

  .btn-hero {
    align-self: center;
  }
}
</style>
