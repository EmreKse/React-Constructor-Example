import {AuthService} from "./AuthService";

export class DepartmentService {

    getAllDepartments () {
        return AuthService.apiGet("department/")
    }

    getDepartmentsByFaculty (facultyId) {
        return AuthService.apiGet("department/faculty=" + facultyId)
    }

    addDepartment (departmentName, faculty_Id) {
        return AuthService.apiPost("department/",{name: departmentName, facultyId : faculty_Id})
    }

    deleteDepartment(departmentId) {
        return AuthService.apiDelete("department/" + departmentId)
    }

}

