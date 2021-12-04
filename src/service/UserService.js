import {AuthService} from "./AuthService";

export class UserService {
    getAllUsers () {
        return AuthService.apiGet("user/all/")
    }
}
