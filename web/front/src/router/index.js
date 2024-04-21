import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue"),
      children: [
        {
          path: "",
          name: "HomePage",
          component: () => import("@/views/home-page.vue"),
        },
        {
          path: "/profile",
          name: "Profile",
          component: () => import("@/views/user-profile.vue"),
          children: [
            {
              path: "",
              name: "ProfileMain",
              component: () => import("@/views/profile-main.vue"),
            },
            {
              path: "identity",
              name: "ProfileIdentity",
              component: () => import("@/views/profile-identity.vue"),
            },
            {
              path: "updatePwd",
              name: "ProfileUpdatePwd",
              component: () => import("@/views/profile-updatePwd.vue"),
            },
          ],
        },

        {
          path: "/email",
          name: "UserEmail",
          component: () => import("@/views/user-email.vue"),
        },
        {
          path: "/course",
          name: "CoursePage",
          component: () => import("@/views/course-page.vue"),
        },
        {
          path: "/class",
          name: "ClassPage",
          component: () => import("@/views/class-page.vue"),
        },
      ],
      /*
      beforeEnter: (to, from, next) => {
        if (store.state.isLoggedIn) {
          next();
        } else {
          next({ name: "Login" });
        }
      },*/
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});
router.isReady().then(() => {
  if (router.currentRoute.value.path !== "/") {
    router.push("/");
  }
});
export default router;
