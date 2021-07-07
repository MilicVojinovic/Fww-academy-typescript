import Vuelidate from 'vuelidate';
import Meta from "vue-meta";
import DatePicker from "vue2-datepicker";

class GlobalPlugins {
	public Global_Plugins : any = {
		Vuelidate,
		Meta,
		DatePicker
	};
}

export const globalPlugins = new GlobalPlugins()