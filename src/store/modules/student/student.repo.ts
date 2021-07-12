import { api } from '@/api/api';
import queryString from 'query-string';

const ROUTES = {
	STUDENT: "/student",
	COURSES: "/courses"
};

class StudentRepo {
	
	fetchUnratedCourse(payload : any) {
		const URL = `${ROUTES.STUDENT}/${payload.student_id}/rate_course`
		return api.get(URL);
	}

	sendCourseRate(payload : any) {
		const URL = `${ROUTES.STUDENT}/${payload.student_id}/rate_course`
		return api.post(URL , payload.data);
	}

	fetchStudentsFinishedCourses(payload : any) {
		const URL = `${ROUTES.STUDENT}s/${payload.student_id}/complete_course`
		return api.get(URL);
	}

	fetchStudentsUnattendedCourses(payload : any) {
		const query = queryString.stringify(payload, {skipNull: true});
		const URL = `${ROUTES.STUDENT}/courses?${query}`
		return api.get(URL);
	}

	fetchStudentsCourseInfo(payload : any) {
		const URL = `${ROUTES.STUDENT}/courses/${payload.course_id}`
		return api.get(URL);
	}

	fetchStudentsCurrentCourses(payload : any) {
		const URL = `${ROUTES.STUDENT}s/${payload.student_id}/course`
		return api.get(URL);
	}

	fetchCourseInfo(payload : any) {
		const URL = `${ROUTES.COURSES}/${payload.course_id}`
		return api.get(URL);
	}

	requestCourse(payload : any) {
		const URL = `${ROUTES.STUDENT}/request_course/${payload.course_id}`
		return api.post(URL , {comment : payload.comment });
	}
}

export const studentRepo = new StudentRepo();
