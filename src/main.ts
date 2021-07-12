import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import '@/assets/scss/styles.scss'
import { globalComponents } from '@/common/components/GlobalComponents';
import { globalPlugins } from '@/common/plugins/GlobalPlugins';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';
import 'vue2-datepicker/index.css';

Vue.component('v-select', vSelect)

Object.keys(globalComponents.Global_Components).forEach((key) => {
	let component : any = globalComponents.Global_Components[key]
	Vue.component(key, component);
});

Object.keys(globalPlugins.Global_Plugins).forEach((key) => {
	let component : any = globalPlugins.Global_Plugins[key]
	Vue.use(component);
});

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
