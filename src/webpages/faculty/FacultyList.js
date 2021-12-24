import React, { useState, useEffect } from 'react';
import { FacultyService } from '../../service/FacultyService';
import { UserService } from '../../service/UserService';
import { DepartmentService } from '../../service/DepartmentService';
import AssignDean from './AssignDean';
import AssignInstructor from './AssignInstructor';

import { Form, Input, Button, Select, notification } from 'antd';

export default function FacultyList() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(0);

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [facultyList, setFacultyList] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    const departmentService = new DepartmentService();
    const userService = new UserService();
    const facultyService = new FacultyService();

    useEffect(() => {
        facultyService.getFaculties().then(
            (data) => {
                setIsLoaded(true);

                let facultyList = data.map(function (item) {
                    return { name: item.name, id: item.id, deanUserId: item.deanUserId };
                });

                setFacultyList(facultyList);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );

        userService.getAllUsers().then(
            (data) => {
                setIsLoaded(true);

                let userList = data.map(function (item) {
                    return { name: item.username, id: item.id };
                });

                setUsers(userList);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }, [isLoaded]);

    const deleteFaculty = (e) => {
        setIsLoaded(isLoaded + 1);
        console.log(e.currentTarget.value);
        facultyService.deleteFaculty(e.currentTarget.value).then(
            (data) => {
                notification.open({
                    message: 'Successfull',
                    description:
                        'Faculty Deleted',
                });
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Faculty Name</th>
                        <th>Dean</th>
                    </tr>
                </thead>
                <tbody>
                    {facultyList.map((faculty) => (
                        <tr key={faculty.id}>
                            <td>
                                <AssignDean facultyId = {faculty.id} />
                                <Button type='primary' shape='round' size='small'
                                    value={faculty.id} onClick={deleteFaculty} style={{margin:'3px'}}
                                    danger>
                                    Delete
                                </Button>
                                <AssignInstructor facultyId = {faculty.id} />
                            </td>
                            <td>{faculty.name}</td>
                            {users.map((user) => {
                                if (user.id === faculty.deanUserId) {
                                    return <td key={user.id}>{user.name}</td>;
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

