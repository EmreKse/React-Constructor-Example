import React, { useState, useEffect } from 'react';
import { FacultyService } from '../../service/FacultyService';
import { UserService } from '../../service/UserService';
import { DepartmentService } from '../../service/DepartmentService';

import { Form, Input, Button, Select, notification } from 'antd';

export default function AddDepartment() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(0);

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [facultyList, setFacultyList] = useState([]);
    const [faculties, setFaculties] = useState([]);

    const [users, setUsers] = useState([]);

    const [departments, setDepartments] = useState([]);

    const departmentService = new DepartmentService();
    const userService = new UserService();
    const facultyService = new FacultyService();

    const [form] = Form.useForm();
    const { Option } = Select;
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(() => {
        facultyService.getFaculties().then(
            (data) => {
                setFaculties(data);

                let facultyList = data.map(function (item) {
                    return { name: item.name, id: item.id, deanUserId: item.deanUserId };
                });

                setFacultyList(facultyList);
            },
            (error) => {
                setIsLoaded(isLoaded + 1);
                setError(error);
            }
        );

        userService.getAllUsers().then(
            (data) => {
                let userList = data.map(function (item) {
                    return { name: item.username, id: item.id };
                });

                setUsers(userList);
            },
            (error) => {
                setIsLoaded(isLoaded + 1);
                setError(error);
            }
        );

        departmentService.getAllDepartments().then(
            (data) => {
                let departments = data.map(function (item) {
                    return { name: item.name, id: item.id, facultyName: item.facultyName, facultyId: item.facultyId };
                });

                setDepartments(departments);
            },
            (error) => {
                setIsLoaded(isLoaded + 1);
                setError(error);
            }
        )

    }, [isLoaded]);

    const addDepartment = (e) => {
        departmentService.addDepartment(e.departmentName, selectedFaculty)
            .then((data) => {
                notification.open({
                    message: 'Successfull',
                    description:
                        'Department Added',
                });
            },
                (error) => {
                    setError(error);
                }
            );
        setIsLoaded(isLoaded + 1);
    }


    return (
        <Form style={{ "width": "400px", "margin": "20px auto" }} {...layout} form={form} name="control-ref" onFinish={addDepartment}>
            <h2>Add Department</h2>
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
                    placeholder='Select a Faculty'
                    onChange={(value) => {
                        setSelectedFaculty(value);
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
                name='departmentName'
                label='Department Name: '
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item style={{'display':'flex', 'justifyContent':'flex-end'}}>
                <Button type='primary' htmlType='submit' onClick={form.resetFields()}>
                    Add Department
                </Button>
            </Form.Item>
        </Form>
    )
}
