import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/index.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.use(createPinia());
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

app.mount("#app");

// Import Fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMicrophone, faCamera } from "@fortawesome/free-solid-svg-icons";

library.add(faMicrophone);
library.add(faCamera);
