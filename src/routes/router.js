import { createWebHistory, createRouter } from "vue-router";

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
      },
      {
        path: "/users",
        name: "UsersPage",
        component: () => import("../pages/UsersPage.vue"),
      },
      {
        path: "/services",
        name: "ServicesPage",
        component: () => import("../pages/ServicesPage.vue"),
      },
      {
        path: "/patients",
        name: "PatientsPage",
        component: () => import("../pages/PatientsPage.vue"),
      },
      {
        path: "/invoices",
        name: "InvoicesPage",
        component: () => import("../pages/InvoicesPage.vue"),
      },
      {
        path: "/appointments",
        name: "AppointmentsPage",
        component: () => import("../pages/AppointmentPage.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
