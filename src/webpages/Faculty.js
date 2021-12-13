import './Faculty.css';
import React, { useState, useEffect } from 'react';
import { FacultyService } from '../service/FacultyService';
import { UserService } from '../service/UserService';
import { DepartmentService } from '../service/DepartmentService';

import { Form, Input, Button, Select, notification } from 'antd';


const Faculty = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [facultyList, setFacultyList] = useState([]);
    const [faculties, setFaculties] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    const departmentService = new DepartmentService();
    const userService = new UserService();
    const facultyService = new FacultyService();

    const { Option } = Select;
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    useEffect(() => {
        facultyService.getFaculties().then(
            (data) => {
                setIsLoaded(true);
                setFaculties(data);

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
    }, []);

    const assignDean = (e) => {
        facultyService.assignDean(selectedFaculty, selectedUser).then(
            (data) => {
                console.log(data);
                notification.open({
                    message: 'Successfull',
                    description:
                        'Dean Assigned',
                });
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    };

    const getDepartmentsByFaculty = (e) => {
        var facultyId = e.currentTarget.value;
        departmentService.getDepartmentsByFaculty(facultyId).then(
            (data) => {
                console.log(data);
                var path = "/department/" + (facultyId);

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    const addFaculty = (e) => {
        facultyService.addFaculty(e.facultyName).then(
            (data) => {
                console.log(data);
                notification.open({
                    message: 'Successfull',
                    description:
                        'Faculty Added',
                });
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    };

    const deleteFaculty = (e) => {
        console.log(e.currentTarget.value);
        facultyService.deleteFaculty(e.currentTarget.value).then(
            (data) => {
                console.log(data);
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div id='container'>
                <h2>Faculties</h2>
                <div>
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
                                        <Button type='primary' shape='round' size='small'
                                            style={{ marginRight: 5 + 'px' }}
                                            value={faculty.id}
                                            onClick={getDepartmentsByFaculty}>Departments
                                        </Button>
                                        <Button type='primary' shape='round' size='small'
                                            value={faculty.id} onClick={deleteFaculty}
                                            danger>
                                            Delete
                                        </Button>
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
                </div>
                <div id='adding'>
                    <Form {...layout} name='control-ref' onFinish={addFaculty}>
                        <Form.Item
                            name='facultyName'
                            label='Faculty Name'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type='primary' htmlType='submit'>
                                Add Faculty
                            </Button>
                        </Form.Item>
                    </Form>

                    <Form>
                        <Form.Item
                            name='facName'
                            label='Faculty Name: '
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                value={selectedFaculty}
                                style={{ width: 200, marginTop: 0, marginBottom: 5 }}
                                placeholder='Select a Faculty'
                                onChange={(value) => {
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
                        </Form.Item>
                        <Form.Item
                            name='deanName'
                            label='Dean Name'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                value={selectedUser}
                                style={{ width: 200, marginTop: 0, marginBottom: 5 }}
                                placeholder='Select a Dean'
                                onChange={(value) => {
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
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={assignDean} type='primary' htmlType='submit'>
                                Assign Dean
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
};
export default Faculty;
