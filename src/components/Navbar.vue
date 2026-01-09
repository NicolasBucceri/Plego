<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black py-3 navbar-plego">
    <div class="container-fluid">

      <!-- LOGO -->
      <RouterLink class="navbar-brand" to="/">
        <img :src="logoPlego" alt="Plego Logo" class="logo-img" />
      </RouterLink>

      <!-- TOGGLER MOBILE -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- MENÚ -->
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav ms-auto my-2 my-lg-0 d-flex gap-lg-4">

          <li class="nav-item">
            <RouterLink class="nav-link nav-custom" to="/#hero" @click="closeMenu">
              Inicio
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link nav-custom" to="/#nosotros" @click="closeMenu">
              Nosotros
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link nav-custom" to="/#texturas" @click="closeMenu">
              Servicios
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link nav-custom" to="/#soluciones" @click="closeMenu">
              Cotizar
            </RouterLink>
          </li>

          <!-- ✅ ESTE ES EL QUE TE IMPORTA -->
          <li class="nav-item">
            <RouterLink class="nav-link nav-custom" to="/contacto" @click="closeMenu">
              Contacto
            </RouterLink>
          </li>

        </ul>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import logoPlego from "@/assets/Img/Logo.png";

const closeMenu = () => {
  const el = document.getElementById("navbarScroll");
  if (el && el.classList.contains("show")) el.classList.remove("show");
};
</script>

<style scoped>
.navbar-plego {
  height: var(--nav-height);
  display: flex;
  align-items: center;
  background-color: #0C0C11 !important;
}

/* LOGO */
.logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
  cursor: default !important;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.4));
}

/* NAV LINKS */
/* NAV LINKS */
.nav-custom {
  position: relative;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff !important;
  padding-bottom: 5px;
  letter-spacing: 0.14em; /* look premium */
  transition: color 0.3s ease;
}


.nav-custom::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #D7BFA5;
  transition: width 0.3s ease;
  border-radius: 10px;
}

.nav-custom:hover {
  color: #D7BFA5 !important;
}

.nav-custom:hover::after {
  width: 100%;
}

@media (max-width: 991px) {
  .navbar-nav {
    gap: 1rem;
    text-align: center;
    padding-top: 1rem;
  }
}
</style>
