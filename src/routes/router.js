import { createWebHistory, createRouter } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "DefaultPage",
    component: () => import("../pages/DefaultPage.vue"),
  },
  {
    path: "/loading",
    name: "LoadingPage",
    component: () => import("../pages/LoadingPage.vue"),
  },
  {
    path: "/homepage",
    name: "HomePage",
    component: () => import("../pages/HomePage.vue"),
    children: [
      {
        path: "",
        name: "DashboardPage",
        component: () => import("../pages/DashboardPage.vue"),
        meta: {roles: ["Administrator","Doctor","Staff","Other"]},
      },
      {
        path: "/users",
        name: "UsersPage",
        component: () => import("../pages/UsersPage.vue"),
        meta: {roles: ["Administrator"]},
      },
      {
        path: "/services",
        name: "ServicesPage",
        component: () => import("../pages/ServicesPage.vue"),
         meta: {roles: ["Administrator","Staff"]},
      },
      {
        path: "/patients",
        name: "PatientsPage",
        component: () => import("../pages/PatientsPage.vue"),
        meta: {roles: ["Administrator","Doctor","Staff"]},
      },
      {
        path: "/invoices",
        name: "InvoicesPage",
        component: () => import("../pages/InvoicesPage.vue"),
        meta: {roles: ["Administrator","Staff"]},
      },
      {
        path: "/appointments",
        name: "AppointmentsPage",
        component: () => import("../pages/AppointmentPage.vue"),
        meta: {roles: ["Administrator","Doctor","Staff"]},
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const role = store.state.userrole;

  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return next({ name: "DashboardPage" });
  }

  next();
});

export default router;


