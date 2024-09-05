import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, md } from "vuetify/iconsets/md";
import "material-design-icons-iconfont/dist/material-design-icons.css";
const light = {
  colors: {
    green: "#4CAF50",
    orange: "#ff9800",
    yellow: "#f1c27d",
    black: "#282936",
    grey: "#6b757b",
    error: "#F44336",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    primary: "#2196F3",
    secondary: "#409eff",
    least: "rgba(0, 49, 173, 1)",
  },
  variables: {},
};
const dark = {};

export default createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      variant: "flat",
    },
  },
  icons: {
    defaultSet: "md",
    aliases,
    sets: {
      md,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light,
      dark,
    },
  },
});
