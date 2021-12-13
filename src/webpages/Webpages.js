import React from 'react';
import {
    BrowserRouter as Router,
    Route, Routes
} from "react-router-dom";
import Home from './Home';
import User from './User';
import Faculty from "./Faculty";
import Department from './Department';

const Webpages = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element= {<Home />} />
                <Route path = "/user" element = {<User />} />
                <Route path = "/faculty" element = {<Faculty />} />
                <Route path = "/department" element = {<Department />} />
            </Routes>
        </Router>

    );
};
export default Webpages;
