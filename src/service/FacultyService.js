import {AuthService} from "./AuthService";

export class FacultyService {
    getFaculties () {
        return AuthService.apiGet("faculty/")
    }

    assignDean (facultyId, userId) {
        return AuthService.apiPut("faculty/" + facultyId + "/assignDean/", {deanId: userId})
    }
}
