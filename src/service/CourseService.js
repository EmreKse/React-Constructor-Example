import {AuthService} from "./AuthService";

export class CourseService {

    listCourseRequests () {
        return AuthService.apiGet('admin/course_request')
    }

    approveCourse (courseId, answer, adminId) {
        return AuthService.apiPut('admin/course_request/'+ courseId, {approve: answer , approvedOrRejectedById: adminId})
    }

    assignInstructorToCourse (courseId, instructor) {
        return AuthService.apiPut('course/assign/'+ courseId, {instructorId: instructor})
    }
}
