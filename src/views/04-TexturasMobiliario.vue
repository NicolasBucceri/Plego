<template>
    <section id="texturas" class="texturas-hero">
        <!-- Fondo -->
        <div class="texturas-bg"></div>
        <div class="texturas-overlay"></div>

        <!-- Tira LED superior -->
        <div class="texturas-led-superior"></div>

        <!-- Contenido split -->
        <div ref="contentRef" class="texturas-content" :class="{ 'is-visible': isVisible }">
            <div class="texturas-split">

                <!-- PANEL IZQUIERDO -->
                <div class="texturas-panel">
                    <h2 class="texturas-title">
                        <span class="texturas-title-line">Simulá las texturas</span>
                        <span class="texturas-title-line texturas-title-line--secondary">
                            de tu próximo mobiliario.
                        </span>
                    </h2>

                    <p class="texturas-subtitle">
                        Definí vetas, colores y combinaciones antes de fabricar, para que el resultado final sea
                        exactamente el que imaginás
                    </p>

                    <!-- Swatches (acomodados) -->
                    <div class="texturas-swatches-grid">
                        <button v-for="(item, i) in texturas" :key="i" class="swatch-card"
                            :class="{ 'swatch-card--active': item.id === texturaSeleccionada }" type="button"
                            @click="handleSelect(item)">
                            <span class="swatch-preview" :class="{ 'swatch-preview--extra': item.tipo === 'extra' }"
                                :style="item.tipo !== 'extra' ? { backgroundImage: `url(${item.img})` } : {}">
                                <span v-if="item.tipo === 'extra'" class="swatch-plus">+</span>
                            </span>

                            <span class="swatch-label"
                                :class="{ 'swatch-label--active': item.id === texturaSeleccionada }">
                                {{ item.nombre }}
                            </span>
                        </button>
                    </div>

                    <p class="texturas-helper">
                        Hacé clic en una textura para visualizar cómo se vería aplicada en tus muebles.
                    </p>
                </div>

                <!-- PANEL DERECHO (VIDEO/RENDER) -->
                <div class="texturas-preview">
                    <div class="preview-frame">
                        <video autoplay muted loop playsinline>
                            <source src="../assets/Img/VideoTexturas.mp4" type="video/mp4" />
                        </video>
                        <div class="preview-led"></div>
                        <div class="preview-glass"></div>
                    </div>
                </div>


            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

import madera1 from "@/assets/Img/Texturas/Madera1.png"
import madera2 from "@/assets/Img/Texturas/Madera2.png"
import madera3 from "@/assets/Img/Texturas/Madera3.png"

const emit = defineEmits(["select"])
const router = useRouter()

const texturas = [
    { id: "roble", nombre: "Roble", img: madera1, tipo: "madera" },
    { id: "paraiso", nombre: "Paraíso", img: madera2, tipo: "madera" },
    { id: "nogal", nombre: "Nogal", img: madera3, tipo: "madera" },
    { id: "mas-texturas", nombre: "Más texturas", tipo: "extra" },
]

const texturaSeleccionada = ref(texturas[0].id)

const whatsappNumber = "5491155798761"

const goToWhatsApp = () => {
    const base = `https://wa.me/${whatsappNumber}`
    const text = encodeURIComponent("Hola, vengo desde la web de Plego y quiero conocer más texturas disponibles.")
    window.open(`${base}?text=${text}`, "_blank")
}

const handleSelect = (item) => {
    // + Más texturas => WhatsApp
    if (item.tipo === "extra") {
        goToWhatsApp()
        return
    }

    texturaSeleccionada.value = item.id
    emit("select", item)

    // Navega a la vista de acabado
    router.push({
        name: "acabado",
        params: { textura: item.id },
    })
}

/* Intersection Observer */
const contentRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
    const el = contentRef.value
    if (!el) return

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible.value) {
                        isVisible.value = true
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.35 }
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
    background-image: url("@/assets/Img/Texturas/FondoTexturas.png");
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
            #c7c7c7 100%);
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
    background: radial-gradient(ellipse at 50% 0%,
            rgba(240, 240, 240, 0.8) 0%,
            rgba(225, 225, 225, 0.45) 35%,
            rgba(200, 200, 200, 0.22) 65%,
            transparent 100%);
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
    width: 100%;
    max-width: 1400px;
}

/* Estado inicial */
.texturas-title,
.texturas-subtitle,
.texturas-swatches-grid,
.texturas-helper,
.texturas-preview {
    opacity: 0;
    transform: translateY(24px);
}

/* Visible */
.texturas-content.is-visible .texturas-title,
.texturas-content.is-visible .texturas-subtitle,
.texturas-content.is-visible .texturas-swatches-grid,
.texturas-content.is-visible .texturas-helper,
.texturas-content.is-visible .texturas-preview {
    animation: fadeUp 0.9s ease forwards;
}

.texturas-content.is-visible .texturas-subtitle {
    animation-delay: 0.12s;
}

.texturas-content.is-visible .texturas-swatches-grid {
    animation-delay: 0.24s;
}

.texturas-content.is-visible .texturas-helper {
    animation-delay: 0.36s;
}

.texturas-content.is-visible .texturas-preview {
    animation-delay: 0.18s;
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
   SPLIT LAYOUT
=============================================== */
.texturas-split {
    display: grid;
    grid-template-columns: 1fr 0.95fr;
    gap: clamp(2rem, 4vw, 4rem);
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 0 clamp(0.2rem, 1vw, 0.8rem);
}

/* Panel izquierdo */
.texturas-panel {
    display: flex;
    flex-direction: column;
    gap: 1.55rem;
    max-width: 760px;
}

/* ============================================
   TÍTULO
=============================================== */
.texturas-title {
    font-family: "Quicksand", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: flex-start;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0;
}

.texturas-title-line {
    font-family: "Quicksand", sans-serif;
    font-size: clamp(1.15rem, 2.2vw, 2.7rem);
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
    background: linear-gradient(to right,
            transparent,
            rgba(244, 200, 121, 0.95),
            transparent);
    border-radius: 999px;
}

/* Subtítulo */
.texturas-subtitle {
    color: #e7e0d6;
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    max-width: 640px;
    margin: 0;
    line-height: 1.6;
}

/* ============================================
   SWATCH GRID (prolijo)
=============================================== */
.texturas-swatches-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.35rem;
    width: 100%;
    max-width: 540px;
}

.swatch-card {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    transition: transform 0.18s ease;
}

.swatch-card:hover {
    transform: translateY(-4px);
}

.swatch-preview {
    width: 94px;
    height: 94px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: 2px solid rgba(255, 255, 255, 0.7);
    filter: brightness(1.1) contrast(1.12);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.55);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.swatch-card--active .swatch-preview {
    border-color: #f4c879;
    box-shadow: 0 0 0 6px rgba(244, 200, 121, 0.15), 0 16px 38px rgba(0, 0, 0, 0.65);
}

.swatch-preview--extra {
    background: radial-gradient(circle at 30% 20%,
            rgba(255, 255, 255, 0.35),
            rgba(38, 32, 26, 0.96));
    border-style: dashed;
    border-color: rgba(244, 200, 121, 0.8);
    filter: none;
}

.swatch-plus {
    font-size: 2.3rem;
    color: #f4d69a;
    transition: transform 0.18s ease;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.85), 0 0 16px rgba(244, 214, 154, 0.9);
}

.swatch-preview--extra:hover .swatch-plus {
    transform: scale(1.12);
}

.swatch-label {
    font-family: "Quicksand", sans-serif;
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
    margin: 0;
    max-width: 62ch;
}

/* ============================================
   VIDEO / PREVIEW (más chico y premium)
=============================================== */
.preview-frame{
  width: 100%;
  max-width: 440px;
  aspect-ratio: 3 / 4;
  border-radius: 32px;
  overflow: hidden;
  position: relative;
  background: #0b0b0b;
  box-shadow:
    0 60px 140px rgba(0,0,0,.9),
    inset 0 0 0 1px rgba(255,255,255,.05);
    margin-left: 20%;
    margin-bottom: -5%;
}

/* Video */
.preview-frame video{
  width:100%;
  height:100%;
  object-fit: cover;
  filter: brightness(.88) contrast(1.1) saturate(1.05);
}

/* Marco LED */
.preview-led{
  position:absolute;
  inset: 0;
  border-radius: 32px;
  pointer-events:none;
  box-shadow:
    inset 0 0 0 1px rgba(244,200,121,.45),
    inset 0 0 40px rgba(244,200,121,.18),
    0 0 90px rgba(244,200,121,.25);
}

/* Glass layer */
.preview-glass{
  position:absolute;
  inset:0;
  background:
    linear-gradient(120deg, rgba(255,255,255,.14), transparent 60%),
    radial-gradient(circle at 20% 10%, rgba(255,255,255,.22), transparent 55%);
  mix-blend-mode: screen;
  opacity:.55;
}

/* Sutil respiración */
.preview-frame{
  animation: frameBreath 7s ease-in-out infinite;
}

@keyframes frameBreath{
  0%{ box-shadow:0 60px 140px rgba(0,0,0,.9) }
  50%{ box-shadow:0 70px 160px rgba(0,0,0,.95) }
  100%{ box-shadow:0 60px 140px rgba(0,0,0,.9) }
}


/* ============================================
   RESPONSIVE
=============================================== */
@media (max-width: 1024px) {
  .texturas-hero {
    padding: 3.5rem 1.25rem;
  }

  .texturas-split {
    grid-template-columns: 1fr;
    gap: 2.2rem;
  }

  /* ✅ Panel arriba, video abajo */
  .texturas-panel { order: 0; }
  .texturas-preview { order: 1; }

  .preview-frame {
    max-width: 420px;
    margin: 0 auto;
  }

  .texturas-title {
    align-items: center;
    text-align: center;
  }

  .texturas-subtitle {
    margin: 0 auto;
    text-align: center;
  }

  .texturas-swatches-grid {
    margin: 0 auto;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .texturas-helper {
    text-align: center;
    margin: 0 auto;
  }
}


@media (max-width: 520px) {
    .texturas-swatches-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.15rem;
    }

    .swatch-preview {
        width: 88px;
        height: 88px;
    }
}
</style>
