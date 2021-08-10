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
	public	applyToCourse: boolean | null = null;

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

	get getApplyToCourse() : boolean | null {
		return this.applyToCourse;
	}




	@Mutation
	public setState(obj: any) {
		for (const key in this) {
			if (key === obj.prop) {
				this[key] = obj.value;
			}
		}
	}

	@Mutation
	public setApplyToCourse(applyToCourse: any) {
		this.applyToCourse = applyToCourse;
	}

	@Mutation
	public setUnratedCourse(unratedCourse: any) {
		this.unratedCourse = unratedCourse
	}

	@Action
	async fetchUnratedCourse( payload : any ) {
		try {
			const fetchUnratedCourse = await studentService.fetchUnratedCourse(payload);

			this.context.commit('setState', {
				prop: 'unratedCourse',
				value: fetchUnratedCourse.data
			})

			return Promise.resolve(fetchUnratedCourse);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	@Action
	async sendCourseRate( payload : any) {
		try {
			const sendCourseRate = await studentService.sendCourseRate(payload);

			this.context.commit('setState', {
				prop: 'unratedCourse',
				value: null
			});

			return Promise.resolve(sendCourseRate);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	@Action
	async fetchStudentsFinishedCourses( payload : any) {
		try {

			const fetchStudentsFinishedCourses = await studentService.fetchStudentsFinishedCourses(payload);

			this.context.commit('setState', {
				prop: 'studentsFinishedCourses',
				value: fetchStudentsFinishedCourses.data
			});

			return Promise.resolve(fetchStudentsFinishedCourses);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	@Action
	async fetchStudentsUnattendedCourses( payload : any) {
		try {
			const fetchStudentsUnattendedCourses = await studentService.fetchStudentsUnattendedCourses(payload);

			this.context.commit('setState', {
				prop: 'unattendedCourses',
				value: fetchStudentsUnattendedCourses.data
			});

			return Promise.resolve(fetchStudentsUnattendedCourses);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	@Action
	async fetchStudentsCourseInfo( payload : any) {
		try {
			const fetchStudentsCourseInfo = await studentService.fetchStudentsCourseInfo(payload);

			this.context.commit('setState', {
				prop: 'unattendedCourseInfo',
				value: fetchStudentsCourseInfo.data
			});

			return Promise.resolve(fetchStudentsCourseInfo);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	@Action
	async fetchStudentsCurrentCourses( payload : any) {
		try {
			const fetchStudentsCurrentCourses = await studentService.fetchStudentsCurrentCourses(payload);

			this.context.commit('setState', {
				prop: 'studentsCurrentCourses',
				value: fetchStudentsCurrentCourses.data
			});

			return Promise.resolve(fetchStudentsCurrentCourses);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	@Action
	async fetchCourseInfo( payload : any) {
		try {
			const fetchCourseInfo = await studentService.fetchCourseInfo(payload);

			this.context.commit('setState', {
				prop: 'courseInfo',
				value: fetchCourseInfo.data
			});

			return Promise.resolve(fetchCourseInfo);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	@Action
	async requestCourse( payload : any) {
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
