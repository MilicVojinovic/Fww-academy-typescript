import { studentRepo } from "./student.repo";

class StudentService {
	fetchUnratedCourse(payload : any) {
		return studentRepo.fetchUnratedCourse(payload);
	}

	sendCourseRate(payload : any) {
		return studentRepo.sendCourseRate(payload);
	}

	fetchStudentsFinishedCourses(payload : any) {
		return studentRepo.fetchStudentsFinishedCourses(payload);
	}

	fetchStudentsUnattendedCourses(payload : any) {
		return studentRepo.fetchStudentsUnattendedCourses(payload);
	}

	fetchStudentsCurrentCourses(payload : any) {
		return studentRepo.fetchStudentsCurrentCourses(payload);
	}

	fetchStudentsCourseInfo(payload : any) {
		return studentRepo.fetchStudentsCourseInfo(payload);
	}

	fetchCourseInfo(payload : any) {
		return studentRepo.fetchCourseInfo(payload);
	}

	requestCourse(payload : any) {
		return studentRepo.requestCourse(payload);
	}
}

export const studentService = new StudentService();
