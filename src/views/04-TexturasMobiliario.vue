<template>
  <section id="texturas" class="texturas-hero">
    <!-- Fondo -->
    <div class="texturas-bg"></div>
    <div class="texturas-overlay"></div>

    <!-- 🔥 TIRA LED SUPERIOR MÁS REALISTA -->
    <div class="texturas-led-superior"></div>

    <!-- Contenido -->
    <div ref="contentRef" class="texturas-content" :class="{ 'is-visible': isVisible }">

<h2 class="texturas-title">
  <span class="texturas-title-line">Simulá las texturas</span>
  <span class="texturas-title-line texturas-title-line--secondary">
    de tu próximo mobiliario.
  </span>
</h2>


      <p class="texturas-subtitle">
        Definí vetas, colores y combinaciones antes de fabricar, para que el resultado final sea exactamente el que imaginás
      </p>

      <div class="texturas-swatches">
        <button v-for="(item, i) in texturas" :key="i" class="swatch-btn"
          :class="{ 'swatch-btn--active': item.id === texturaSeleccionada }" @click="handleSelect(item)">
          <span class="swatch-circle" :class="[
            { 'swatch-circle--active': item.id === texturaSeleccionada },
            { 'swatch-circle--extra': item.tipo === 'extra' }
          ]" :style="item.tipo !== 'extra'
              ? { backgroundImage: `url(${item.img})` }
              : {}">
            <span v-if="item.tipo === 'extra'" class="swatch-plus">
              +
            </span>
          </span>

          <span class="swatch-label" :class="{ 'swatch-label--active': item.id === texturaSeleccionada }">
            {{ item.nombre }}
          </span>
        </button>
      </div>

      <p class="texturas-helper">
        Hacé clic en una textura para visualizar cómo se vería aplicada en tus muebles.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'   // ⬅️ nuevo

import madera1 from '@/assets/Img/Texturas/Madera1.png'
import madera2 from '@/assets/Img/Texturas/Madera2.png'
import madera3 from '@/assets/Img/Texturas/Madera3.png'

// si ya no necesitás comunicarte con el padre, podés borrar esto,
// pero lo dejo por si lo querés reutilizar más adelante.
const emit = defineEmits(['select'])

const router = useRouter()              // ⬅️ nuevo

const texturas = [
  { id: 'roble', nombre: 'Roble', img: madera1, tipo: 'madera' },
  { id: 'paraiso', nombre: 'Paraíso', img: madera2, tipo: 'madera' },
  { id: 'nogal', nombre: 'Nogal', img: madera3, tipo: 'madera' },
  { id: 'mas-texturas', nombre: 'Más texturas', tipo: 'extra' },
]

const texturaSeleccionada = ref(texturas[0].id)

const whatsappNumber = '5491155798761'

const goToWhatsApp = () => {
  const base = `https://wa.me/${whatsappNumber}`
  const text = encodeURIComponent(
    'Hola, vengo desde la web de Plego y quiero conocer más texturas disponibles.'
  )
  window.open(`${base}?text=${text}`, '_blank')
}

const handleSelect = (item) => {
  // Círculo de + (más texturas) → WhatsApp
  if (item.tipo === 'extra') {
    goToWhatsApp()
    return
  }

  // Actualizamos selección local (estilo activo)
  texturaSeleccionada.value = item.id

  // Si querés seguir emitiendo al padre:
  emit('select', item)

  // 🔥 Navegación a la vista de acabado
  router.push({
    name: 'acabado',
    params: { textura: item.id }, // 'roble' | 'paraiso' | 'nogal'
  })
}

/* ====== INTERSECTION OBSERVER (queda igual) ====== */
const contentRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const el = contentRef.value
  if (!el) return

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.value) {
            isVisible.value = true
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.35,
      }
    )

    observer.observe(el)
  } else {
    isVisible.value = true
  }
})
</script>


<style scoped>
/* ============================================
   SECCIÓN PRINCIPAL
=============================================== */
.texturas-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
}

/* Fondo */
.texturas-bg {
  position: absolute;
  inset: 0;
  background-image: url('@/assets/Img/Texturas/FondoTexturas.png');
  background-size: cover;
  background-position: center;
  filter: brightness(0.55);
  z-index: 1;
}

/* Overlay */
.texturas-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.09), transparent 60%),
    rgba(0, 0, 0, 0.55);
  z-index: 2;
}

/* ============================================
   TIRA LED SUPERIOR
=============================================== */
.texturas-led-superior {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  pointer-events: none;
  z-index: 5;
}

.texturas-led-superior::before {
  content: "";
  position: absolute;
  top: 6px;
  left: 4%;
  right: 4%;
  height: 3px;
  border-radius: 999px;
  background: radial-gradient(circle,
    #c7c7c7 0%,
    #fdfdfd 35%,
    #ffffff 50%,
    #fdfdfd 65%,
    #c7c7c7 100%
  );
  box-shadow:
    0 0 10px rgba(255, 255, 255, 0.9),
    0 0 22px rgba(210, 210, 210, 0.8),
    0 0 35px rgba(200, 200, 200, 0.6);
}

.texturas-led-superior::after {
  content: "";
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 62px;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(240, 240, 240, 0.8) 0%,
    rgba(225, 225, 225, 0.45) 35%,
    rgba(200, 200, 200, 0.22) 65%,
    transparent 100%
  );
  opacity: 0.85;
  filter: blur(7px);
  mask-image: linear-gradient(to bottom, white 45%, transparent);
}

/* ============================================
   CONTENIDO
=============================================== */
.texturas-content {
  position: relative;
  z-index: 4;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
}

/* Estado inicial */
.texturas-title,
.texturas-subtitle,
.texturas-swatches,
.texturas-helper {
  opacity: 0;
  transform: translateY(24px);
}

/* Visible */
.texturas-content.is-visible .texturas-title {
  animation: fadeUp 0.9s ease forwards;
}

.texturas-content.is-visible .texturas-subtitle {
  animation: fadeUp 0.9s ease forwards;
  animation-delay: 0.15s;
}

.texturas-content.is-visible .texturas-swatches {
  animation: fadeUp 0.9s ease forwards;
  animation-delay: 0.3s;
}

.texturas-content.is-visible .texturas-helper {
  animation: fadeUp 0.9s ease forwards;
  animation-delay: 0.45s;
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   TÍTULO
=============================================== */
.texturas-title {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: center;
  max-width: 820px;
  margin: 0 auto 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.texturas-title-line {
  font-size: clamp(1.9rem, 3.5vw, 3rem);
  font-weight: 500;
  color: #ffffff;
  line-height: 1.18;
}

.texturas-title-line--secondary {
  font-weight: 600;
  letter-spacing: 0.07em;
  padding-bottom: 0.35rem;
}

.texturas-title::after {
  content: "";
  width: 180px;
  height: 2px;
  margin-top: 0.3rem;
  background: linear-gradient(
    to right,
    transparent,
    rgba(244, 200, 121, 0.95),
    transparent
  );
  border-radius: 999px;
}

/* Subtítulo */
.texturas-subtitle {
  color: #e7e0d6;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ============================================
   SWATCHES
=============================================== */
.texturas-swatches {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.swatch-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.18s ease;
}

.swatch-btn:hover {
  transform: translateY(-4px);
}

.swatch-circle {
  width: clamp(90px, 10vw, 130px);
  height: clamp(90px, 10vw, 130px);
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(255, 255, 255, 0.7);
  filter: brightness(1.2) contrast(1.15);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.55);
  transition: all 0.18s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swatch-circle--extra:hover .swatch-plus {
  transform: scale(1.15);
}

.swatch-plus {
  font-size: 2.4rem;
  color: #f4d69a;
  transition: transform 0.18s ease;
  text-shadow:
    0 0 10px rgba(0, 0, 0, 0.85),
    0 0 16px rgba(244, 214, 154, 0.9);
}

.swatch-circle--active {
  border-color: #f4c879;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);
}

.swatch-circle--extra {
  background: radial-gradient(circle at 30% 20%,
    rgba(255, 255, 255, 0.35),
    rgba(38, 32, 26, 0.96)
  );
  border-style: dashed;
  border-color: rgba(244, 200, 121, 0.8);
  filter: none;
}

.swatch-plus {
  font-size: 2.4rem;
  color: #f4d69a;
  text-shadow:
    0 0 10px rgba(0, 0, 0, 0.85),
    0 0 16px rgba(244, 214, 154, 0.9);
}

.swatch-label {
  font-size: 0.83rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f2e8dd;
  opacity: 0.85;
}

.swatch-label--active {
  opacity: 1;
  color: #ffe3a6;
}

/* Helper */
.texturas-helper {
  font-size: 0.85rem;
  color: #cbbfac;
  opacity: 0.9;
}

/* ============================================
   RESPONSIVE
=============================================== */
@media (max-width: 768px) {
  .texturas-hero {
    padding: 3rem 1.25rem;
  }

  .texturas-swatches {
    gap: 1.8rem;
  }
}

</style>
