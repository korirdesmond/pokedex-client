import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// axios.defaults.baseURL = "https://pokedexxapi.herokuapp.com/";
axios.defaults.baseURL = "http://localhost:3030/";

createApp(App).use(store).use(router).mount("#app");
