import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Tooltip from "primevue/tooltip";

// Import Bootstrap CSS (required for FullCalendar Bootstrap theme)
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  ripple: true,
});

app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("Dropdown", Dropdown);

app.directive("tooltip", Tooltip);

app.mount("#app");
