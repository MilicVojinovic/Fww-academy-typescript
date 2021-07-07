import { studentService } from '../../../modules/student/student.service'

const studentStore = {
	namespaced: true,
	state: {
		unratedCourse: null,
		studentCourses: [],
		unattendedCourses: [],
		unattendedCourseInfo: null,
		studentsFinishedCourses: [],
		studentsCurrentCourses: [],
		courseInfo: null,
		applyToCourse: null,
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
		// eslint-disable-next-line no-unused-vars
		async fetchUnratedCourse({ commit }, payload) {
			try {
				const fetchUnratedCourse = await studentService.fetchUnratedCourse(payload);

				commit('setState', {
					prop: 'unratedCourse',
					value: fetchUnratedCourse.data
				})

				return Promise.resolve(fetchUnratedCourse);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		// eslint-disable-next-line no-unused-vars
		async sendCourseRate({ commit }, payload) {
			try {
				const sendCourseRate = await studentService.sendCourseRate(payload);

				return Promise.resolve(sendCourseRate);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchStudentsFinishedCourses({ commit }, payload) {
			try {
				const fetchStudentsFinishedCourses = await studentService.fetchStudentsFinishedCourses(payload);

				commit('setState', {
					prop: 'studentsFinishedCourses',
					value: fetchStudentsFinishedCourses.data
				});

				return Promise.resolve(fetchStudentsFinishedCourses);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchStudentsUnattendedCourses({ commit }, payload) {
			try {
				const fetchStudentsUnattendedCourses = await studentService.fetchStudentsUnattendedCourses(payload);

				commit('setState', {
					prop: 'unattendedCourses',
					value: fetchStudentsUnattendedCourses.data
				});

				return Promise.resolve(fetchStudentsUnattendedCourses);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchStudentsCourseInfo({ commit } , payload) {
			try {
				const fetchStudentsCourseInfo = await studentService.fetchStudentsCourseInfo(payload);

				commit('setState', {
					prop: 'unattendedCourseInfo',
					value: fetchStudentsCourseInfo.data
				});

				return Promise.resolve(fetchStudentsCourseInfo);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchStudentsCurrentCourses({ commit }, payload) {
			try {
				const fetchStudentsCurrentCourses = await studentService.fetchStudentsCurrentCourses(payload);

				commit('setState', {
					prop: 'studentsCurrentCourses',
					value: fetchStudentsCurrentCourses.data
				});

				return Promise.resolve(fetchStudentsCurrentCourses);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		async fetchCourseInfo({ commit }, payload) {
			try {
				const fetchCourseInfo = await studentService.fetchCourseInfo(payload);

				commit('setState', {
					prop: 'courseInfo',
					value: fetchCourseInfo.data
				});

				return Promise.resolve(fetchCourseInfo);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		// eslint-disable-next-line no-unused-vars
		async requestCourse({ commit }, payload) {
			try {
				const requestCourse = await studentService.requestCourse(payload);

				// commit('setState', {
				// 	prop: 'courseInfo',
				// 	value: requestCourse.data
				// });

				return Promise.resolve(requestCourse);
			} catch (error) {
				return Promise.reject(error);
			}
		},
	},
};

export default studentStore;
