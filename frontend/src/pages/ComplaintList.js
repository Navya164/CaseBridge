import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ComplaintList() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        fetchComplaints();

    }, []);

    const fetchComplaints = async () => {

        try {

            const response = await axios.get(
                'http://localhost:8080/api/complaints'
            );

            setComplaints(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                width:'80%',
                margin:'30px auto'
            }}
        >

            <h2>Complaint Dashboard</h2>

            <table
                border="1"
                width="100%"
                cellPadding="10"
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        complaints.map((complaint) => (

                            <tr key={complaint.id}>

                                <td>{complaint.id}</td>

                                <td>{complaint.title}</td>

                                <td>{complaint.description}</td>

                                <td>{complaint.status}</td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default ComplaintList;