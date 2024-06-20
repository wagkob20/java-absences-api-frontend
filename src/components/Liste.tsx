import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ListEntry from './ListEntry';
import Header from './Header';
import { AuthContext } from '../logic/AuthContext';

interface Student {
    id: number;
    fullName: string;
    totalAbsenceHours: number;
}

const Liste = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/absences/summary');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching the students data:', error);
            }
        };

        fetchStudents();



    }, []);

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center" style={{ maxWidth: '60%', margin: '20px auto' }}>
                    <div className="col">
                        <h3>Platzierung</h3>
                    </div>
                    <div className="col">
                        <h3>Name</h3>
                    </div>
                    <div className="col">
                        <h3>Fehlstunden</h3>
                    </div>
                </div>

                {students.sort((a, b) => b.totalAbsenceHours - a.totalAbsenceHours)
                    .map((s, index) => (
                        <ListEntry key={s.id} index={index} student={s} />
                    ))}
            </div>
        </div>
    );
};

export default Liste;
