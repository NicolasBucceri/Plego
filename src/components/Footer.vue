<template>
    <footer class="footer-plego">

        <!-- Upper row -->
        <div class="footer-top container">
            <!-- LOGO -->
            <div class="footer-logo">
                <img src="@/assets/Img/Logo.png" alt="Plego Logo" />
                <p class="footer-desc">
                    Diseño y fabricación de mobiliario a medida.
                    Calidad, innovación y estética en cada proyecto.
                </p>
            </div>

            <!-- NAV COLUMN (tipo SlashBar pero en version footer) -->
            <div class="footer-nav">
                <h4>Navegación</h4>
                <ul>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#nosotros">Nosotros</a></li>
                    <li><a href="#soluciones">Soluciones</a></li>
                    <li><a href="#acabados">Acabados</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </div>

            <!-- CONTACT INFO -->
            <div class="footer-contact">
                <h4>Contacto</h4>

                <div class="c-item">
                    <i class="fa-solid fa-envelope"></i>
                    <span>plegoamoblamientos@gmail.com</span>
                </div>

                <div class="c-item">
                    <i class="fa-solid fa-phone"></i>
                    <span>+54 11 5579-8761</span>
                </div>

                <div class="c-item">
                    <i class="fa-brands fa-whatsapp"></i>
                    <span>+54 9 11 5579-8761</span>
                </div>

                <div class="socials">
                    <a href="https://www.instagram.com/plegoamoblamientos/?hl=es-la" target="_blank"
                        rel="noopener noreferrer">
                        <i class="fa-brands fa-instagram"></i>
                    </a>

                    <a href="https://www.tiktok.com/@plegoamoblamiento?_r=1&_t=ZM-92dFHBoWOTb" target="_blank" rel="noopener noreferrer">
                        <i class="fa-brands fa-tiktok"></i>
                    </a>

                </div>
            </div>
        </div>

        <!-- Divider line -->
        <div class="footer-divider"></div>

        <!-- Copy -->
        <div class="footer-bottom">
            <p>© {{ new Date().getFullYear() }} Nicolas Bucceri — Plego — Todos los derechos reservados.
            </p>
        </div>

    </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-plego {
    background: #0e0e0e;
    color: #f5f5f5;
    padding: 4rem 0 2rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    position: relative;
}

/* TOP GRID */
.footer-top {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 3rem;
}

.footer-logo img {
    width: 160px;
    /* ajustá el tamaño a gusto */
    height: auto;
    object-fit: contain;
    /* sacamos el filtro que lo arruina */
    filter: none;
}


.footer-desc {
    margin-top: 1rem;
    font-size: 0.94rem;
    line-height: 1.6;
    opacity: 0.8;
    max-width: 350px;
}

/* NAV */
.footer-nav h4,
.footer-contact h4 {
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 500;
}

.footer-nav ul {
    list-style: none;
    padding-left: 0;
}

.footer-nav ul li {
    margin-bottom: 0.7rem;
}

.footer-nav ul li a {
    color: #e1e1e1;
    text-decoration: none;
    transition: 0.25s ease;
    font-size: 0.95rem;
}

.footer-nav ul li a:hover {
    color: #ffffff;
    transform: translateX(4px);
}

/* CONTACT INFO */
.footer-contact .c-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.8rem;
    opacity: 0.85;
}

.footer-contact i {
    font-size: 1rem;
    width: 18px;
}

.footer-contact .socials {
    margin-top: 1.3rem;
}

.footer-contact .socials a {
    color: #e1e1e1;
    margin-right: 14px;
    font-size: 1.25rem;
    transition: 0.25s;
}

.footer-contact .socials a:hover {
    color: #ffffff;
}

/* DIVIDER */
.footer-divider {
    width: 100%;
    height: 1px;
    margin: 2rem 0;
    background: linear-gradient(to right,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent);
}

/* COPY */
.footer-bottom {
    text-align: center;
    font-size: 0.85rem;
    opacity: 0.65;
}

/* RESPONSIVE */
@media (max-width: 900px) {
    .footer-top {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .footer-logo img {
        margin: 0 auto;
    }

    .footer-contact .c-item,
    .footer-nav ul li {
        justify-content: center;
    }

    .footer-contact .socials a {
        margin: 0 10px;
    }
}
</style>
