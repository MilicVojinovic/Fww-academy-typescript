import { teacherService } from '../../../modules/teacher/teacher.service'


const teacherStore = {
	namespaced: true,
	state: {
		teacher: null,
		teacherCourses: null,
		teacherStudents: null,
		allTeachers: null,
		teacherRequestCourses: [],
		students: [],
	},
	getters: {
		getState: (state) => (prop) => {
			return state[prop];
		},
	},

	mutations: {
		setState: (state, { prop, value }) => {
			state[prop] = value;
		}
	},

	actions: {
		async fetchAllTeachers({ commit }) {
			try {
				const fetchAllTeachers = await teacherService.fetchAllTeachers();

				commit('setState', {
					prop: 'allTeachers',
					value: fetchAllTeachers.data
				});

				return Promise.resolve(fetchAllTeachers);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchTeacherData({ commit } , payload) {
			try {
				const fetchTeacherData = await teacherService.fetchTeacherData(payload);

				commit('setState', {
					prop: 'teacher',
					value: fetchTeacherData.data
				});

				return Promise.resolve(fetchTeacherData);
			} catch (error) {
				commit('setState', {
					prop: 'teacher',
					value: null
				});

				return Promise.reject(error);
			}
		},
		async fetchTeacherCourses({ commit } , payload) {
			try {
				const fetchTeacherCourses = await teacherService.fetchTeacherCourses(payload);

				commit('setState', {
					prop: 'teacherCourses',
					value: fetchTeacherCourses.data
				});

				return Promise.resolve(fetchTeacherCourses);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async createCourse ({ dispatch } , payload ) {
			try {
				const createCourse = await teacherService.createCourse(payload.data);

				dispatch('fetchTeacherCourses' , {
					id : payload.id
				})

				return Promise.resolve(createCourse);
			} catch (error) {
				return Promise.reject(error);
			}
		},

		async editCourse ({ dispatch } , payload ) {
			try {
				const editCourse = await teacherService.editCourse(payload.data);

				dispatch('fetchTeacherCourses' , {
					id : payload.id
				})

				return Promise.resolve(editCourse);
			} catch (error) {
				return Promise.reject(error);
			}
		},

		async deleteCourse ({ dispatch } , payload ) {
			try {
				const deleteCourse = await teacherService.deleteCourse(payload.data);

				dispatch('fetchTeacherCourses' , {
					id : payload.id
				})

				return Promise.resolve(deleteCourse);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchTeacherStudents ({ commit } , payload ) {
			try {
				const fetchTeacherStudents = await teacherService.fetchTeacherStudents(payload);

				commit('setState', {
					prop: 'teacherStudents',
					value: fetchTeacherStudents.data
				});

				return Promise.resolve(fetchTeacherStudents);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		// eslint-disable-next-line no-unused-vars
		async assignCourse ({ context } , payload ) {
			try {
				const assignCourse = await teacherService.assignCourse(payload);

				return Promise.resolve(assignCourse);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		// eslint-disable-next-line no-unused-vars
		async setCourseCompleted ({ context } , payload ) {
			try {
				const setCourseCompleted = await teacherService.setCourseCompleted(payload);
				console.log(setCourseCompleted);

				return Promise.resolve(setCourseCompleted);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchTeacherRequestCourses({ commit }) {
			try {
				const fetchTeacherRequestCourses = await teacherService.fetchTeacherRequestCourses();

				commit('setState', {
					prop: 'teacherRequestCourses',
					value: fetchTeacherRequestCourses.data
				});

				return Promise.resolve(fetchTeacherRequestCourses);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchStudents({ commit } , payload) {
			try {
				const fetchStudents = await teacherService.fetchStudents(payload);

				commit('setState', {
					prop: 'students',
					value: fetchStudents.data
				});

				return Promise.resolve(fetchStudents);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		// eslint-disable-next-line no-unused-vars
		async setCourseAccepted({ commit } , payload) {
			try {
				const setCourseAccepted = await teacherService.setCourseAccepted(payload);

				return Promise.resolve(setCourseAccepted);
			} catch (error) {
				return Promise.reject(error);
			}
		},
	},
};

export default teacherStore;
