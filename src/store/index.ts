import Vue from "vue";
import Vuex from "vuex";
import appStore from "./modules/app/appStore"
import authStore from "./modules/auth/authStore"
import teacherStore from "./modules/teacher/teacherStore"
import studentStore from "./modules/student/studentStore"

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		appStore,
		authStore,
		teacherStore,
		studentStore,
	}
  })
  export default store
