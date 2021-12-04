import React, { useState, useEffect }  from 'react';
import {UserService} from "../service/UserService";
const User = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const userService = new UserService()
    useEffect(() => {
        userService.getAllUsers().then(
            (data) => {
                setIsLoaded(true);
                setUsers(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <h1>Users</h1>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.username + ' ' + user.email}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default User;
