import { teacherService } from './teacher.service'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Commit } from 'vuex';
import { Dispatch } from 'vuex';
import { idObject } from '@/common/typeInterfaces/idObjects';
@Module({ namespaced: true })
class TeacherStore extends VuexModule {

	public teacher: idObject | null = null;
	public teacherCourses: [] | null = null;
	public teacherStudents: [] | null = null;
	public allTeachers: [] | null = null;
	public teacherRequestCourses: [] | null = null;
	public students: [] | null = null;

	get getTeacher() : idObject | null {
		return this.teacher;
	}

	get getTeacherCourses() : [] | null {
		return this.teacherCourses;
	}

	get getTeacherStudents() : [] | null {
		return this.teacherStudents;
	}

	get getAllTeachers() : [] | null {
		return this.allTeachers;
	}

	get getTeacherRequestCourses() : [] | null {
		return this.teacherRequestCourses;
	}

	get getStudents() : [] | null {
		return this.students;
	}

	@Mutation
	public setState(obj: any) {
		for (const key in this) {
			if (key === obj.prop) {
				this[key] = obj.value;
			}
		}
	}

	@Action({ rawError: true })
	async fetchAllTeachers({ commit }: { commit: Commit }) {
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
	}
	@Action({ rawError: true })
	async fetchTeacherData({ commit }: { commit: Commit }, payload: any) {
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
	}
	@Action({ rawError: true })
	async fetchTeacherCourses({ commit }: { commit: Commit }, payload: any) {
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
	}
	@Action({ rawError: true })
	async createCourse({ dispatch }: { dispatch: Dispatch }, payload: any) {
		try {
			const createCourse = await teacherService.createCourse(payload.data);

			dispatch('fetchTeacherCourses', {
				id: payload.id
			})

			return Promise.resolve(createCourse);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async editCourse({ dispatch }: { dispatch: Dispatch }, payload: any) {
		try {
			const editCourse = await teacherService.editCourse(payload.data);

			dispatch('fetchTeacherCourses', {
				id: payload.id
			})

			return Promise.resolve(editCourse);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async deleteCourse({ dispatch }: { dispatch: Dispatch }, payload: any) {
		try {
			const deleteCourse = await teacherService.deleteCourse(payload.data);

			dispatch('fetchTeacherCourses', {
				id: payload.id
			})

			return Promise.resolve(deleteCourse);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async fetchTeacherStudents({ commit }: { commit: Commit }, payload: any) {
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
	}
	@Action({ rawError: true })
	async assignCourse(payload: any) {
		try {
			const assignCourse = await teacherService.assignCourse(payload);

			return Promise.resolve(assignCourse);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async setCourseCompleted(payload: any) {
		try {
			const setCourseCompleted = await teacherService.setCourseCompleted(payload);
			console.log(setCourseCompleted);

			return Promise.resolve(setCourseCompleted);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async fetchTeacherRequestCourses({ commit }: { commit: Commit }) {
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
	}
	@Action({ rawError: true })
	async setCourseAccepted(payload: any) {
		try {
			const setCourseAccepted = await teacherService.setCourseAccepted(payload);

			return Promise.resolve(setCourseAccepted);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
export default TeacherStore;
