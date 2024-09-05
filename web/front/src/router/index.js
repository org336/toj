import { createRouter, createWebHistory } from "vue-router";
import VueCookies from "vue-cookies";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      children: [
        {
          path: "/",
          name: "index-app",
          component: () => import("@/views/index/IndexApp.vue"),
        },
        {
          path: "/user",
          name: "user-profile",
          component: () => import("@/views/profile/user-profile.vue"),
          children: [
            {
              path: "",
              name: "re-profile-main",
              redirect: "/user/profile",
            },
            {
              path: "profile",
              name: "profile-main",
              component: () => import("@/views/profile/profile-basic.vue"),
            },
            {
              path: "identity",
              name: "profile-identity",
              component: () => import("@/views/profile/profile-identity.vue"),
            },
            {
              path: "password",
              name: "profile-pwd",
              component: () => import("@/views/profile/profile-pwd.vue"),
            },
          ],
        },
        {
          path: "/message",
          name: "user-message",
          component: () => import("@/views/message/MessageApp.vue"),
          children: [
            {
              path: "",
              name: "re-message-inbox",
              redirect: "/message/inbox",
            },
            {
              path: "inbox",
              name: "message-inbox",
              component: () => import("@/views/message/pages/InboxPage.vue"),
            },
            {
              path: "send",
              name: "message-send",
              component: () => import("@/views/message/pages/SendPage.vue"),
            },
            {
              path: "drafts",
              name: "message-drafts",
              component: () => import("@/views/message/pages/DraftsPage.vue"),
            },
            {
              path: "starred",
              name: "message-starred",
              component: () => import("@/views/message/pages/StarredPage.vue"),
            },
            {
              path: "trash",
              name: "message-trash",
              component: () => import("@/views/message/pages/TrashPage.vue"),
            },
            {
              path: "inbox/:id",
              name: "message-view",
              component: () => import("@/views/message/pages/ViewPage.vue"),
            },
            {
              path: "inbox/:id",
              name: "message-setting",
              component: () => import("@/views/message/pages/SettingPage.vue"),
            },
          ],
        },
        // 学生用户的课程、班级、任务页面
        {
          path: "/dashboard",
          name: "stu-dashboard",
          component: () => import("@/views/dashboard/DashboardApp.vue"),
          children: [
            {
              path: "",
              name: "re-course-learn",
              redirect: "/dashboard/course",
            },
            {
              path: "class",
              name: "class-page",
              component: () => import("@/views/dashboard/pages/ClassPage.vue"),
            },
            {
              path: "chat",
              name: "ai-chat",
              component: () => import("@/views/dashboard/pages/ChatGPT.vue"),
            },
            {
              path: "task",
              name: "task-page",
              component: () => import("@/views/dashboard/pages/TaskPage.vue"),
              children: [
                {
                  path: "",
                  name: "re-todo-task",
                  redirect: "/dashboard/task/todo",
                },
                {
                  path: "todo",
                  name: "todo-task-list",
                  component: () => import("@/views/dashboard/components/TaskList.vue"),
                },
                {
                  path: "completed",
                  name: "completed-task-list",
                  component: () => import("@/views/dashboard/components/TaskList.vue"),
                },
                {
                  path: ":id",
                  name: "task-view",
                  component: () => import("@/views/dashboard/components/TaskView.vue"),
                },
              ],
            },

            {
              path: "course",
              name: "course-page",
              component: () => import("@/views/dashboard/pages/CoursePage.vue"),
            },
            {
              path: "class/:id",
              name: "class-view",
              component: () => import("@/views/dashboard/components/ClassView.vue"),
            },
            {
              path: "course/:id",
              name: "course-view",
              component: () => import("@/views/dashboard/components/CourseView.vue"),
            },
          ],
        },
        {
          path: "/class",
          name: "manage-class",
          component: () => import("@/views/class/ManageClass.vue"),
        },
        // 老师用户的课程、任务页面
        {
          path: "/task",
          name: "manage-task",
          component: () => import("@/views/task/task-page.vue"),
          children: [
            {
              path: "",
              name: "task-overview",
              component: () => import("@/views/task/task-overview.vue"),
            },
            {
              path: "dashboard",
              name: "task-dashboard",
              component: () => import("@/views/task/task-dashboard.vue"),
            },
            {
              path: "setting",
              name: "task-setting",
              component: () => import("@/views/task/task-setting.vue"),
            },
            {
              path: "create",
              name: "create-task",
              component: () => import("@/views/task/create-task.vue"),
            },
          ],
        },
        {
          path: "/todo",
          name: "todo-page",
          component: () => import("@/views/todo/todo-page.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/components/common/NotFound.vue"),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const loginStatus = VueCookies.get("LOGIN_STATUS") === "1";
//   if (to.name !== "login" && !loginStatus) {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });

export default router;
