import React from 'react';
import {Link} from "react-router-dom";
const Home = () => {
    return(
        <div>
            <h1>Home</h1>
            <Link to={'/user'} >Users</Link>
            <p></p>
            <Link to={'/faculty'} >Faculties</Link>
        </div>
    );
}
export default Home;
