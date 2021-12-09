import './Faculty.css';
import React, { useState, useEffect } from 'react';
import { FacultyService } from "../service/FacultyService";
import { UserService } from "../service/UserService";

import { Select } from 'antd';

const Faculty = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [facultyList, setFacultyList] = useState([]);
    const [faculties, setFaculties] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    const userService = new UserService();
    const facultyService = new FacultyService();

    const { Option } = Select;


    useEffect(() => {
        facultyService.getFaculties().then(
            (data) => {
                setIsLoaded(true);
                setFaculties(data);

                let facultyList = data.map(function (item) {
                    return { name: item.name, id: item.id };
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
                })

                setUsers(userList);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );

    }, [])

    const assignDean = (e) => {
        facultyService.assignDean(selectedFaculty, selectedUser).then(
            (data) => {
                console.log(data)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div id="container">
                <h2>Faculties</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Faculty Name</th>
                                <th>Dean</th>
                                <th>Selection</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map(faculty => (
                                <tr>
                                    <td key={faculty.id}>
                                        {faculty.name}
                                    </td>
                                    <td></td>
                                    <td>
                                        <button>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="addFac">

                    <label htmlFor="facName">Faculty Name :</label>
                    <Select
                        value={selectedFaculty}
                        style={{ width: 200 }}
                        placeholder="Select a Faculty"
                        onChange={value => {
                            setSelectedFaculty(value);
                            console.log(value);
                          }}
                    >
                        {facultyList.map((faculty) => (
                            <Option key={faculty.id} value={faculty.id}>
                                {faculty.name}
                            </Option>
                        ))}
                    </Select>

                    <label htmlFor="deanName">Dean Name :</label>
                    <Select
                        value={selectedUser}
                        style={{ width: 200 }}
                        placeholder="Select a Dean"
                        onChange={value => {
                            setSelectedUser(value);
                            console.log(value);
                          }}
                    >
                        {users.map((user) => (
                            <Option key={user.id} value={user.id}>
                                {user.name}
                            </Option>
                        ))}
                    </Select>

                    <button onClick={assignDean}>Assign Dean</button>

                </div>

            </div>
        );
    }
}
export default Faculty;
