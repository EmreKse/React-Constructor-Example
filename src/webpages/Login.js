import React, { useState } from 'react';
import {AuthService} from "../service/AuthService";


export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const authService = new AuthService()

    const handleSubmit = async e => {
        e.preventDefault();
        const user = await authService.loginUser({username, password});
        authService.setUser(user)
        authService.setToken(user.accessToken)
        window.location = '/'
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

