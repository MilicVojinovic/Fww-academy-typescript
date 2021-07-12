import { teacherRepo } from "./teacher.repo";

class TeacherService {

	fetchAllTeachers() {
		return teacherRepo.fetchAllTeachers();
	}

	fetchTeacherData(payload : any) {
		return teacherRepo.fetchTeacherData(payload);
	}

	fetchTeacherCourses(payload : any) {
		return teacherRepo.fetchTeacherCourses(payload);
	}

	createCourse(payload : any) {
		return teacherRepo.createCourse(payload);
	}

	editCourse(payload : any) {
		return teacherRepo.editCourse(payload);
	}

	deleteCourse(payload : any) {
		return teacherRepo.deleteCourse(payload);
	}

	fetchTeacherStudents(payload : any) {
		return teacherRepo.fetchTeacherStudents(payload);
	}

	assignCourse(payload : any) {
		return teacherRepo.assignCourse(payload);
	}

	setCourseCompleted(payload : any) {
		return teacherRepo.setCourseCompleted(payload);
	}

	fetchTeacherRequestCourses() {
		return teacherRepo.fetchTeacherRequestCourses();
	}

	setCourseAccepted(payload : any) {
		return teacherRepo.setCourseAccepted(payload);
	}
}

export const teacherService = new TeacherService();
