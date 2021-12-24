import './Faculty.css';
import React, { useState } from 'react';
import { FacultyService } from '../../service/FacultyService';

import { Form, Input, Button, notification, Modal } from 'antd';

export default function AddFaculty() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(0);

    const facultyService = new FacultyService();

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

    const addFaculty = (e) => {
        setIsLoaded(isLoaded + 1);
        setIsModalVisible(false);
        facultyService.addFaculty(e.facultyName).then(
            (data) => {
                console.log(data)
                if (data != null) {
                    notification.open({
                        message: 'Successfull',
                        description: data.message,
                    })
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    };

    return (
        <>
            <Button type='primary' onClick={showModal}>Add Faculty</Button>

            <Modal title="Add Faculty" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                <Form style={{ "width": "400px", "margin": "20px auto" }} {...layout} form={form} name="control-ref" onFinish={addFaculty}>
                    <Form.Item
                        name='facultyName'
                        label='Faculty Name'
                        rules={[
                            {
                                required: true,
                                message: 'Fakülte ismi boş bırakılamaz'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button style={{ 'marginRight': '5px' }} key="back" onClick={handleCancel}>Cancel</Button>
                        <Button htmlType="submit" type='primary'>Add Faculty</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
