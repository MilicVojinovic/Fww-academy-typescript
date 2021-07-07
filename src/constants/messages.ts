class ErrorCodes {
	public ERROR_CODES: object = {
		ERR_BAD_COURSE_ID: 'Kurs ne postoji',
		ERR_BAD_USER_ID: 'Korisnik ne postoji',
		ERR_BAD_USER_ROLE: 'Pogrešna rola korisnika',
		ERR_STUDENT_ALREADY_ENROLLED_IN_COURSE: 'Student je već upisan na ovaj kurs',
		ERR_TOO_MANY_COURSES_FOR_STUDENT: 'Student već pohadja dva kursa',
		ERR_BAD_ROLE_REQUEST: 'Pogrešna rola korisnika',
		ERR_BAD_CREDENTIALS: 'Pogrešan Email ili Lozinka',
		ERR_ROLE_PARAM_REQUIRED: 'Potrebna rola korisnika',
		ERR_BAD_COURSE_FOR_STUDENT: 'Pogrešan kurs za studenta',
		ERR_BAD_COURSE_FOR_TEACHER: 'Pogrešan kurs za profesora',
		ERR_STUDENT_ALREADY_COMPLETED_THE_COURSE: 'Student je već završio ovaj kurs',
		ERR_BAD_SESSION_ID: 'Pogrešan session ID',
		ERR_MISSING_SESSION_ID: 'Nedostaje session ID',
		SESSION_NOT_VALID: 'Sesija nije validna',
		ERR_NO_COURSES_FOR_TEACHER: 'Profesor trenutno nema kurseva',
		ERR_NO_UNMARKED_COURSES: 'Nemate neocenjene kurseve',
		ERR_COURSE_ALREADY_ADDED_TO_TEACHER: 'Profesoru je već dodeljen ovaj kurs',
	};
}

export const errorCodes = new ErrorCodes();

export class SuccesCodes {
	public SUCCESS_CODES: object = {
		COURSE_CREATED: 'Novi kurs je uspešno kreiran',
		COURSE_UPDATED: 'Kurs je uspešno izmenjen',
		COURSE_DELETED: 'Kurs je uspešno obrisan',
		COURSE_ASSIGNED: 'Kurs je uspešno dodat drugom profesoru',
		COURSE_FINISHED: 'Student je položio kurs',
		COURSE_RATED: 'Uspešno ste ocenili kurs',
		THANKS_FOR_APPLICATION: 'Uspešno ste ste se prijavili na kurs.',
		COURSE_STUDENT_ACCEPTED: 'Student je upisan na kurs',
	};
}

export const succesCodes = new SuccesCodes();