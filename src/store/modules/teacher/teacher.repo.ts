import { api } from '@/api/api';
import queryString from 'query-string';

const ROUTES = {
	USERS : '/users',
	TEACHER : '/teacher',
	COURSE : '/courses',
	STUDENTS : '/students'
};

class TeacherRepo {

	fetchAllTeachers() {
		const URL = `${ROUTES.USERS}?role=teacher`
		return api.get(URL);
	}

	fetchTeacherData(payload) {
		const URL = `${ROUTES.USERS}/${payload.id}`
		return api.get(URL);
	}

	fetchTeacherCourses(payload) {
		const URL = `${ROUTES.TEACHER}/${payload.id}/courses`
		return api.get(URL);
	}

	createCourse(payload) {
		const URL = `${ROUTES.COURSE}`
		return api.post(URL , payload);
	}
	
	editCourse(payload) {
		const URL = `${ROUTES.COURSE}/${payload.course_id}`
		return api.patch(URL , payload.data);
	}
	
	deleteCourse(payload) {
		const URL = `${ROUTES.COURSE}/${payload.course_id}`
		return api.delete(URL);
	}

	fetchTeacherStudents(payload) {
		const query = queryString.stringify(payload);
		const URL = `${ROUTES.STUDENTS}?${query}`
		return api.get(URL);
	}

	assignCourse(payload) {
		const URL = `${ROUTES.TEACHER}/${payload.teacher_id}/add_course`
		return api.patch(URL ,{"course_id" : [payload.course_id] });
	}

	setCourseCompleted(payload) {
		const URL = `student/${payload.student_id}/course/${payload.course_id}/teacher/${payload.teacher_id}`
		return api.patch(URL , {"complete" : true } );
	}

	fetchTeacherRequestCourses() {
		const URL = `${ROUTES.TEACHER}/request_course`
		return api.get(URL);
	}

	setCourseAccepted(payload) {
		const URL = `${ROUTES.TEACHER}/request_course/${payload.course_id}`
		return api.post(URL, {
			accepted : payload.accepted
		});
	}
}

export const teacherRepo = new TeacherRepo();
