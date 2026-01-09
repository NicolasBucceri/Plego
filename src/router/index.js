// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/01-Home.vue";
import VistaMueble from "@/views/VistaMueble.vue";
import Contacto from "@/views/Contacto.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/acabados/:textura",
    name: "acabado",
    component: VistaMueble,
    props: (route) => ({ textura: route.params.textura }),
  },
  { path: "/contacto", name: "contacto", component: Contacto },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition;

  if (to.hash) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const el = document.querySelector(to.hash);
        if (!el) return resolve({ left: 0, top: 0 });

        const nav = document.querySelector(".navbar-plego");
        const navStyle = nav ? getComputedStyle(nav) : null;

        // Solo compensamos si el navbar realmente tapa contenido
        const navOverlays =
          navStyle && (navStyle.position === "fixed" || navStyle.position === "sticky");

        const navH = nav && navOverlays ? nav.offsetHeight : 0;

        const top = el.getBoundingClientRect().top + window.scrollY - navH;

        resolve({ left: 0, top, behavior: "smooth" });
      });
    });
  }

  return { left: 0, top: 0 };
}

});

export default router;
