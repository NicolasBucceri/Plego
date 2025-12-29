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
        <!-- SECCIÓN: ACABADO GLOBAL -->
        <section class="mueble-section mueble-section--global">
          <div class="mueble-section-header">
            <h2 class="mueble-section-title">Acabado en conjunto</h2>
            <p class="mueble-section-subtitle">
              Cómo se integra el acabado {{ dataTextura.nombre }} en el ambiente completo.
            </p>
          </div>

          <div class="mueble-grid-cards">
            <article class="mueble-card">
              <h3 class="mueble-card-title">Sensación general</h3>
              <p class="mueble-card-text">
                {{ dataTextura.textoSensacion }}
              </p>
            </article>

            <article class="mueble-card">
              <h3 class="mueble-card-title">Combinaciones sugeridas</h3>
              <p class="mueble-card-text">
                {{ dataTextura.textoCombinacion }}
              </p>
            </article>

            <article class="mueble-card">
              <h3 class="mueble-card-title">Ideal para</h3>
              <ul class="mueble-bullets">
                <li v-for="(item, i) in dataTextura.idealPara" :key="i">
                  {{ item }}
                </li>
              </ul>
            </article>
          </div>
        </section>

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
              <div
                v-if="videosAmbienteActual.length"
                class="mueble-videos-row"
              >
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

// ================== IMPORTS DE IMÁGENES ==================
import fondoRoble from '@/assets/Img/Texturas/CocinaRoble.png'
import fondoParaiso from '@/assets/Img/Texturas/CocinaParaiso.png'
import fondoNogal from '@/assets/Img/Texturas/CocinaRoble.png' // reemplazalo cuando tengas foto real

// ================== PROPS ==================
const props = defineProps({
  textura: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['ver-video'])

// ================== FONDOS ==================
const fondos = {
  roble: fondoRoble,
  paraiso: fondoParaiso,
  nogal: fondoNogal
}

// ================== DATA POR TEXTURA ==================
const dataPorTextura = {
  roble: {
    nombre: 'Roble',
    descripcion:
      'Un acabado cálido y contemporáneo, ideal para cocinas y livings donde la textura acompaña sin competir.',
    mood: 'Cálido',
    uso: 'Cocinas & livings',
    iluminacion: 'Luz natural media/alta',
    resumenCorto:
      'Equilibrio entre calidez y actualidad. Funciona muy bien acompañado de paredes claras y luz uniforme.',
    textoSensacion:
      'El roble aporta una sensación de hogar y modernidad al mismo tiempo, sin volverse pesado.',
    textoCombinacion:
      'Combina perfecto con grises suaves, blancos cálidos y detalles en negro mate.',
    idealPara: [
      'Cocinas integradas',
      'Muebles de guardado',
      'Islas y barras iluminadas'
    ]
  },

  paraiso: {
    nombre: 'Paraíso',
    descripcion:
      'Una veta sutil y luminosa, pensada para ampliar visualmente y aportar ligereza al espacio.',
    mood: 'Suave & luminoso',
    uso: 'Cocinas pequeñas y estudios',
    iluminacion: 'Luz natural baja/media',
    resumenCorto:
      'Ideal para sumar luz en ambientes reducidos y generar amplitud.',
    textoSensacion:
      'Se percibe liviano y relajado. No cansa con el tiempo.',
    textoCombinacion:
      'Funciona con paredes claras, tonos arena y detalles en aluminio.',
    idealPara: [
      'Cocinas compactas',
      'Estudios',
      'Muebles discretos y livianos'
    ]
  },

  nogal: {
    nombre: 'Nogal',
    descripcion:
      'Profundo y sofisticado. Aporta contraste fuerte y mucha presencia al mobiliario.',
    mood: 'Profundo & elegante',
    uso: 'Cocinas oscuras y barras',
    iluminacion: 'Luz puntual o indirecta',
    resumenCorto:
      'Acabado con mucha personalidad, ideal cuando el mueble es protagonista.',
    textoSensacion:
      'Genera un clima íntimo, envolvente y sofisticado.',
    textoCombinacion:
      'Se luce con microcemento, paredes claras y herrajes en negro o cobre.',
    idealPara: [
      'Barras',
      'Vestidores premium',
      'Cocinas con iluminación de diseño'
    ]
  }
}

// ================== AMBIENTES POR TEXTURA ==================
// Cada textura tiene SIEMPRE los mismos 3 ambientes:
// Dormitorios / Vestidores / Vanitory
// En cada uno podés cargar muchas imágenes y muchos videos.
const ambientesPorTextura = {
  roble: {
    dormitorio: {
      label: 'Dormitorios',
      imagenes: [fondoRoble],
      videos: []
    },
    vestidor: {
      label: 'Vestidores',
      imagenes: [fondoRoble],
      videos: []
    },
    vanitory: {
      label: 'Vanitory',
      imagenes: [fondoRoble],
      videos: []
    }
  },
  paraiso: {
    dormitorio: {
      label: 'Dormitorios',
      imagenes: [fondoParaiso],
      videos: []
    },
    vestidor: {
      label: 'Vestidores',
      imagenes: [fondoParaiso],
      videos: []
    },
    vanitory: {
      label: 'Vanitory',
      imagenes: [fondoParaiso],
      videos: []
    }
  },
  nogal: {
    dormitorio: {
      label: 'Dormitorios',
      imagenes: [fondoNogal],
      videos: []
    },
    vestidor: {
      label: 'Vestidores',
      imagenes: [fondoNogal],
      videos: []
    },
    vanitory: {
      label: 'Vanitory',
      imagenes: [fondoNogal],
      videos: []
    }
  }
}

// ================== COMPUTEDS PRINCIPALES ==================
const dataTextura = computed(
  () => dataPorTextura[props.textura] || dataPorTextura.roble
)

const fondoActual = computed(
  () => fondos[props.textura] || fondoRoble
)

const mapaAmbientes = computed(
  () => ambientesPorTextura[props.textura] || {}
)

const listaAmbientes = computed(() =>
  Object.entries(mapaAmbientes.value).map(([key, data]) => ({
    key,
    label: data.label
  }))
)

// Ambiente activo
const ambienteActivo = ref('')

// Seteo inicial del ambiente activo
watch(
  listaAmbientes,
  (lista) => {
    if (lista.length) {
      if (!lista.some((a) => a.key === ambienteActivo.value)) {
        ambienteActivo.value = lista[0].key
      }
    } else {
      ambienteActivo.value = ''
    }
  },
  { immediate: true }
)

const ambienteActivoLabel = computed(() => {
  const amb = mapaAmbientes.value[ambienteActivo.value]
  return amb?.label || ''
})

// Imágenes del ambiente actual
const imagenesAmbienteActual = computed(() => {
  const amb = mapaAmbientes.value[ambienteActivo.value]
  if (amb && amb.imagenes && amb.imagenes.length) return amb.imagenes
  return [fondoActual.value]
})

// Videos del ambiente actual
const videosAmbienteActual = computed(() => {
  const amb = mapaAmbientes.value[ambienteActivo.value]
  if (amb && amb.videos && amb.videos.length) return amb.videos
  return []
})

// Imagen que se ve en el HERO (primer imagen del ambiente activo)
const imagenHero = computed(() => {
  const amb = mapaAmbientes.value[ambienteActivo.value]
  if (amb && amb.imagenes && amb.imagenes.length) {
    return amb.imagenes[0]
  }
  return fondoActual.value
})

const cambiarAmbiente = (key) => {
  ambienteActivo.value = key
}

const handleVerVideo = (video) => {
  emit('ver-video', { textura: props.textura, video })
}
</script>

<style scoped>
.mueble-view {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #111;
  overflow: hidden;
  padding: 4.5rem 1.5rem 6rem;
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
  gap: 2rem;
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
}

.mueble-title {
  font-size: clamp(2.2rem, 4vw, 3.3rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 400;
  margin-bottom: 0.75rem;
}

.mueble-title-highlight {
  display: inline-block;
  margin-left: 0.35rem;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  background: rgba(244, 200, 121, 0.16);
  border: 1px solid rgba(244, 200, 121, 0.6);
  font-weight: 500;
}

.mueble-subtitle {
  color: #f0e4d4;
  font-size: 0.98rem;
  line-height: 1.7;
  max-width: 540px;
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
  font-weight: 400;
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
}

/* CUERPO LARGO */
.mueble-body {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin-top: 2.4rem;
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
}

.mueble-section-subtitle {
  font-size: 0.9rem;
  color: rgba(244, 232, 214, 0.88);
  max-width: 520px;
}

/* Cards global */
.mueble-grid-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.mueble-card {
  padding: 1.2rem 1.1rem;
  border-radius: 14px;
  background: rgba(5, 5, 5, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.mueble-card-title {
  font-size: 0.9rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f7ebd8;
  margin-bottom: 0.45rem;
}

.mueble-card-text {
  font-size: 0.88rem;
  color: rgba(247, 235, 216, 0.94);
  line-height: 1.6;
}

.mueble-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mueble-bullets li {
  position: relative;
  padding-left: 1.1rem;
  margin-bottom: 0.35rem;
  font-size: 0.86rem;
  color: rgba(248, 237, 219, 0.94);
}

.mueble-bullets li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
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
}

/* Responsive */
@media (max-width: 992px) {
  .mueble-view {
    padding: 3.5rem 1.25rem 4.5rem;
  }

  .mueble-grid-cards,
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

  .mueble-grid-cards,
  .mueble-gallery-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .mueble-video-thumb {
    width: 100%;
  }
}
</style>
