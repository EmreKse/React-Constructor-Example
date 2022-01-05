import React, { useState } from 'react';
import { SemesterService } from '../../service/SemesterService';

import { Form, Input, Button, notification, Modal } from 'antd';

export default function AddSemester() {

    const [error, setError] = useState(null);

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

    const AddSemester = (e) => {
        setIsModalVisible(false);
        SemesterService.addSemester(e.semesterName).then(
            (data) => {
                console.log(data)
                if (data != null) {
                    notification.open({
                        message: 'Successfull',
                        description: 'Semester Added',
                    })
                }
            },
            (error) => {
                setError(error);
            }
        )
    }


    return (
        <>
            <Button type='primary' onClick={showModal}>Add Semester</Button>

            <Modal title="Add Semester" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                <Form style={{ "width": "400px", "margin": "20px auto" }} {...layout} form={form} name="control-ref" onFinish={AddSemester}>
                    <Form.Item
                        name='semesterName'
                        label='Semester Name'
                        rules={[
                            {
                                required: true,
                                message: 'Sömestr ismi boş bırakılamaz'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button style={{ 'marginRight': '5px' }} key="back" onClick={handleCancel}>Cancel</Button>
                        <Button htmlType="submit" type='primary' onClick={form.resetFields()}>Add Semester</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

