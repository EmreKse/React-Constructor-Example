import {AuthService} from "./AuthService";

export class FacultyService {
    getFaculties () {
        return AuthService.apiGet("faculty/")
    }
}
