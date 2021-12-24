import React from 'react';

import { Layout } from 'antd';
import AddDepartment from './AddDepartment';
import DepartmentList from './DepartmentList';

export default function Department() {

    const { Content } = Layout;

    return (
        <Layout>
            <Content>
                <AddDepartment/>
                <DepartmentList/>
            </Content>
        </Layout>
    )
}

