import { teacherRepo } from "./teacher.repo";

class TeacherService {

	fetchAllTeachers() {
		return teacherRepo.fetchAllTeachers();
	}

	fetchTeacherData(payload) {
		return teacherRepo.fetchTeacherData(payload);
	}

	fetchTeacherCourses(payload) {
		return teacherRepo.fetchTeacherCourses(payload);
	}

	createCourse(payload) {
		return teacherRepo.createCourse(payload);
	}

	editCourse(payload) {
		return teacherRepo.editCourse(payload);
	}

	deleteCourse(payload) {
		return teacherRepo.deleteCourse(payload);
	}

	fetchTeacherStudents(payload) {
		return teacherRepo.fetchTeacherStudents(payload);
	}

	assignCourse(payload) {
		return teacherRepo.assignCourse(payload);
	}

	setCourseCompleted(payload) {
		return teacherRepo.setCourseCompleted(payload);
	}

	fetchTeacherRequestCourses() {
		return teacherRepo.fetchTeacherRequestCourses();
	}

	setCourseAccepted(payload) {
		return teacherRepo.setCourseAccepted(payload);
	}
}

export const teacherService = new TeacherService();
