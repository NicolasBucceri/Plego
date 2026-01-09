<template>
  <section class="nosotros-wrapper" ref="sectionRef" :class="{ 'is-visible': isVisible }">
    <div class="container">

      <!-- ============ BLOQUE NOSOTROS ============ -->
      <div class="nosotros-grid">

        <!-- Texto -->
        <div class="nosotros-card">
          <h2 class="nos-title">Nosotros</h2>

          <p>
            Somos una empresa dedicada al diseño y fabricación de muebles de cocinas,
            placares y vestidores.
          </p>

          <p>
            Junto con nuestro equipo de arquitectos y diseñadores de interiores brindamos
            asesoramiento profesional, ideas innovadoras y soluciones creativas para que
            cada mueble se adapte a la forma en la que vivís tus espacios.
          </p>

          <p>
            Todos los diseños son personalizados y fabricados a medida, cuidando cada
            detalle desde los materiales hasta la instalación final.
          </p>
        </div>

        <!-- Video lateral -->
        <div class="nosotros-media">
          <video class="nosotros-video" src="@/assets/Img/VideoNosotros.mp4" autoplay muted loop playsinline></video>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect() // anima solo una vez
      }
    },
    {
      threshold: 0.25,
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ========== SECCIÓN GENERAL ========== */
.nosotros-wrapper {
  padding: 6rem 0 5rem;
  background: #111;
  color: #f5f5f5;
  /* 👇 Sin animación acá: el fondo queda fijo */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ============ GRID PRINCIPAL ============ */
.nosotros-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 3rem;
  align-items: center;
}

/* Animaciones internas (stagger) */
.nosotros-card,
.nosotros-media {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s ease-out,
    transform 0.7s ease-out;
}

.nosotros-wrapper.is-visible .nosotros-card {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.1s;
}

.nosotros-wrapper.is-visible .nosotros-media {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.25s;
}

/* ============ CARD TEXTO ============ */
.nosotros-card {
  position: relative;
  padding: 2.5rem 2.5rem 2.8rem;
  background: rgba(12, 12, 12, 0.9);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
}

.nos-title {
  font-family: 'Quicksand', sans-serif;
  font-size: 2.6rem;
  margin: 0 0 1.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.nosotros-card p {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.98rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 1rem;
}

/* ============ VIDEO CONTENEDOR ============ */
.nosotros-media {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65);

  display: flex;
  align-items: center;
  justify-content: center;

  max-height: 500px;
  min-height: 300px;
}

.nosotros-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* video completo, sin recorte */
  display: block;
  filter: brightness(0.95) contrast(1.05);
}

/* Marco interior */
.nosotros-media::after {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  pointer-events: none;
  opacity: 0.9;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 992px) {
  .nosotros-grid {
    grid-template-columns: 1fr;
  }

  .nosotros-media {
    max-height: 380px;
  }

  .nos-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 576px) {
  .nosotros-wrapper {
    padding: 4rem 0;
  }

  .nosotros-card {
    padding: 1.6rem 1.3rem;
  }

  .nosotros-media {
    max-height: 300px;
  }
}
</style>
