import React from 'react';
import {Link} from "react-router-dom";
import { Button } from 'antd';

const Home = () => {
    return(
        <div>
            <h1>Home</h1>
            <Link to={'/user'} >Users</Link>
            <br />
            <Link to={'/faculty'} >Faculties</Link>
            <br />
            <Link to={'/department'}>Departments</Link>
        </div>
    );
}
export default Home;
