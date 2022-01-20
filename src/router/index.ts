import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Wrapper from "@/views/Wrapper.vue";
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: Wrapper,
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
      },
    ],
  },
  {
    path: "/register",
    component: Signup,
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
