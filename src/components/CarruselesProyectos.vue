<template>
  <div class="extra-block">
    <h3 class="extra-title">{{ title }}</h3>

    <div class="projects-shell" @mouseenter="emit('pause', idx)" @mouseleave="emit('resume', idx)">
      <button class="nav-btn nav-left" @click="emit('prev', idx)" aria-label="Anterior">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div
        ref="trackRef"
        class="projects-track"
        :class="{ 'is-dragging': isDragging }"
        @scroll="emit('scroll', idx)"
        @pointerdown="emit('userStart', idx)"
        @pointerup="emit('userEnd', idx)"
        @pointercancel="emit('userEnd', idx)"
        @touchstart.passive="emit('userStart', idx)"
        @touchend="emit('userEnd', idx)"
      >
        <article
          v-for="(item, i) in items"
          :key="`${uid}-${i}`"
          class="project-card"
          @click="emit('open', item)"
        >
          <img
            v-if="item.type === 'img'"
            :src="item.src"
            :alt="item.alt"
            class="project-media"
            loading="lazy"
          />

          <video
            v-else
            class="project-media"
            :src="item.src"
            muted
            loop
            playsinline
            preload="metadata"
          ></video>

          <span v-if="item.type === 'video'" class="video-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="video-icon">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </article>
      </div>

      <button class="nav-btn nav-right" @click="emit('next', idx)" aria-label="Siguiente">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true },
  idx: { type: Number, required: true },
  uid: { type: String, default: "carousel" },
  isDragging: { type: Boolean, default: false },
})

const emit = defineEmits([
  "trackReady",
  "prev",
  "next",
  "pause",
  "resume",
  "scroll",
  "userStart",
  "userEnd",
  "open",
])

const trackRef = ref(null)

onMounted(() => {
  emit("trackReady", { idx: props.idx, el: trackRef.value })
})
</script>
