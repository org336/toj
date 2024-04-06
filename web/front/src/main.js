import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/icon/iconfont.css";
import "./assets/base.scss";
//import VueCookies from "vue-cookies";
const app = createApp(App);

app.use(router);
app.use(ElementPlus);

//引入全局组件
//引入全局JS
app.mount("#app");
