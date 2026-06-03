import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {

    const [complaints, setComplaints] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {

        fetchComplaints();

    }, []);

    const fetchComplaints = async () => {

        const response = await axios.get(
            'http://localhost:8080/api/complaints'
        );

        setComplaints(response.data);
    };
    const searchComplaints = async () => {

    try {

        const response = await axios.get(

            `http://localhost:8080/api/complaints/search/${keyword}`

        );

        setComplaints(response.data);

    } catch(error) {

        console.log(error);
    }
};

    const updateStatus = async (id, status) => {

        try {

            await axios.put(
                `http://localhost:8080/api/complaints/${id}`,
                {
                    status: status
                }
            );

            alert('Status Updated');

            fetchComplaints();

        } catch(error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                width:'90%',
                margin:'30px auto'
            }}
        >

            <h2>Admin Complaint Dashboard</h2>
            <div
    style={{
        marginBottom:'20px'
    }}
>

    <input

        type='text'

        placeholder='Search Complaint Title'

        value={keyword}

        onChange={(e) =>
            setKeyword(e.target.value)
        }

        style={{
            padding:'10px',
            width:'300px'
        }}
    />

    <button

        onClick={searchComplaints}

        style={{
            marginLeft:'10px'
        }}
    >

        Search

    </button>

    <button

        onClick={fetchComplaints}

        style={{
            marginLeft:'10px'
        }}
    >

        Reset

    </button>

</div>

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
                        <th>Update</th>

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

                                <td>

                                    <select

                                        onChange={(e) =>
                                            updateStatus(
                                                complaint.id,
                                                e.target.value
                                            )
                                        }

                                    >

                                        <option>
                                            Select
                                        </option>

                                        <option value="PENDING">
                                            PENDING
                                        </option>

                                        <option value="IN_PROGRESS">
                                            IN_PROGRESS
                                        </option>

                                        <option value="RESOLVED">
                                            RESOLVED
                                        </option>

                                    </select>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default AdminDashboard;