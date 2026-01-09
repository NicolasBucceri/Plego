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
        <div
          class="mueble-preview-frame"
          :style="{ backgroundImage: `url(${imagenHero})` }"
        >
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
        <!-- ✅ SE SACÓ LA SECCIÓN "ACABADO EN CONJUNTO" -->

        <!-- ========== SECCIÓN: GALERÍA + VIDEOS POR AMBIENTE ========== -->
        <section
          v-if="listaAmbientes.length"
          class="mueble-section mueble-section--gallery"
        >
          <div class="mueble-section-header">
            <h2 class="mueble-section-title">Galería de ambientes</h2>
            <p class="mueble-section-subtitle">
              Al seleccionar un ambiente, ves todas las imágenes y videos de
              <strong>{{ ambienteActivoLabel }}</strong>
              con el acabado {{ dataTextura.nombre }}.
            </p>
          </div>

          <!-- Tabs estilo Bootstrap -->
          <ul class="nav nav-tabs mueble-tabs" role="tablist">
            <li
              v-for="amb in listaAmbientes"
              :key="amb.key"
              class="nav-item"
              role="presentation"
            >
              <button
                class="nav-link"
                :class="{ active: amb.key === ambienteActivo }"
                type="button"
                role="tab"
                @click="cambiarAmbiente(amb.key)"
              >
                {{ amb.label }}
              </button>
            </li>
          </ul>

          <div class="tab-content mueble-tab-content">
            <div class="tab-pane fade show active" role="tabpanel" tabindex="0">
              <!-- GRID DE IMÁGENES DEL AMBIENTE ACTUAL -->
              <div
                v-if="imagenesAmbienteActual.length"
                class="mueble-gallery-grid"
              >
                <div
                  v-for="(img, index) in imagenesAmbienteActual"
                  :key="'grid-' + index"
                  class="mueble-gallery-item"
                  :style="{ backgroundImage: `url(${img})` }"
                >
                  <div class="mueble-gallery-overlay">
                    <span class="mueble-gallery-tag">
                      {{ ambienteActivoLabel }} {{ index + 1 }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- VIDEOS DEL AMBIENTE ACTUAL -->
              <div v-if="videosAmbienteActual.length" class="mueble-videos-row">
                <button
                  v-for="video in videosAmbienteActual"
                  :key="video.id"
                  class="mueble-video-card"
                  @click="handleVerVideo(video)"
                >
                  <div
                    class="mueble-video-thumb"
                    :style="{ backgroundImage: `url(${video.poster || imagenHero})` }"
                  >
                    <span class="mueble-video-icon">▶</span>
                  </div>
                  <span class="mueble-video-label">
                    {{ video.label }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

// ================== IMPORTS DE IMÁGENES (fallback/hero) ==================
import fondoRoble from '@/assets/Img/Texturas/CocinaRoble.png'
import fondoParaiso from '@/assets/Img/Texturas/CocinaParaiso.png'
import fondoNogal from '@/assets/Img/Texturas/CocinaRoble.png' // reemplazalo cuando tengas foto real

// ================== PROPS ==================
const props = defineProps({
  textura: { type: String, required: true } // 'roble' | 'paraiso' | 'nogal'
})

const emit = defineEmits(['ver-video'])

// ================== FONDOS (fallback) ==================
const fondos = {
  roble: fondoRoble,
  paraiso: fondoParaiso,
  nogal: fondoNogal
}

// ================== DATA POR TEXTURA (TU CONTENIDO) ==================
const dataPorTextura = {
  roble: {
    nombre: 'Roble',
    descripcion: 'Un acabado cálido y contemporáneo...',
    mood: 'Cálido',
    uso: 'Cocinas & livings',
    iluminacion: 'Luz natural media/alta',
    resumenCorto: 'Equilibrio entre calidez y actualidad...',
    textoSensacion: '...',
    textoCombinacion: '...',
    idealPara: ['Cocinas integradas', 'Muebles de guardado', 'Islas y barras iluminadas']
  },
  paraiso: {
    nombre: 'Paraíso',
    descripcion: 'Una veta sutil y luminosa...',
    mood: 'Suave & luminoso',
    uso: 'Cocinas pequeñas y estudios',
    iluminacion: 'Luz natural baja/media',
    resumenCorto: 'Ideal para sumar luz...',
    textoSensacion: '...',
    textoCombinacion: '...',
    idealPara: ['Cocinas compactas', 'Estudios', 'Muebles discretos y livianos']
  },
  nogal: {
    nombre: 'Nogal',
    descripcion: 'Profundo y sofisticado...',
    mood: 'Profundo & elegante',
    uso: 'Cocinas oscuras y barras',
    iluminacion: 'Luz puntual o indirecta',
    resumenCorto: 'Acabado con mucha personalidad...',
    textoSensacion: '...',
    textoCombinacion: '...',
    idealPara: ['Barras', 'Vestidores premium', 'Cocinas con iluminación de diseño']
  }
}

// ================== GALERÍA AUTO (TU ESTRUCTURA REAL) ==================
// Estructura actual:
// /src/assets/Img/Roble/cocinas/Img1.jpeg
// /src/assets/Img/Paraiso/placares/Img7.jpg
// /src/assets/Img/Nogal/vanitory/Img3.png
//
// ✅ soporta Img/img + .png/.jpg/.jpeg
const rawImgs = import.meta.glob(
  '@/assets/Img/*/*/[iI]mg*.{png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true, import: 'default' }
)

const getIndexFromFilename = (path) => {
  // saca número de Img7 / img7
  const m = path.match(/img(\d+)\.(png|jpe?g)$/i)
  return m ? Number(m[1]) : 9999
}

// gallery[textura][ambiente] = [url...]
const buildGalleryMap = (modules) => {
  const gallery = {}

  for (const path in modules) {
    // path típico: /src/assets/Img/Roble/cocinas/Img7.jpeg
    const parts = path.split('/')

    const texturaFolder = (parts[parts.length - 3] || '').toLowerCase()   // roble | paraiso | nogal
    const ambiente = (parts[parts.length - 2] || '').toLowerCase()        // cocinas | placares | vanitory
    const url = modules[path]

    // filtramos solo estas 3 texturas para evitar ruido (Nosotros, Texturas, etc.)
    if (!['roble', 'paraiso', 'nogal'].includes(texturaFolder)) continue

    if (!gallery[texturaFolder]) gallery[texturaFolder] = {}
    if (!gallery[texturaFolder][ambiente]) gallery[texturaFolder][ambiente] = []

    gallery[texturaFolder][ambiente].push({ url, order: getIndexFromFilename(path) })
  }

  // ordenar Img1..Img7
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


// ================== LABELS (TABS) ==================
// ⚠️ tienen que coincidir con los nombres de tus carpetas
const labelsAmbientes = {
  placares: 'Placares',
  cocinas: 'Cocinas',
  vanitory: 'Vanitory'
}

// ================== COMPUTEDS PRINCIPALES ==================
const texturaKey = computed(() => (props.textura || 'roble').toLowerCase())

const dataTextura = computed(() => dataPorTextura[texturaKey.value] || dataPorTextura.roble)
const fondoActual = computed(() => fondos[texturaKey.value] || fondoRoble)

// mapaAmbientes ahora sale de galleryMap[textura][ambiente]
const mapaAmbientes = computed(() => {
  const t = texturaKey.value
  const data = galleryMap[t] || {}

  const result = {}
  Object.keys(labelsAmbientes).forEach((key) => {
    result[key] = {
      label: labelsAmbientes[key],
      imagenes: data[key] || [],
      videos: []
    }
  })

  return result
})

// Solo tabs con imágenes (UX prolijo)
const listaAmbientes = computed(() =>
  Object.entries(mapaAmbientes.value)
    .filter(([_, v]) => v.imagenes?.length)
    .map(([key, data]) => ({ key, label: data.label }))
)

// ================== AMBIENTE ACTIVO ==================
const ambienteActivo = ref('')

watch(
  listaAmbientes,
  (lista) => {
    // si el actual no existe en la nueva textura, cae al primero
    if (!lista.length) {
      ambienteActivo.value = ''
      return
    }
    if (!lista.some((a) => a.key === ambienteActivo.value)) {
      ambienteActivo.value = lista[0].key
    }
  },
  { immediate: true }
)

const ambienteActivoLabel = computed(() => {
  const amb = mapaAmbientes.value[ambienteActivo.value]
  return amb?.label || ''
})

const imagenesAmbienteActual = computed(() => {
  const amb = mapaAmbientes.value[ambienteActivo.value]
  return amb?.imagenes?.length ? amb.imagenes : [fondoActual.value]
})

const videosAmbienteActual = computed(() => {
  const amb = mapaAmbientes.value[ambienteActivo.value]
  return amb?.videos?.length ? amb.videos : []
})

const imagenHero = computed(() => fondoActual.value)


// ================== ACTIONS ==================
const cambiarAmbiente = (key) => {
  ambienteActivo.value = key
}

const handleVerVideo = (video) => {
  emit('ver-video', { textura: texturaKey.value, video })
}
</script>



<style scoped>
.mueble-view {
  font-family: 'Quicksand', sans-serif;
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

/* Secciones genéricas */
.mueble-section {
  padding: 2.3rem 1.8rem;
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

/* Tabs tipo Bootstrap pero con tu look */
.mueble-tabs {
  margin-bottom: 1.4rem;
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.mueble-tabs .nav-link {
  border: none;
  border-radius: 999px 999px 0 0;
  color: rgba(245, 230, 207, 0.7);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.55rem 1.4rem;
  background: transparent;
  font-weight: 800;
}

.mueble-tabs .nav-link:hover {
  color: #fdf1dd;
}

.mueble-tabs .nav-link.active {
  color: #1a1207;
  background: #f4c879;
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

/* Videos */
.mueble-videos-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.8rem;
}

.mueble-video-card {
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
}

.mueble-video-thumb {
  width: 210px;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.10);
}

.mueble-video-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.9rem;
  color: #fef5e2;
  text-shadow: 0 0 16px rgba(0, 0, 0, 0.9);
}

.mueble-video-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.2), transparent 55%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.65));
}

.mueble-video-label {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: #f6e9d6;
  font-weight: 700;
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

  .mueble-video-thumb {
    width: 100%;
  }
}
</style>
