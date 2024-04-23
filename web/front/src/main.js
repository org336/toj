import { createApp } from "vue";
import App from "./App.vue";
//引入全局组件
import router from "./router";
import ElementPlus from "element-plus";
import store from "./store/index.js";
import VXETable from "vxe-table";

//引入全局style
import "./assets/scss/base.scss";
import "element-plus/dist/index.css";
import "vxe-table/lib/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
//引入全局JS
import VueCookies from "vue-cookies";
import Verify from "./utils/Verify.js";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(store);
app.use(VXETable);
//配置全局组件
//配置全局JS
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.Verify = Verify;
app.mount("#app");
