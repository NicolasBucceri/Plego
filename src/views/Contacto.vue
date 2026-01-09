<template>
    <section class="contacto-view" aria-label="Contacto Plego">
        <!-- BG layers -->
        <div class="bg-layer"></div>
        <div class="bg-glow"></div>
        <div class="bg-noise"></div>

        <div class="container">
            <!-- HERO -->
            <header ref="heroRef" class="hero" :class="{ 'is-visible': isVisible }">
                <p class="eyebrow">Contacto</p>

                <h1 class="title">
                    Hablemos de tu próximo <span class="title-accent">mobiliario</span>.
                </h1>

                <p class="subtitle">
                    Canales directos, respuestas reales. Elegí cómo querés escribirnos.
                </p>

                <div class="gold-line" aria-hidden="true"></div>
            </header>

            <!-- CHANNELS -->
            <section class="channels" aria-label="Canales de contacto">
                <!-- WhatsApp -->
                <article class="card" :class="{ 'is-visible': isVisible }">
                    <div class="card-top">
                        <div class="icon-badge" aria-hidden="true">
                            <i class="fa-brands fa-whatsapp"></i>
                        </div>

                        <div class="card-head">
                            <h2 class="card-title">WhatsApp</h2>
                            <p class="card-desc">La vía más rápida para cotizar y coordinar.</p>
                        </div>
                    </div>

                    <div class="card-mid">
                        <div class="info-row">
                            <span class="info-label">Número</span>
                            <span class="info-value">{{ CONTACT.whatsapp }}</span>
                        </div>
                    </div>

                    <div class="card-actions icons">
                        <a class="icon-btn icon-btn--primary" :href="whatsAppLink" target="_blank" rel="noopener"
                            aria-label="Escribir por WhatsApp" title="Escribir">
                            <i class="fa-solid fa-message"></i>
                        </a>

                        <button class="icon-btn" @click="copyToClipboard(CONTACT.whatsapp, 'Número copiado')"
                            aria-label="Copiar número de WhatsApp" title="Copiar" type="button">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </article>

                <!-- Instagram -->
                <article class="card" :class="{ 'is-visible': isVisible }">
                    <div class="card-top">
                        <div class="icon-badge" aria-hidden="true">
                            <i class="fa-brands fa-instagram"></i>
                        </div>

                        <div class="card-head">
                            <h2 class="card-title">Instagram</h2>
                            <p class="card-desc">Inspiración, proyectos y trabajos terminados.</p>
                        </div>
                    </div>

                    <div class="card-mid">
                        <div class="info-row">
                            <span class="info-label">Perfil</span>
                            <span class="info-value">{{ CONTACT.instagramLabel }}</span>
                        </div>
                    </div>

                    <div class="card-actions icons">
                        <a class="icon-btn icon-btn--primary" :href="CONTACT.instagram" target="_blank" rel="noopener"
                            aria-label="Abrir Instagram" title="Abrir">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>

                        <button class="icon-btn" @click="copyToClipboard(CONTACT.instagram, 'Link copiado')"
                            aria-label="Copiar link de Instagram" title="Copiar" type="button">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </article>

                <!-- TikTok -->
                <article class="card" :class="{ 'is-visible': isVisible }">
                    <div class="card-top">
                        <div class="icon-badge" aria-hidden="true">
                            <i class="fa-brands fa-tiktok"></i>
                        </div>

                        <div class="card-head">
                            <h2 class="card-title">TikTok</h2>
                            <p class="card-desc">Videos del proceso, detalles y acabados.</p>
                        </div>
                    </div>

                    <div class="card-mid">
                        <div class="info-row">
                            <span class="info-label">Perfil</span>
                            <span class="info-value">{{ CONTACT.tiktokLabel }}</span>
                        </div>
                    </div>

                    <div class="card-actions icons">
                        <a class="icon-btn icon-btn--primary" :href="CONTACT.tiktok" target="_blank" rel="noopener"
                            aria-label="Abrir TikTok" title="Abrir">
                            <i class="fa-solid fa-play"></i>
                        </a>

                        <button class="icon-btn" @click="copyToClipboard(CONTACT.tiktok, 'Link copiado')"
                            aria-label="Copiar link de TikTok" title="Copiar" type="button">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </article>

                <!-- Mail -->
                <article class="card" :class="{ 'is-visible': isVisible }">
                    <div class="card-top">
                        <div class="icon-badge" aria-hidden="true">
                            <i class="fa-regular fa-envelope"></i>
                        </div>

                        <div class="card-head">
                            <h2 class="card-title">Mail</h2>
                            <p class="card-desc">Para consultas con detalles, planos o referencias.</p>
                        </div>
                    </div>

                    <div class="card-mid">
                        <div class="info-row">
                            <span class="info-label">Correo</span>
                            <span class="info-value info-value--truncate">{{ CONTACT.email }}</span>
                        </div>
                    </div>

                    <div class="card-actions icons">
                        <a class="icon-btn icon-btn--primary" :href="`mailto:${CONTACT.email}`"
                            aria-label="Abrir aplicación de correo" title="Abrir">
                            <i class="fa-solid fa-envelope-open-text"></i>
                        </a>

                        <button class="icon-btn" @click="copyToClipboard(CONTACT.email, 'Correo copiado')"
                            aria-label="Copiar correo" title="Copiar" type="button">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </article>
            </section>

            <!-- LOCATIONS -->
            <section class="locations" aria-label="Ubicaciones">
                <header class="section-head">
                    <!-- si querés dorado acá:
          <h2 class="section-title title-accent--gold">Ubicaciones</h2>
          -->
                    <h2 class="section-title">Ubicaciones</h2>
                    <p class="section-subtitle">Dos puntos clave: donde se diseña y donde se fabrica.</p>
                </header>

                <div class="locations-grid">
                    <!-- Castelar -->
                    <article class="location-card" :class="{ 'is-visible': isVisible }">
                        <div class="location-top">
                            <h3 class="location-title">Castelar — Taller</h3>
                            <p class="location-desc">Acá nace cada mueble. Corte, armado y terminación.</p>
                        </div>

                        <div class="map-shell" role="img" aria-label="Mapa zona Castelar">
                            <iframe class="map" :src="MAPS.caseros" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                            <div class="map-overlay" aria-hidden="true"></div>
                        </div>

                        <div class="location-actions">
                            <a class="btn btn-ghost" :href="MAP_LINKS.caseros" target="_blank" rel="noopener">
                                Ver en Maps
                            </a>
                        </div>
                    </article>

                    <!-- Villa Devoto -->
                    <article class="location-card" :class="{ 'is-visible': isVisible }">
                        <div class="location-top">
                            <h3 class="location-title">Villa Devoto — Oficina</h3>
                            <p class="location-desc">Reuniones, diseño y planificación del proyecto.</p>
                        </div>

                        <div class="map-shell" role="img" aria-label="Mapa zona Villa Devoto">
                            <iframe class="map" :src="MAPS.villaDelParque" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                            <div class="map-overlay" aria-hidden="true"></div>
                        </div>

                        <div class="location-actions">
                            <a class="btn btn-ghost" :href="MAP_LINKS.villaDelParque" target="_blank" rel="noopener">
                                Ver en Maps
                            </a>
                        </div>
                    </article>
                </div>

            </section>

            <!-- TOAST -->
            <div class="toast" :class="{ show: toast.show }" role="status" aria-live="polite">
                <span class="toast-dot" aria-hidden="true"></span>
                <span class="toast-text">{{ toast.message }}</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, reactive, ref } from "vue";

const CONTACT = reactive({
    whatsapp: "+54 11 5579-8761",
    instagram: "https://www.instagram.com/plegoamoblamientos/",
    instagramLabel: "plegoamoblamientos",
    tiktok: "https://www.tiktok.com/@plegoamoblamiento?_r=1&_t=ZM-92dFHBoWOTb",
    tiktokLabel: "plegoamoblamientos",
    email: "plegoamoblamientos@gmail.com",
});

const MAPS = {
    caseros: "https://www.google.com/maps?q=Castelar,+Buenos+Aires,+Argentina&output=embed",
    villaDelParque: "https://www.google.com/maps?q=Villa+Devoto,+CABA,+Argentina&output=embed",
};

const MAP_LINKS = {
    caseros: "https://www.google.com/maps/search/?api=1&query=Castelar,+Buenos+Aires,+Argentina",
    villaDelParque: "https://www.google.com/maps/search/?api=1&query=Villa+Devoto,+CABA,+Argentina",
};


const toast = reactive({
    show: false,
    message: "",
    t: null,
});

const heroRef = ref(null);
const isVisible = ref(false);
let io;

const whatsAppLink = computed(() => {
    const msg = encodeURIComponent("Hola, Plego. Quería consultarles cuál es el proceso para cotizar mobiliario a medida y si existe la posibilidad de coordinar una reunión para evaluar el proyecto. Quedo atento, muchas gracias");
    const phone = CONTACT.whatsapp.replace(/[^\d]/g, "");
    return `https://wa.me/${phone}?text=${msg}`;
});

function showToast(message) {
    toast.message = message;
    toast.show = true;
    if (toast.t) clearTimeout(toast.t);
    toast.t = setTimeout(() => (toast.show = false), 2200);
}

async function copyToClipboard(value, okMessage = "Copiado") {
    try {
        await navigator.clipboard.writeText(value);
        showToast(okMessage);
    } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showToast(okMessage);
    }
}

onMounted(() => {
    io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) isVisible.value = true;
            });
        },
        { threshold: 0.15 }
    );

    if (heroRef.value) io.observe(heroRef.value);
});

onBeforeUnmount(() => {
    if (io) io.disconnect();
});
</script>

<style scoped>
/* =========================
   PLEGO CONTACT — UX/UI (FULL)
   + TYPO SYSTEM (QUICKSAND)
   ========================= */

/* ✅ Base tipográfica global de esta vista */
.contacto-view {
    font-family: 'Quicksand', sans-serif;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    position: relative;
    min-height: 100vh;
    overflow: hidden;
    padding: 110px 0 90px;
    color: rgba(255, 255, 255, 0.92);
    background: #0c0c11;
}

/* BACKGROUND */
.bg-layer {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(1200px 600px at 20% 10%, rgba(205, 160, 80, 0.12), transparent 60%),
        radial-gradient(900px 500px at 80% 40%, rgba(205, 160, 80, 0.08), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 30%);
    pointer-events: none;
}

.bg-glow {
    position: absolute;
    inset: -40%;
    background: radial-gradient(circle at 50% 50%, rgba(205, 160, 80, 0.06), transparent 55%);
    filter: blur(10px);
    animation: floatGlow 10s ease-in-out infinite;
    pointer-events: none;
}

.bg-noise {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
    opacity: 0.10;
    mix-blend-mode: soft-light;
    pointer-events: none;
}

/* CONTAINER */
.container {
    width: min(1100px, 92%);
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

/* HERO */
.hero {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 600ms ease, transform 600ms ease;
    text-align: left;
    margin-bottom: 38px;
}

.hero.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* ✅ Eyebrow — micro jerarquía premium */
.eyebrow {
    font-family: 'Quicksand', sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 10px;

    font-size: 0.86rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;

    color: rgba(205, 160, 80, 0.9);
}

/* ✅ Title (H1) — jerarquía principal */
.title {
    font-family: 'Quicksand', sans-serif;

    margin-top: 12px;
    font-size: clamp(2.1rem, 4.2vw, 3.2rem);
    line-height: 1.06;
    letter-spacing: -0.03em;
    font-weight: 800;

    color: rgba(255, 255, 255, 0.94);
}

/* ===== ACCENT MARRÓN (mobiliario) ===== */
.title-accent {
    --brown: #6F4E37;
    --core: rgba(111, 78, 55, 0.38);
    --soft: rgba(111, 78, 55, 0.22);
    --warm: rgba(255, 220, 160, 0.18);

    background: linear-gradient(90deg,
            rgba(111, 78, 55, 0.95),
            rgba(255, 220, 160, 0.92),
            rgba(111, 78, 55, 0.95));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    text-shadow:
        0 0 6px var(--core),
        0 0 14px var(--core),
        0 0 28px var(--soft),
        0 0 46px rgba(111, 78, 55, 0.18),
        0 0 18px var(--warm);

    filter: saturate(1.08) brightness(1.05);
    position: relative;
    white-space: nowrap;
    animation: neonBrownPulse 3s ease-in-out infinite;
}

@keyframes neonBrownPulse {

    0%,
    100% {
        text-shadow:
            0 0 6px rgba(111, 78, 55, 0.34),
            0 0 14px rgba(111, 78, 55, 0.30),
            0 0 28px rgba(111, 78, 55, 0.22),
            0 0 46px rgba(111, 78, 55, 0.16),
            0 0 16px rgba(255, 220, 160, 0.14);
        filter: saturate(1.06) brightness(1.03);
    }

    50% {
        text-shadow:
            0 0 8px rgba(111, 78, 55, 0.45),
            0 0 18px rgba(111, 78, 55, 0.40),
            0 0 36px rgba(111, 78, 55, 0.28),
            0 0 62px rgba(111, 78, 55, 0.18),
            0 0 22px rgba(255, 220, 160, 0.18);
        filter: saturate(1.14) brightness(1.10);
    }
}

/* ===== ACCENT DORADO (para usar donde quieras, sin pisar el marrón) ===== */
.title-accent--gold {
    --gold-core: rgba(205, 160, 80, 0.22);

    background: linear-gradient(90deg,
            rgba(205, 160, 80, 0.95),
            rgba(255, 220, 160, 0.98),
            rgba(205, 160, 80, 0.95));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    text-shadow:
        0 0 6px var(--gold-core),
        0 0 14px var(--gold-core),
        0 0 28px rgba(205, 160, 80, 0.30),
        0 0 46px rgba(205, 160, 80, 0.22);

    filter: saturate(1.1);
    white-space: nowrap;
    animation: neonGoldPulse 2.8s ease-in-out infinite;
}

@keyframes neonGoldPulse {

    0%,
    100% {
        text-shadow:
            0 0 6px rgba(205, 160, 80, 0.22),
            0 0 14px rgba(205, 160, 80, 0.22),
            0 0 28px rgba(205, 160, 80, 0.28),
            0 0 46px rgba(205, 160, 80, 0.22);
        filter: saturate(1.06);
    }

    50% {
        text-shadow:
            0 0 8px rgba(205, 160, 80, 0.22),
            0 0 18px rgba(205, 160, 80, 0.22),
            0 0 36px rgba(205, 160, 80, 0.34),
            0 0 62px rgba(205, 160, 80, 0.22);
        filter: saturate(1.16);
    }
}

/* accesibilidad */
@media (prefers-reduced-motion: reduce) {

    .title-accent,
    .title-accent--gold {
        animation: none;
    }
}

/* ✅ Subtitle (Hero) — lectura pro */
.subtitle {
    font-family: 'Quicksand', sans-serif;
    margin-top: 12px;
    max-width: 58ch;

    color: rgba(255, 255, 255, 0.70);
    font-size: 1.06rem;
    font-weight: 500;
    line-height: 1.65;
    letter-spacing: -0.01em;
}

.gold-line {
    margin-top: 22px;
    height: 2px;
    width: min(520px, 92%);
    background: linear-gradient(90deg, rgba(205, 160, 80, 0), rgba(205, 160, 80, 1), rgba(205, 160, 80, 0));
    opacity: 0.9;
    filter: drop-shadow(0 0 12px rgba(205, 160, 80, 0.35));
    animation: shimmer 3.2s ease-in-out infinite;
}

/* CHANNELS GRID */
.channels {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    margin-top: 26px;
}

/* CARDS */
.card {
    grid-column: span 6;
    border-radius: 18px;
    padding: 18px 18px 16px;

    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.11);
    backdrop-filter: blur(12px);

    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.50);
    position: relative;
    overflow: hidden;

    opacity: 0;
    transform: translateY(12px);
    transition: opacity 600ms ease, transform 600ms ease, border-color 350ms ease, box-shadow 350ms ease;

    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 210px;
}

.card.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.card::before {
    content: "";
    position: absolute;
    inset: -2px;
    opacity: 0.55;
    background: radial-gradient(500px 240px at 18% 10%, rgba(205, 160, 80, 0.14), transparent 62%);
    pointer-events: none;
}

.card:hover {
    border-color: rgba(205, 160, 80, 0.38);
    box-shadow: 0 22px 75px rgba(0, 0, 0, 0.55);
}

.card-top {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    position: relative;
    z-index: 1;
}

.icon-badge {
    --brown: #6F4E37;
    --core: rgba(111, 78, 55, 0.45);
    --soft: rgba(111, 78, 55, 0.28);

    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    flex: 0 0 auto;

    position: relative;
    overflow: visible;

    color: #FFE3BF;

    background:
        radial-gradient(circle at 50% 40%,
            rgba(255, 220, 160, 0.20),
            var(--brown));

    border: 1px solid rgba(255, 220, 160, 0.42);

    box-shadow:
        0 0 14px var(--core),
        0 0 32px var(--soft),
        0 0 64px rgba(111, 78, 55, 0.22),
        0 16px 36px rgba(0, 0, 0, 0.65);

    animation: neonPulse 2.6s ease-in-out infinite;
}

.icon-badge::after {
    content: "";
    position: absolute;
    inset: -22px;
    border-radius: 18px;
    background: radial-gradient(circle, var(--core), transparent 65%);
    filter: blur(22px);
    pointer-events: none;
    z-index: -1;
}

@keyframes neonPulse {

    0%,
    100% {
        filter: brightness(1) saturate(1.05);
    }

    50% {
        filter: brightness(1.25) saturate(1.35);
    }
}

.card-head {
    min-width: 0;
}

/* ✅ Card title (H2) */
.card-title {
    font-family: 'Quicksand', sans-serif;
    font-size: 1.12rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0;
    color: rgba(255, 255, 255, 0.94);
}

/* ✅ Card desc */
.card-desc {
    font-family: 'Quicksand', sans-serif;
    margin: 6px 0 0;
    color: rgba(255, 255, 255, 0.70);
    line-height: 1.55;
    font-size: 0.98rem;
    font-weight: 500;
}

/* MID */
.card-mid {
    position: relative;
    z-index: 1;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 14px;

    background: rgba(0, 0, 0, 0.34);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

/* ✅ info label/value jerarquizados */
.info-label {
    font-family: 'Quicksand', sans-serif;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.02em;
}

.info-value {
    font-family: 'Quicksand', sans-serif;
    color: rgba(255, 255, 255, 0.92);
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
}

.info-value--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 62%;
}

/* ACTIONS (ICON BUTTONS) */
.card-actions.icons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: auto;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
}

.icon-btn {
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    letter-spacing: 0.02em;

    width: 46px;
    height: 46px;
    border-radius: 14px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    font-size: 1.05rem;
    line-height: 1;

    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.10);
    color: rgba(255, 255, 255, 0.92);

    cursor: pointer;
    user-select: none;
    text-decoration: none;

    transition: transform 180ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.icon-btn:hover {
    border-color: rgba(205, 160, 80, 0.35);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.40);
}

.icon-btn:active {
    transform: translateY(1px);
}

.icon-btn--primary {
    --brown: #6F4E37;
    --core: rgba(111, 78, 55, 0.45);
    --soft: rgba(111, 78, 55, 0.28);

    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    letter-spacing: 0.02em;

    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: visible;

    color: #FFE3BF;

    background:
        radial-gradient(circle at 50% 38%,
            rgba(255, 220, 160, 0.22),
            var(--brown));

    border: 1px solid rgba(255, 220, 160, 0.42);

    box-shadow:
        0 0 14px var(--core),
        0 0 32px var(--soft),
        0 0 64px rgba(111, 78, 55, 0.22),
        0 16px 36px rgba(0, 0, 0, 0.65);

    transition: transform .18s ease, box-shadow .22s ease;
    animation: ctaPulse 2.8s ease-in-out infinite;
}

.icon-btn--primary::after {
    content: "";
    position: absolute;
    inset: -22px;
    border-radius: inherit;
    background: radial-gradient(circle, var(--core), transparent 65%);
    filter: blur(22px);
    pointer-events: none;
    z-index: -1;
}

@keyframes ctaPulse {

    0%,
    100% {
        filter: brightness(1) saturate(1.05);
    }

    50% {
        filter: brightness(1.35) saturate(1.55);
    }
}

.icon-btn--primary:hover {
    transform: translateY(-1px);
    box-shadow:
        0 0 18px rgba(111, 78, 55, 0.75),
        0 0 44px rgba(111, 78, 55, 0.55),
        0 0 86px rgba(255, 255, 255, 0.12),
        0 20px 48px rgba(0, 0, 0, 0.75);
}

@media (prefers-reduced-motion: reduce) {

    .icon-btn--primary,
    .icon-badge {
        animation: none;
    }
}

/* LOCATIONS */
.locations {
    margin-top: 58px;
}

.section-head {
    margin-bottom: 18px;
}

/* ✅ H2 Section title */
.section-title {
    font-family: 'Quicksand', sans-serif;
    font-weight: 800;
    font-size: clamp(1.4rem, 2.2vw, 1.8rem);
    letter-spacing: -0.02em;
    margin: 0;
    color: rgba(255, 255, 255, 0.94);
}

/* ✅ Section subtitle */
.section-subtitle {
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.6;

    position: relative;
    padding-left: 14px;
    border-left: 1px solid rgba(205, 160, 80, 0.22);
}

.locations-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    margin-top: 18px;
}

.location-card {
    grid-column: span 6;
    border-radius: 18px;
    padding: 18px;

    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.11);
    backdrop-filter: blur(12px);

    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.50);
    overflow: hidden;

    opacity: 0;
    transform: translateY(12px);
    transition: opacity 600ms ease, transform 600ms ease, border-color 350ms ease, box-shadow 350ms ease;
}

.location-card.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.location-card:hover {
    border-color: rgba(205, 160, 80, 0.34);
    box-shadow: 0 22px 75px rgba(0, 0, 0, 0.55);
}

/* ✅ H3 location title */
.location-title {
    font-family: 'Quicksand', sans-serif;
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.94);
}

/* ✅ Location desc */
.location-desc {
    font-family: 'Quicksand', sans-serif;
    margin: 8px 0 0;
    color: rgba(255, 255, 255, 0.68);
    font-weight: 500;
    font-size: 0.98rem;
    line-height: 1.55;
}

.map-shell {
    position: relative;
    width: 100%;
    height: 260px;
    border-radius: 16px;
    overflow: hidden;
    margin-top: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(0, 0, 0, 0.30);
}

.map {
    width: 100%;
    height: 100%;
    border: 0;
    filter: saturate(0.95) contrast(1.05) brightness(0.85);
}

.map-overlay {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(600px 300px at 50% 10%, rgba(205, 160, 80, 0.16), transparent 62%),
        linear-gradient(180deg, rgba(12, 12, 17, 0.12), rgba(12, 12, 17, 0.48));
    pointer-events: none;
}

/* CTA "Ver en Maps" */
.location-actions {
    margin-top: 14px;
    display: flex;
    justify-content: flex-start;
}

.location-actions .btn {
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    letter-spacing: 0.02em;

    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;

    padding: 10px 16px;
    border-radius: 14px;

    text-transform: none;
    font-size: 0.95rem;

    color: rgba(255, 255, 255, 0.92) !important;

    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(205, 160, 80, 0.35);
    backdrop-filter: blur(10px);

    box-shadow:
        0 10px 28px rgba(0, 0, 0, 0.35),
        inset 0 0 0 1px rgba(255, 255, 255, 0.06);

    transition: transform 180ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.location-actions .btn::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: radial-gradient(420px 200px at 20% 30%, rgba(205, 160, 80, 0.18), transparent 62%);
    opacity: 0;
    transition: opacity 220ms ease;
    pointer-events: none;
}

.location-actions .btn:hover::before {
    opacity: 1;
}

.location-actions .btn:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.075);
    border-color: rgba(205, 160, 80, 0.55);
    box-shadow:
        0 16px 40px rgba(0, 0, 0, 0.45),
        0 0 0 1px rgba(205, 160, 80, 0.15);
}

.location-actions .btn:active {
    transform: translateY(0px);
}

.location-actions .btn.btn-ghost {
    background: rgba(255, 255, 255, 0.06) !important;
    border: 1px solid rgba(205, 160, 80, 0.35) !important;
    color: rgba(255, 255, 255, 0.92) !important;
}

/* TOAST */
.toast {
    position: fixed;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%) translateY(16px);
    opacity: 0;
    pointer-events: none;

    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 14px;

    background: rgba(10, 10, 14, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(10px);

    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.50);
    transition: opacity 220ms ease, transform 220ms ease;
    z-index: 50;
}

.toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

.toast-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(205, 160, 80, 1);
    box-shadow: 0 0 18px rgba(205, 160, 80, 0.55);
}

.toast-text {
    font-family: 'Quicksand', sans-serif;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 800;
    letter-spacing: -0.01em;
    font-size: 0.95rem;
}

/* ANIMATIONS */
@keyframes shimmer {

    0%,
    100% {
        opacity: 0.55;
        transform: translateX(0);
    }

    50% {
        opacity: 1;
        transform: translateX(6px);
    }
}

@keyframes floatGlow {

    0%,
    100% {
        transform: translate3d(0, 0, 0);
    }

    50% {
        transform: translate3d(18px, -10px, 0);
    }
}

/* RESPONSIVE */
@media (max-width: 860px) {

    .card,
    .location-card {
        grid-column: span 12;
    }

    .map-shell {
        height: 240px;
    }
}

@media (max-width: 420px) {
    .contacto-view {
        padding: 96px 0 70px;
    }

    .card-actions.icons {
        justify-content: flex-start;
    }
}

</style>
