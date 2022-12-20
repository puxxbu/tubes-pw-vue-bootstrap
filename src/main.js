import { createApp } from "vue";
import App from "./App.vue";
//import router
import router from "./router";
//import Bootstrap, Popper, jQuery
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min.js";
import "jquery-ui-dist/jquery-ui.min.js";
import "jquery-ui-dist/jquery-ui.css";
import "toastr/build/toastr.min.js";
import "toastr/build/toastr.css";
// import Datepicker from '@vuepic/vue-datepicker';
import Datepicker from "vue3-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far, fab);

const app = createApp(App);
//use vue router
app.use(router);
app.component("MyDatepicker", Datepicker);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
