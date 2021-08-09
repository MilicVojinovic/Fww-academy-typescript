import { studentService } from './student.service'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Commit } from 'vuex';
@Module({ namespaced: true })
class StudentStore extends VuexModule {

	public  unratedCourse: {} | null = null;
	public	studentCourses: [] = [];
	public	unattendedCourses: [] | null = [];
	public	unattendedCourseInfo: [] | null = null;
	public	studentsFinishedCourses: [] | null = [];
	public	studentsCurrentCourses: [] | null = [];
	public	courseInfo: {} | null = null;
	public	applyToCourse: {} | null = null;

	get getUnratedCourse() : {} | null {
		return this.unratedCourse;
	}

	get getStudentCourses() : [] {
		return this.studentCourses;
	}

	get getUnattendedCourses() : [] | null {
		return this.unattendedCourses;
	}

	get getUnattendedCourseInfo() : [] | null {
		return this.unattendedCourseInfo;
	}

	get getStudentsFinishedCourses() : [] | null {
		return this.studentsFinishedCourses;
	}

	get getStudentsCurrentCourses() : [] | null {
		return this.studentsCurrentCourses;
	}

	get getCourseInfo() : {} | null {
		return this.courseInfo;
	}

	get getApplyToCourse() : {} | null {
		return this.applyToCourse;
	}




	@Mutation
	public setState(state: any, obj: { prop: any; value: any }) {
		state[obj.prop] = obj.value;
	}

	@Mutation
	public setApplyToCourse(state : any, applyToCourse: any) {
		state.applyToCourse = applyToCourse;
	}

	@Mutation
	public setUnratedCourse(state : any, unratedCourse: any) {
		state.unratedCourse = unratedCourse
	}

	@Action
	async fetchUnratedCourse({ commit }: { commit: Commit }, payload : any) {
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
	};
	async sendCourseRate( payload : any) {
		try {
			const sendCourseRate = await studentService.sendCourseRate(payload);

			return Promise.resolve(sendCourseRate);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	async fetchStudentsFinishedCourses({ commit }: { commit: Commit }, payload : any) {
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
	};
	async fetchStudentsUnattendedCourses({ commit }: { commit: Commit } , payload : any) {
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
	};
	async fetchStudentsCourseInfo({ commit }: { commit: Commit } , payload : any) {
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
	};
	async fetchStudentsCurrentCourses({ commit }: { commit: Commit } , payload : any) {
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
	};
	async fetchCourseInfo({ commit }: { commit: Commit } , payload : any) {
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
	};
	async requestCourse({ commit }: { commit: Commit }, payload : any) {
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
	}

}
export default StudentStore;
