import {AuthService} from "./AuthService";

export class FacultyService {
    getFaculties () {
        return AuthService.apiGet("faculty/")
    }

    assignDean (facultyId, userId) {
        return AuthService.apiPut("faculty/" + facultyId + "/assignDean/", {deanId: userId})
    }

    addFaculty (facultyName) {
        return AuthService.apiPost("faculty/",{name: facultyName})
    }

    deleteFaculty (facultyId) {
        console.log(facultyId);
        return AuthService.apiDelete("faculty/" + facultyId)
    }
}
