import React from 'react';
import {
    BrowserRouter as Router,
    Route, Routes
} from "react-router-dom";
import Home from './Home';
import User from './User';
import Faculty from "./faculty/Faculty";
import Department from './department/Department';
import Course from './course/Course';
import Semester from './semester/Semester';

const Webpages = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element= {<Home />} />
                <Route path = "/user" element = {<User />} />
                <Route path = "/faculty" element = {<Faculty />} />
                <Route path = "/department" element = {<Department />} />
                <Route path = "/course" element = {<Course/>} />
                <Route path = "/semester" element = {<Semester/>} />
            </Routes>
        </Router>

    );
};
export default Webpages;
