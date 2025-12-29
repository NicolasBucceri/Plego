// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/01-Home.vue";
import VistaMueble from "@/views/VistaMueble.vue";
import Contacto from "@/views/Contacto.vue"; // ✅ NUEVO

const routes = [
  { path: "/", name: "home", component: Home },

  {
    path: "/acabados/:textura",
    name: "acabado",
    component: VistaMueble,
    props: (route) => ({ textura: route.params.textura }),
  },

  { path: "/contacto", name: "contacto", component: Contacto }, // ✅ NUEVO
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;

    // ✅ si la ruta trae hash, scrollea a ese id
    if (to.hash) {
      return {
        el: to.hash,
        top: 90, // ajuste por navbar fixed (cambiá si tu nav ocupa más/menos)
        behavior: "smooth",
      };
    }

    return { left: 0, top: 0 };
  },
});

export default router;
