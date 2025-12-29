<template>
  <!-- Capa de iluminación encima del hero -->
  <div class="lamparas" :class="{ 'lights-on': lightsOn }" @click="toggleLights">
    <!-- 🔥 TIRA LED EMPOTRADA EN EL BORDE DEL HERO -->
    <div class="tira-led tira-led-hero"></div>

    <!-- Hint minimalista (solo primeros segundos) -->
    <div v-if="showHint" class="led-hint">
      <span class="led-dot"></span>
      <span class="led-hint-text">Tocá el fondo para ajustar la luz</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const lightsOn = ref(false);
const showHint = ref(true);

onMounted(() => {
  setTimeout(() => (lightsOn.value = true), 300);
  setTimeout(() => (showHint.value = false), 3800);
});

const toggleLights = () => {
  lightsOn.value = !lightsOn.value;
};
</script>

<style scoped>
/* Capa que vive encima del hero */
.lamparas {
  position: absolute;
  inset: 0;
  pointer-events: auto;
  z-index: 3;
  cursor: pointer;

  /* variables cálidas (podés mapearlas a tus CSS vars si querés) */
  --warm-core: 255, 208, 140;   /* ámbar suave */
  --warm-mid: 255, 186, 110;    /* dorado */
  --warm-edge: 255, 160, 90;    /* cobre */
  --hint-bg: 18, 12, 8;         /* oscuro cálido */
}

/* ========================== */
/*       TIRA LED HERO        */
/* ========================== */

.tira-led-hero {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-radius: 999px;

  /* standby cálido (apagada / tenue) */
  background: linear-gradient(
    to right,
    rgba(var(--warm-edge), 0.22),
    rgba(var(--warm-core), 0.38),
    rgba(var(--warm-edge), 0.22)
  );

  opacity: 0.35;
  box-shadow: none;
  transition:
    background 0.45s ease,
    opacity 0.45s ease,
    box-shadow 0.5s ease,
    filter 0.45s ease;
}

/* Difusión vertical hacia abajo (cálida) */
.tira-led-hero::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 95px;

  background: linear-gradient(
    to bottom,
    rgba(var(--warm-core), 0.55) 0%,
    rgba(var(--warm-mid), 0.28) 35%,
    rgba(var(--warm-edge), 0.12) 60%,
    transparent 100%
  );

  opacity: 0;
  filter: blur(12px);
  pointer-events: none;
  transition:
    opacity 0.55s ease,
    filter 0.55s ease;
}

/* Difusión lateral (bordes cálidos) */
.tira-led-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;

  background: linear-gradient(
    to right,
    rgba(var(--warm-edge), 0.32) 0%,
    rgba(var(--warm-core), 0.0) 40%,
    rgba(var(--warm-core), 0.0) 60%,
    rgba(var(--warm-edge), 0.32) 100%
  );

  opacity: 0;
  filter: blur(14px);
  pointer-events: none;
  transition:
    opacity 0.45s ease,
    filter 0.45s ease;
}

/* =============== ENCENDIDA =============== */

.lights-on .tira-led-hero {
  opacity: 1;

  /* núcleo cálido y “vivo” */
  background: linear-gradient(
    to right,
    rgba(var(--warm-edge), 0.85),
    rgba(var(--warm-core), 1),
    rgba(var(--warm-edge), 0.85)
  );

  /* glow cálido (más elegante, menos blanco nuclear) */
  box-shadow:
    0 0 10px rgba(var(--warm-core), 0.55),
    0 0 24px rgba(var(--warm-mid), 0.38),
    0 0 60px rgba(var(--warm-edge), 0.22);

  filter: brightness(1.08) saturate(1.15);
}

.lights-on .tira-led-hero::before {
  opacity: 1;
  filter: blur(18px);
}

.lights-on .tira-led-hero::after {
  opacity: 1;
  filter: blur(22px);
}

/* ============= HINT INTERACTIVO ============= */

.led-hint {
  position: absolute;
  top: 14px;
  right: clamp(1.5rem, 6vw, 3rem);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;

  background: rgba(var(--hint-bg), 0.62);
  border: 1px solid rgba(var(--warm-core), 0.16);
  backdrop-filter: blur(12px);

  color: rgba(255, 244, 226, 0.92);
  font-family: "Inter", system-ui, sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.02em;

  animation: hintFade 3.6s ease-out forwards;
  pointer-events: none;
}

.led-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background: rgba(var(--warm-core), 1);
  box-shadow:
    0 0 6px rgba(var(--warm-core), 0.65),
    0 0 14px rgba(var(--warm-mid), 0.45);

  animation: dotPulse 1.2s ease-in-out infinite;
}

.led-hint-text {
  white-space: nowrap;
}

@keyframes hintFade {
  0%   { opacity: 0; transform: translateY(-6px); }
  10%  { opacity: 1; transform: translateY(0); }
  70%  { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-6px); }
}

@keyframes dotPulse {
  0%   { transform: scale(1);   opacity: 1; }
  50%  { transform: scale(1.35); opacity: 0.38; }
  100% { transform: scale(1);   opacity: 1; }
}

/* ============= RESPONSIVE ============= */
@media (max-width: 768px) {
  .tira-led-hero { height: 4px; }
  .tira-led-hero::before { height: 75px; }

  .led-hint {
    top: 10px;
    right: 50%;
    transform: translateX(50%);
    font-size: 0.7rem;
    padding: 0.35rem 0.7rem;
  }
}
</style>
