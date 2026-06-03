import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssignOfficer() {

    const [complaints, setComplaints] = useState([]);
    const [officers, setOfficers] = useState([]);

    useEffect(() => {

        fetchComplaints();
        fetchOfficers();

    }, []);

    const fetchComplaints = async () => {

        const response = await axios.get(
            'http://localhost:8080/api/complaints'
        );

        setComplaints(response.data);
    };

    const fetchOfficers = async () => {

        const response = await axios.get(
            'http://localhost:8080/api/users'
        );

        const officerUsers =
            response.data.filter(
                user => user.role === 'OFFICER'
            );

        setOfficers(officerUsers);
    };

    const assignOfficer = async (
        complaintId,
        officerId
    ) => {

        await axios.post(
            'http://localhost:8080/api/assignments',
            {
                complaintId,
                officerId
            }
        );

        alert('Officer Assigned');
    };

    return (

        <div style={{padding:'20px'}}>

            <h2>Assign Officers</h2>

            {
                complaints.map((complaint) => (

                    <div
                        key={complaint.id}
                        style={{
                            border:'1px solid gray',
                            padding:'10px',
                            marginBottom:'10px'
                        }}
                    >

                        <h3>{complaint.title}</h3>

                        {
                            officers.map((officer) => (

                                <button
                                    key={officer.id}
                                    onClick={() =>
                                        assignOfficer(
                                            complaint.id,
                                            officer.id
                                        )
                                    }
                                >
                                    Assign {officer.fullName}
                                </button>
                            ))
                        }

                    </div>
                ))
            }

        </div>
    );
}

export default AssignOfficer;