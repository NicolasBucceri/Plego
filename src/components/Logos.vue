<template>
    <teleport to="body">
        <div class="logos-cta">
            <!-- WhatsApp -->
            <a class="logo-btn wa" :href="waHref" target="_blank" rel="noopener noreferrer"
                aria-label="Abrir WhatsApp y escribir" title="WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </a>

            <!-- Instagram -->
            <a class="logo-btn ig" :href="igHref" target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram"
                title="Instagram">
                <i class="fab fa-instagram"></i>
            </a>
        </div>
    </teleport>
</template>

<script setup>
import { computed } from "vue"

const whatsappNumber = "5491155798761"
const instagramUser = "nicolasbucceri.dev"

const waMessage =
  `Hola, Plego.\n` +
  `Quería consultarles cuál es el proceso para cotizar mobiliario a medida ` +
  `y si existe la posibilidad de coordinar una reunión para evaluar el proyecto.\n` +
  `Quedo atento, muchas gracias`

const waHref = computed(() => {
  const text = encodeURIComponent(waMessage)
  return `https://wa.me/${whatsappNumber}?text=${text}`
})

const igHref = computed(() =>
  `https://www.instagram.com/plegoamoblamientos/?hl=es-la`
)

</script>

<style scoped>
.logos-cta {
    position: fixed;
    right: 22px;
    bottom: 22px;
    z-index: 999999;
    /* modo “nadie me pisa” */

    display: flex;
    flex-direction: column;
    gap: 12px;
}

.logo-btn {
    width: 54px;
    height: 54px;
    border-radius: 16px;

    display: grid;
    place-items: center;

    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(15, 15, 18, 0.62);
    backdrop-filter: blur(10px);

    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.logo-btn i {
    font-size: 1.55rem;
    color: rgba(255, 255, 255, 0.92);
}

.logo-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
    border-color: rgba(244, 200, 121, 0.55);
}

@media (max-width: 480px) {
    .logos-cta {
        right: 14px;
        bottom: 14px;
    }

    .logo-btn {
        width: 50px;
        height: 50px;
        border-radius: 14px;
    }
}
</style>
