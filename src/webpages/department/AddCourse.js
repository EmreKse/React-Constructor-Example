import React, { useState, useEffect } from 'react';
import { DepartmentService } from '../../service/DepartmentService';

import { Form, Button, notification, Modal, Input } from 'antd';

function AddCourse(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(0);

    const departmentService = new DepartmentService();

    const [form] = Form.useForm();
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

    const addCourse = (e) => {
        setIsModalVisible(false);
        departmentService.addCourseToDepartment(props.departmentId, e.courseName)
            .then((data) => {
                setIsLoaded(isLoaded + 1);
                notification.open({
                    message: 'Successfull',
                    description:
                        'Course Request Sent',
                });
            },
                (error) => {
                    setIsLoaded(isLoaded + 1);
                    setError(error);
                }
            );
    }

    return (
        <>
            <Button type='primary' shape="round" size={"medium"} onClick={showModal}>Send Course Request</Button>

            <Modal title="Add Course" visible={isModalVisible} onCancel={handleCancel} footer={[]} >
                <Form style={{ "width": "400px", "margin": "20px auto" }} {...layout} form={form} name="control-ref" onFinish={addCourse}>
                    <Form.Item
                        name='courseName'
                        label='Course Name'
                        rules={[
                            {
                                required: true,
                                message: 'Ders ismi boş bırakılamaz'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button style={{ 'marginRight': '5px' }} key="back" onClick={handleCancel}>Cancel</Button>
                        <Button htmlType="submit" type='primary'>Send Request</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddCourse
