import React, { useState, useEffect }  from 'react';
import {FacultyService} from "../service/FacultyService";
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
            <div>
                <h1>Faculties</h1>
                <ul>
                    {faculties.map(faculty => (
                        <li key={faculty.id}>
                            {faculty.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Faculty;
