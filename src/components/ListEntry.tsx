import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Student {
    id: number;
    fullName: string;
    totalAbsenceHours: number;
}

interface ListEntryProps {
    student: Student;
    index: number;
}

const ListEntry: React.FC<ListEntryProps> = ({ student, index }) => {
    const getMedal = (index: number) => {
        switch (index) {
            case 0:
                return '🥇';
            case 1:
                return '🥈';
            case 2:
                return '🥉';
            default:
                return index + 1;
        }
    };

    return (
        <div className="list-entry-container" style={{ maxWidth: '60%', margin: '20px auto' }}>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <p>{getMedal(index)}</p>
                        </div>
                        <div className="col">
                            <p>{student.fullName}</p>
                        </div>
                        <div className="col">
                            <p>{student.totalAbsenceHours}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListEntry;
