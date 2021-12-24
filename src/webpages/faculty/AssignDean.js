import './Faculty.css';
import React, { useState, useEffect } from 'react';
import { FacultyService } from '../../service/FacultyService';
import { UserService } from '../../service/UserService';

import { Form, Button, Select, notification, Modal } from 'antd';

export default function AssignDean(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(0);

    const [facultyList, setFacultyList] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    const userService = new UserService();
    const facultyService = new FacultyService();

    const { Option } = Select;

    const [isModalVisible, setIsModalVisible] = useState(false);

    function showModal() {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

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

    const assignDean = (e) => {
        facultyService.assignDean(props.facultyId, selectedUser).then(
            (data) => {
                setIsLoaded(isLoaded + 1);
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
        setIsLoaded(isLoaded + 1);
        setIsModalVisible(false);
    };

    return (
        <>

            <Button type='primary' shape='round' size='small'
                value={props.facultyId} onClick={showModal}
            >
                Assign Dean
            </Button>

            <Modal title="Assign Dean" visible={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type='primary' onClick={assignDean}>Assign</Button>
                ]}
            >
                <Form>

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

                </Form>
            </Modal>

        </>
    )
}

