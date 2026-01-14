<template>
  <section class="mueble-view" :class="`mueble-view--${props.textura}`">
    <div class="mueble-inner">
      <!-- ============ HEADER / VISTA APLICADA ============ -->
      <header class="mueble-header">
        <span class="mueble-eyebrow">Vista aplicada</span>

        <h1 class="mueble-title">
          Acabado
          <span class="mueble-title-highlight">
            {{ dataTextura.nombre }}
          </span>
        </h1>

        <p class="mueble-subtitle">
          {{ dataTextura.descripcion }}
        </p>

        <div class="mueble-tags">
          <span class="mueble-tag">
            {{ dataTextura.mood }}
          </span>
          <span class="mueble-tag mueble-tag--outline">
            {{ dataTextura.uso }}
          </span>
          <span class="mueble-tag mueble-tag--ghost">
            {{ dataTextura.iluminacion }}
          </span>
        </div>
      </header>

      <!-- ============ HERO DEL MUEBLE ============ -->
      <div class="mueble-preview">
        <div class="mueble-preview-frame" :style="{ backgroundImage: `url(${imagenHero})` }">
          <div class="mueble-preview-content">
            <div class="mueble-preview-title-big">
              {{ dataTextura.nombre.toUpperCase() }}
            </div>

            <div class="mueble-preview-panel">
              <p class="mueble-preview-text">
                {{ dataTextura.resumenCorto }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ CUERPO LARGO ============ -->
      <div class="mueble-body">
        <!-- ========== SECCIÓN: GALERÍA ÚNICA (TODO JUNTO) ========== -->
        <section v-if="galeriaUnificada.length" class="mueble-section mueble-section--gallery">
          <div class="mueble-section-header">
            <h2 class="mueble-section-title">Galería de ambientes</h2>
            <p class="mueble-section-subtitle">
              Todas las imágenes disponibles para el acabado {{ dataTextura.nombre }}.
              Hacé click para ampliar.
            </p>
          </div>

          <!-- GRID UNIFICADA -->
          <div class="mueble-gallery-grid">
            <button v-for="(item, index) in galeriaUnificada" :key="`all-${index}`"
              class="mueble-gallery-item mueble-gallery-btn" type="button"
              :style="{ backgroundImage: `url(${item.url})` }" @click="openLightbox(item.url)"
              :aria-label="`Abrir ${item.label} ${item.number}`">
            </button>
          </div>
        </section>

        <!-- (Opcional) si no hay imágenes: no renderiza nada -->
      </div>
    </div>

    <!-- ============= LIGHTBOX SIMPLE (TIPO TU EJEMPLO) ============= -->
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
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue"

// ================== IMPORTS DE IMÁGENES (fallback/hero) ==================
import fondoRoble from "@/assets/Img/Texturas/CocinaRoble.png"
import fondoParaiso from "@/assets/Img/Texturas/CocinaParaiso.png"
import fondoNogal from "@/assets/Img/Texturas/CocinaRoble.png" // reemplazalo cuando tengas foto real

// ================== PROPS ==================
const props = defineProps({
  textura: { type: String, required: true } // 'roble' | 'paraiso' | 'nogal'
})

// ================== FONDOS (fallback) ==================
const fondos = {
  roble: fondoRoble,
  paraiso: fondoParaiso,
  nogal: fondoNogal
}

// ================== DATA POR TEXTURA ==================
const dataPorTextura = {
  roble: {
    nombre: "Roble",
    descripcion: "Un acabado cálido y contemporáneo...",
    mood: "Cálido",
    uso: "Cocinas & livings",
    iluminacion: "Luz natural media/alta",
    resumenCorto: "Equilibrio entre calidez y actualidad...",
    idealPara: ["Cocinas integradas", "Muebles de guardado", "Islas y barras iluminadas"]
  },
  paraiso: {
    nombre: "Paraíso",
    descripcion: "Una veta sutil y luminosa...",
    mood: "Suave & luminoso",
    uso: "Cocinas pequeñas y estudios",
    iluminacion: "Luz natural baja/media",
    resumenCorto: "Ideal para sumar luz...",
    idealPara: ["Cocinas compactas", "Estudios", "Muebles discretos y livianos"]
  },
  nogal: {
    nombre: "Nogal",
    descripcion: "Profundo y sofisticado...",
    mood: "Profundo & elegante",
    uso: "Cocinas oscuras y barras",
    iluminacion: "Luz puntual o indirecta",
    resumenCorto: "Acabado con mucha personalidad...",
    idealPara: ["Barras", "Vestidores premium", "Cocinas con iluminación de diseño"]
  }
}

// ================== GALERÍA AUTO (IMPORT.META.GLOB) ==================
// Estructura:
// /src/assets/Img/Roble/cocinas/Img1.jpeg
// /src/assets/Img/Paraiso/placares/Img7.jpg
// /src/assets/Img/Nogal/vanitory/Img3.png
const rawImgs = import.meta.glob(
  "@/assets/Img/*/*/[iI]mg*.{png,jpg,jpeg,PNG,JPG,JPEG}",
  { eager: true, import: "default" }
)

const getIndexFromFilename = (path) => {
  const m = path.match(/img(\d+)\.(png|jpe?g)$/i)
  return m ? Number(m[1]) : 9999
}

const buildGalleryMap = (modules) => {
  const gallery = {}

  for (const path in modules) {
    const parts = path.split("/")
    const texturaFolder = (parts[parts.length - 3] || "").toLowerCase()
    const ambiente = (parts[parts.length - 2] || "").toLowerCase()
    const url = modules[path]

    if (!["roble", "paraiso", "nogal"].includes(texturaFolder)) continue

    if (!gallery[texturaFolder]) gallery[texturaFolder] = {}
    if (!gallery[texturaFolder][ambiente]) gallery[texturaFolder][ambiente] = []

    gallery[texturaFolder][ambiente].push({ url, order: getIndexFromFilename(path) })
  }

  Object.keys(gallery).forEach((t) => {
    Object.keys(gallery[t]).forEach((a) => {
      gallery[t][a] = gallery[t][a]
        .sort((x, y) => x.order - y.order)
        .map((x) => x.url)
    })
  })

  return gallery
}

const galleryMap = buildGalleryMap(rawImgs)

// ================== LABELS (coinciden con carpetas) ==================
const labelsAmbientes = {
  placares: "Placares",
  cocinas: "Cocinas",
  vanitory: "Vanitory"
}

// ================== COMPUTEDS PRINCIPALES ==================
const texturaKey = computed(() => (props.textura || "roble").toLowerCase())
const dataTextura = computed(() => dataPorTextura[texturaKey.value] || dataPorTextura.roble)
const fondoActual = computed(() => fondos[texturaKey.value] || fondoRoble)
const imagenHero = computed(() => fondoActual.value)

// ================== GALERÍA UNIFICADA ==================
const galeriaUnificada = computed(() => {
  const t = texturaKey.value
  const data = galleryMap[t] || {}

  const orden = ["placares", "cocinas", "vanitory"]
  const items = []

  for (const amb of orden) {
    const imgs = data[amb] || []
    imgs.forEach((url, i) => {
      items.push({
        url,
        ambiente: amb,
        label: labelsAmbientes[amb] || amb,
        number: i + 1
      })
    })
  }

  return items
})

// ================== LIGHTBOX SIMPLE ==================
const lightboxOpen = ref(false)
const lightboxImg = ref("")

const openLightbox = (imgUrl) => {
  lightboxImg.value = imgUrl
  lightboxOpen.value = true
  // UX: bloquear scroll del body
  document.body.style.overflow = "hidden"
}

const closeLightbox = () => {
  lightboxOpen.value = false
  lightboxImg.value = ""
  document.body.style.overflow = ""
}

// Cerrar con ESC
const onKeydown = (e) => {
  if (e.key === "Escape" && lightboxOpen.value) closeLightbox()
}

onMounted(() => window.addEventListener("keydown", onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown)
  document.body.style.overflow = ""
})

// Si cambia textura y el lightbox está abierto, lo cerramos (evita glitches)
watch(texturaKey, () => {
  if (lightboxOpen.value) closeLightbox()
})
</script>

<style scoped>
.mueble-view {
  font-family: "Quicksand", sans-serif;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #111;
  overflow: hidden;
  padding: clamp(3.5rem, 5vw, 5.5rem) clamp(1.2rem, 3vw, 2.4rem) clamp(5rem, 6vw, 7rem);
  display: flex;
  align-items: flex-start;
}

.mueble-inner {
  position: relative;
  z-index: 3;
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 3vw, 3rem);
}

/* Header */
.mueble-header {
  max-width: 640px;
}

.mueble-eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: #e2d0b7;
  opacity: 0.95;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.mueble-title {
  font-size: clamp(2.2rem, 4vw, 3.3rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.mueble-title-highlight {
  display: inline-block;
  margin-left: 0.35rem;
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  background: rgba(244, 200, 121, 0.16);
  border: 1px solid rgba(244, 200, 121, 0.6);
  font-weight: 800;
}

.mueble-subtitle {
  color: #f0e4d4;
  font-size: 0.98rem;
  line-height: 1.7;
  max-width: 540px;
  font-weight: 500;
}

.mueble-tags {
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.mueble-tag {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(244, 200, 121, 0.65);
  color: #ffeecb;
  font-weight: 800;
}

.mueble-tag--outline {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.55);
  color: #f6ebde;
}

.mueble-tag--ghost {
  background: rgba(0, 0, 0, 0.42);
  border-color: transparent;
  color: #f0e1ca;
}

/* HERO */
.mueble-preview {
  width: 100%;
  max-width: 1000px;
  margin: 1.8rem auto 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.mueble-preview-frame {
  width: 100%;
  min-height: clamp(260px, 50vh, 420px);
  border-radius: 18px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.mueble-preview-content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1.6rem 1.8rem;
  display: flex;
  flex-direction: column;
}

.mueble-preview-title-big {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 700;
}

.mueble-preview-panel {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: 1.2rem;
  margin-right: 1.4rem;
  width: min(60%, 520px);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.55);
  padding: 1rem 1.2rem;
}

.mueble-preview-text {
  font-size: 0.9rem;
  color: #fdf4e4;
  line-height: 1.6;
  font-weight: 500;
}

/* CUERPO LARGO */
.mueble-body {
  display: flex;
  flex-direction: column;
  gap: clamp(2.6rem, 4vw, 3.8rem);
  margin-top: clamp(1.8rem, 3vw, 2.8rem);
}

/* Secciones */
.mueble-section {
  border-radius: 22px;
  background:
    radial-gradient(circle at 0 0, rgba(255, 255, 255, 0.06), transparent 55%),
    rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  padding: clamp(1.8rem, 3vw, 2.6rem) clamp(1.2rem, 3vw, 2.2rem);
}

.mueble-section-header {
  margin-bottom: 1.4rem;
}

.mueble-section-title {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #fdf1dd;
  margin-bottom: 0.45rem;
  font-weight: 800;
}

.mueble-section-subtitle {
  font-size: 0.9rem;
  color: rgba(244, 232, 214, 0.88);
  max-width: 720px;
  font-weight: 500;
}

/* Galería */
.mueble-gallery-grid {
  margin-top: 0.4rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.mueble-gallery-item {
  position: relative;
  border-radius: 14px;
  background-size: cover;
  background-position: center;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.10);
}

.mueble-gallery-btn {
  border: none;
  padding: 0;
  cursor: zoom-in;
  text-align: left;
  background-color: transparent;
}

.mueble-gallery-btn:focus-visible {
  outline: 2px solid rgba(244, 200, 121, 0.8);
  outline-offset: 3px;
  border-radius: 14px;
}

.mueble-gallery-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 65%),
    radial-gradient(circle at 0 0, rgba(255, 255, 255, 0.08), transparent 55%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0.9rem 1rem;
  transition: 0.22s ease;
}

.mueble-gallery-btn:hover .mueble-gallery-overlay {
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.78), transparent 60%),
    radial-gradient(circle at 0 0, rgba(255, 255, 255, 0.12), transparent 55%);
}

.mueble-gallery-tag {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.45);
  color: #fef5e4;
  font-weight: 800;
}

/* LIGHTBOX */
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
  max-width: 1100px;
  width: 100%;
  text-align: center;
  animation: lightbox-in 0.25s ease-out;
}

.lightbox-img {
  width: 100%;
  max-height: 82vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.9);
}

.lightbox-close {
  position: fixed;
  top: 1.4rem;
  right: 1.6rem;
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

/* Responsive */
@media (max-width: 992px) {
  .mueble-view {
    padding: 3.5rem 1.25rem 4.5rem;
  }

  .mueble-gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 576px) {
  .mueble-inner {
    gap: 2rem;
  }

  .mueble-preview-content {
    padding: 1.3rem 1.2rem;
  }

  .mueble-preview-panel {
    width: 80%;
    margin-right: 0.9rem;
  }

  .mueble-gallery-grid {
    grid-template-columns: minmax(0, 1fr);
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
