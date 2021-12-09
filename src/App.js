import './App.css';
import 'antd/dist/antd.css';
import Webpages from './webpages/Webpages';
import React  from 'react';
import Login from "./webpages/Login";
import {AuthService} from "./service/AuthService";

function App() {
    const authService = new AuthService()
    if(!authService.getToken()) {
        return <Login/>
    }
    return (
        <div className="App">
            <div style={{display: "flex", justifyContent: "flex-end", marginTop:"0.5em", marginRight:"2em"}}>
                <button type="submit" style={{marginRight:"0.5em"}} onClick={() => {window.location = '/';}}>Home</button>
                <button type="submit" onClick={() => {authService.logoutUser(); window.location = '/';}}>Logout</button>
            </div>
            <Webpages />
        </div>
    );
}

export default App;
