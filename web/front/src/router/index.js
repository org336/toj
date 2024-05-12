import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
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
          component: () => import("@/views/main/home-page.vue"),
        },
        {
          path: "/profile",
          name: "UserProfile",
          component: () => import("@/views/profile/user-profile.vue"),
          children: [
            {
              path: "",
              name: "ProfileMain",
              component: () => import("@/views/profile/profile-basic.vue"),
            },
            {
              path: "identity",
              name: "ProfileIdentity",
              component: () => import("@/views/profile/profile-identity.vue"),
            },
            {
              path: "pwd",
              name: "ProfilePwd",
              component: () => import("@/views/profile/profile-pwd.vue"),
            },
          ],
        },

        {
          path: "/message",
          name: "UserMessage",
          component: () => import("@/views/message/user-message.vue"),
          children: [
            {
              path: "personal",
              name: "MessagePersonal",
              component: () => import("@/views/message/message-personal.vue"),
            },
            {
              path: "teacher",
              name: "MessageTeacher",
              component: () => import("@/views/message/messgae-teacher.vue"),
            },
            {
              path: "system",
              name: "MessageSystem",
              component: () => import("@/views/message/message-system.vue"),
            },
            {
              path: "my",
              name: "MessageMy",
              component: () => import("@/views/message/message-my.vue"),
            },
            {
              path: "setting",
              name: "MessageSetting",
              component: () => import("@/views/message/message-setting.vue"),
            },
          ],
        },
        {
          path: "/course",
          name: "CoursePage",
          component: () => import("@/views/course/course-page.vue"),
        },
        {
          path: "/class",
          name: "ClassPage",
          component: () => import("@/views/class/class-page.vue"),
        },
      ],
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
