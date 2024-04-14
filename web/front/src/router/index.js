import { createRouter, createWebHistory } from "vue-router";
import VueCookies from "vue-cookies";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userInfo = VueCookies.get("userInfo");
  if (to.meta.needLogin != null && to.meta.needLogin && userInfo.isAdmin != true) {
    router.push("/login");
  }
  next();
});
export default router;
