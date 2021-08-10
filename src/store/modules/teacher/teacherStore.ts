import { teacherService } from './teacher.service'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { idObject } from '@/common/typeInterfaces/idObjects';
import store from "../../index";

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
	async fetchAllTeachers() {
		try {
			const fetchAllTeachers = await teacherService.fetchAllTeachers();

			this.context.commit('setState', {
				prop: 'allTeachers',
				value: fetchAllTeachers.data
			});

			return Promise.resolve(fetchAllTeachers.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async fetchTeacherData(payload: any) {
		try {
			const fetchTeacherData = await teacherService.fetchTeacherData(payload);

			this.context.commit('setState', {
				prop: 'teacher',
				value: fetchTeacherData.data
			});

			return Promise.resolve(fetchTeacherData.data);
		} catch (error) {
			this.context.commit('setState', {
				prop: 'teacher',
				value: null
			});

			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async fetchTeacherCourses(payload: any) {
		try {
			const fetchTeacherCourses = await teacherService.fetchTeacherCourses(payload);

			this.context.commit('setState', {
				prop: 'teacherCourses',
				value: fetchTeacherCourses.data
			});

			return Promise.resolve(fetchTeacherCourses.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async createCourse( payload: any) {
		try {
			const createCourse = await teacherService.createCourse(payload.data);

			this.context.dispatch('fetchTeacherCourses', {
				id: payload.id
			})

			return Promise.resolve(createCourse.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async editCourse( payload: any) {
		try {
			const editCourse = await teacherService.editCourse(payload.data);

			this.context.dispatch('fetchTeacherCourses', {
				id: payload.id
			})

			return Promise.resolve(editCourse.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async deleteCourse(payload: any) {
		try {
			const deleteCourse = await teacherService.deleteCourse(payload.data);

			this.context.dispatch('fetchTeacherCourses', {
				id: payload.id
			})

			return Promise.resolve(deleteCourse.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async fetchTeacherStudents(payload: any) {
		try {
			const fetchTeacherStudents = await teacherService.fetchTeacherStudents(payload);

			this.context.commit('setState', {
				prop: 'teacherStudents',
				value: fetchTeacherStudents.data
			});

			return Promise.resolve(fetchTeacherStudents.data);
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

			return Promise.resolve(setCourseCompleted.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async fetchTeacherRequestCourses() {
		try {
			const fetchTeacherRequestCourses = await teacherService.fetchTeacherRequestCourses();

			this.context.commit('setState', {
				prop: 'teacherRequestCourses',
				value: fetchTeacherRequestCourses.data
			});

			return Promise.resolve(fetchTeacherRequestCourses.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	@Action({ rawError: true })
	async setCourseAccepted(payload: any) {
		try {
			const setCourseAccepted = await teacherService.setCourseAccepted(payload);

			return Promise.resolve(setCourseAccepted.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
export default TeacherStore;
