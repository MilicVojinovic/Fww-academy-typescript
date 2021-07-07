import { studentRepo } from "./student.repo";

class StudentService {
	fetchUnratedCourse(payload) {
		return studentRepo.fetchUnratedCourse(payload);
	}

	sendCourseRate(payload) {
		return studentRepo.sendCourseRate(payload);
	}

	fetchStudentsFinishedCourses(payload) {
		return studentRepo.fetchStudentsFinishedCourses(payload);
	}

	fetchStudentsUnattendedCourses(payload) {
		return studentRepo.fetchStudentsUnattendedCourses(payload);
	}

	fetchStudentsCurrentCourses(payload) {
		return studentRepo.fetchStudentsCurrentCourses(payload);
	}

	fetchStudentsCourseInfo(payload) {
		return studentRepo.fetchStudentsCourseInfo(payload);
	}

	fetchCourseInfo(payload) {
		return studentRepo.fetchCourseInfo(payload);
	}

	requestCourse(payload) {
		return studentRepo.requestCourse(payload);
	}
}

export const studentService = new StudentService();
