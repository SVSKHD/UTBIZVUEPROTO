import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Calendar from "../views/Calendar.vue";
import Markets from "../views/Markets.vue";
import Contact from "../views/Contact.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: Calendar,
    },
    {
      path: "/markets",
      name: "markets",
      component: Markets,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
  ],
});

export default router;
