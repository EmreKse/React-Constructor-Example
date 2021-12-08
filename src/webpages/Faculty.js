import './Faculty.css';
import React, { useState, useEffect } from 'react';
import { FacultyService } from "../service/FacultyService";
const Faculty = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [faculties, setFaculties] = useState([]);
    const facultyService = new FacultyService()
    useEffect(() => {
        facultyService.getFaculties().then(
            (data) => {
                setIsLoaded(true);
                setFaculties(data);
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
            <div id="container">
                <h2>Faculties</h2>
                <div id="addFac">
                    <label htmlfor="facName">Faculty Name: </label>
                    <input type="text" id="facName" placeholder="Faculty Name" />
                    <label htmlfor="deanName">Dean Name: </label>
                    <input type="text" id="deanName" placeholder="Dean Name" />
                    <button>Add Faculty</button>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Faculty Name</th>
                                <th>Dean</th>
                                <th>Selection</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map(faculty => (
                                <tr>
                                    <td key={faculty.id}>
                                        {faculty.name}
                                    </td>
                                    <td key={faculty.id}>
                                        {faculty.dean}
                                    </td>
                                    <td>
                                        <button>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}
export default Faculty;
