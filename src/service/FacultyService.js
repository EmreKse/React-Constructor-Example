import {AuthService} from "./AuthService";

export class FacultyService {
    getFaculties () {
        return AuthService.apiGet("faculty/")
    }

    assignDean (facultyId, userId) {
        return AuthService.apiPut("faculty/" + facultyId + "/assignDean/", {deanId: userId})
    }

    addInstructor (facultyId, userId) {
        return AuthService.apiPut("faculty/" + facultyId + "/add_instructor/", {memberId: userId})
    }

    updateFaculty (facultyId) {
        return AuthService.apiPut("faculty/"+ facultyId)
    }

    addFaculty (facultyName) {
        return AuthService.apiPost("faculty/",{name: facultyName})
    }

    deleteFaculty (facultyId) {
        return AuthService.apiDelete("faculty/" + facultyId)
    }
}
