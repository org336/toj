import { createApp } from "vue";
import App from "./App.vue";
//引入全局组件依赖包
import router from "./router/index.js";
import vuetify from "./plugins/vuetify.ts";
import ElementPlus from "element-plus";
import VXETable from "vxe-table";
import { createPinia } from "pinia";
//引入全局的自定义组件
import CustomButton from "./components/common/CustomButton.vue";
import SnackBar from "./components/common/SnackBar.vue";
//引入全局style
import "element-plus/dist/index.css";
import "vxe-table/lib/style.css";
import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/base.css";
//引入全局JS
import VueCookies from "vue-cookies";
import Verify from "./utils/Verify.js";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(VXETable);
app.use(VueCookies);
app.use(vuetify);
//配置全局组件
app.component("SnackBar", SnackBar);
app.component("CustomButton", CustomButton);
//配置全局JS
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.Verify = Verify;
app.mount("#app");
