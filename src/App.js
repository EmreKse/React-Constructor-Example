import './App.css';
import 'antd/dist/antd.css';
import Webpages from './webpages/Webpages';
import React  from 'react';
import Login from "./webpages/Login";
import {AuthService} from "./service/AuthService";
import { Button } from 'antd';

function App() {
    const authService = new AuthService()
    if(!authService.getToken()) {
        return <Login/>
    }
    return (
        <div className="App">
            <div style={{display: "flex", justifyContent: "flex-end", marginTop:"0.5em", marginRight:"2em"}}>
                <Button type="submit" style={{marginRight:"0.5em"}} onClick={() => {window.location = '/';}}>Home</Button>
                <Button type="submit" onClick={() => {authService.logoutUser(); window.location = '/';}} danger>Logout</Button>
            </div>
            <Webpages />
        </div>
    );
}

export default App;
