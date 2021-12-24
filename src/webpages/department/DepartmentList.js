import React, { useState, useEffect } from 'react';
import { FacultyService } from '../../service/FacultyService';
import { UserService } from '../../service/UserService';
import { DepartmentService } from '../../service/DepartmentService';

import { Form, Button, Select, notification, Table, Modal } from 'antd';
import AddCourse from './AddCourse';

export default function DepartmentList() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(0);

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [facultyList, setFacultyList] = useState([]);
    const [faculties, setFaculties] = useState([]);

    const [users, setUsers] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
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

    const [isModalVisible, setIsModalVisible] = useState(false);

    function showModal(data,e) {
        e.preventDefault();
        setIsModalVisible(true);

        console.log(data);

        let facultyId = (data.facultyId);
        setSelectedFaculty(facultyId);

        let departmentId = (data.id);
        setSelectedDepartment(departmentId);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    useEffect(() => {
        console.log(selectedFaculty);
        userService.getFacultyUsers(selectedFaculty).then(
            (data) => {

                let list = data.map(function (item) {
                    return { name: item.username, id: item.id };
                });

                setInstructors(list);
            },
            (error) => {
                setIsLoaded(isLoaded + 1);
                setError(error);
            }
        );
    }, [selectedFaculty])



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

    const addInstructor = (e) => {
        setIsModalVisible(false);
        departmentService.addInstructorToDepartment(selectedDepartment, selectedInstructor)
            .then((data) => {
                setIsLoaded(isLoaded + 1);
                notification.open({
                    message: 'Successfull',
                    description:
                        'Instructor Added',
                });
            },
                (error) => {
                    setIsLoaded(isLoaded + 1);
                    setError(error);
                }
            );
    }

    const columns = [
        {
            title: 'Department Name',
            dataIndex: 'name',
            key: 'id',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Faculty Name',
            dataIndex: 'facultyName',
            key: 'facultyName',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.facultyName.localeCompare(b.facultyName)
        },
        {
            title: 'Action',
            dataIndex: 'facultyId',
            key: 'id',
            render: (text, record) => (
                <div style={{ "textAlign": "center" }}>
                    <Button type="primary" shape="round" size={"medium"} style={{ "margin": "5px" }} onClick={showModal.bind(this,record)}>
                        Add Instructor
                    </Button>
                    <Button type="primary" shape="round" size={"medium"} danger>
                        Delete
                    </Button>
                    <AddCourse departmentId={record.id} />
                </div>
            ),
        },
    ];

    return (
        <>
            <Modal title="Add Instructor" visible={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type='primary' onClick={addInstructor}>Add Instructor</Button>
                ]}
            >
                <Form style={{ "width": "400px", "margin": "20px auto" }} {...layout} form={form} name="control-ref" onFinish={addInstructor}>
                    <Form.Item
                        name='member'
                        label='Instructor Name: '
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            value={selectedInstructor}
                            placeholder='Select a Instructor'
                            onChange={(value) => {
                                setSelectedInstructor(value);
                            }}
                        >
                            {instructors.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <div style={{ "width": "800px", "margin": "auto" }}>
                <Table columns={columns} dataSource={departments} />
            </div>
        </>
    )
}

