import {AuthService} from "./AuthService";

export class SemesterService {
    addSemester (semesterName) {
        return AuthService.apiPost("semester/add/", {name : semesterName})
    }

    activateSemester (semesterId, semesterActivate) {
        return AuthService.apiPut("semester/activate/"+semesterId, {isActive : semesterActivate})
    }

    listSemesters () {
        return AuthService.apiGet('semester/')
    }

    selectCoursesForSemester (semesterId, selectedCourses) {
        return AuthService.apiPut("semester/select_courses/"+semesterId, {selectedCourseIds : selectedCourses})
    }

}