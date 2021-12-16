import React, { useState, useEffect } from 'react';
import { FacultyService } from '../../service/FacultyService';
import { UserService } from '../../service/UserService';
import { DepartmentService } from '../../service/DepartmentService';

import { Form, Input, Button, Select, notification, Layout, Table, Modal } from 'antd';

export default function Department() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [facultyList, setFacultyList] = useState([]);
    const [faculties, setFaculties] = useState([]);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departments, setDepartments] = useState([]);

    const departmentService = new DepartmentService();
    const userService = new UserService();
    const facultyService = new FacultyService();

    const { Header, Footer, Sider, Content } = Layout;

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

    const showModal = (e) => {
        setIsModalVisible(true);
        let facultyId = (e.currentTarget.value);
        setSelectedFaculty(facultyId);

        userService.getFacultyUsers(selectedFaculty).then(
            (data) => {
                setIsLoaded(true);

                let list = data.map(function (item) {
                    return { name: item.username, id: item.id };
                });

                setInstructors(list);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

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

        departmentService.getAllDepartments().then(
            (data) => {
                setIsLoaded(true);

                let departments = data.map(function (item) {
                    return { name: item.name, id: item.id, facultyName: item.facultyName, facultyId: item.facultyId };
                });

                setDepartments(departments);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )

    }, []);

    const addDepartment = (e) => {
        departmentService.addDepartment(e.departmentName, selectedFaculty)
            .then((data) => {
                console.log(data);
                notification.open({
                    message: 'Successfull',
                    description:
                        'Department Added',
                });
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    const addInstructor = (e) => {
        setIsModalVisible(false);
        departmentService.addInstructorToDepartment(selectedDepartment,selectedInstructor)
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
            key: 'facultyId',
            render: (dataIndex) => (
                <div style={{ "textAlign": "center" }}>
                    <Button type="primary" shape="round" size={"medium"} style={{ "marginRight": "5px" }} onClick={showModal} value={dataIndex}>
                        Add Instructor
                    </Button>
                    <Button type="primary" shape="round" size={"medium"} danger>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <Content>

                <Form style={{ "width": "400px", "margin": "20px auto" }} {...layout} name="control-ref" onFinish={addDepartment}>
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
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Add Department
                        </Button>
                    </Form.Item>
                </Form>

                <Modal title="Add Instructor" visible={isModalVisible} onCancel={handleCancel}
                 footer = {[
                     <Button key="back" onClick={handleCancel}>Cancel</Button>,
                     <Button key="submit" type='primary' onClick={addInstructor}>Add Instructor</Button>
                 ]}
                 >
                    <Form style={{ "width": "400px", "margin": "20px auto" }} {...layout} name="control-ref" onFinish={addInstructor}>
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
                            {instructors.map((item) => (
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
            </Content>
        </Layout>
    )
}

