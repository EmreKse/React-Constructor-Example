import React from 'react';
import { Layout } from 'antd';
import AddSemester from './AddSemester';
import ActivateSemester from './ActivateSemester';
import SelectCourses from './SelectCourses';

export default function Semester() {
    const { Content } = Layout;

    return (
        <Layout>
            <Content style={{'display':'flex','justify-content':'space-evenly'}}>
                <AddSemester/>
                <ActivateSemester/>
                <SelectCourses/>
            </Content>
        </Layout>
    )
}
