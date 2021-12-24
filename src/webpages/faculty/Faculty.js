import './Faculty.css';
import React, { useState } from 'react';

import { Form, Input, Button, Select, notification } from 'antd';
import FacultyList from './FacultyList';
import AddFaculty from './AddFaculty';
import AssignDean from './AssignDean';
import AssignInstructor from './AssignInstructor';


const Faculty = () => {
    const [error, setError] = useState(null);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div id='container'>
                <h2>Faculties</h2>
                <div>
                    <FacultyList />
                </div>
                <div id='adding'>
                    <AddFaculty/>
                </div>
            </div>
        );
    }
};
export default Faculty;
