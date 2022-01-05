import React, { useState, useEffect } from 'react';
import { Input, Select, Form, Button, notification, Modal } from 'antd';
import { SemesterService } from '../../service/SemesterService';

export default function ActivateSemester() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(0);

    const [semesterList, setSemesterList] = useState ([]);
    const [activeSemester, setActiveSemester] = useState(1);
    
    const semesterService = new SemesterService();

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
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    function showModal() {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    useEffect(() => {
        semesterService.listSemesters().then(
            (data) => {

                let semesterList = data.map(function (item) {
                    return { name: item.name, id: item.id, active : item.isActive };
                });

                setSemesterList(semesterList);
                console.log(semesterList);
            },
            (error) => {
                setIsLoaded(isLoaded+1);
                setError(error);
            }
        );
    },[isLoaded])

    const activateSemester = (e) => {
        semesterService.activateSemester(activeSemester, true).then(
            (data) => {
                setIsLoaded(isLoaded + 1);
                notification.open({
                    message: 'Successfull',
                    description:
                        'Active Semester Changed',
                });
            },
            (error) => {
                setIsLoaded(isLoaded + 1);
                setError(error);
            }
        );
        setIsModalVisible(false);
    };



    return (
        <>
            <Button type='primary'  size='medium' onClick={showModal}>
                Change Active Semester
            </Button>

            <Modal title="Change Active Semester" visible={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type='primary' onClick={activateSemester}>Activate</Button>
                ]}
            >
                <Form>

                    <Form.Item
                        name='activeSemester'
                        label='Semester Name'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            value={activeSemester}
                            style={{ width: 200, marginTop: 0, marginBottom: 5 }}
                            placeholder='Activate a Semester'
                            onChange={(value) => {
                                setActiveSemester(value);
                            }}
                        >
                            {semesterList.map((semester) => (
                                <Option key={semester.id} value={semester.id}>
                                    {semester.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>

        </>
    )
}

