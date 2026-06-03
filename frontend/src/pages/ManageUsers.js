import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        const response = await axios.get(
            'http://localhost:8080/api/users'
        );

        setUsers(response.data);
    };

    const deleteUser = async (id) => {

        await axios.delete(
            `http://localhost:8080/api/users/${id}`
        );

        fetchUsers();
    };

    return (

        <div style={{padding:'20px'}}>

            <h2>Manage Users</h2>

            {
                users.map((user) => (

                    <div
                        key={user.id}
                        style={{
                            border:'1px solid gray',
                            padding:'10px',
                            marginBottom:'10px'
                        }}
                    >

                        <p>{user.fullName}</p>

                        <p>{user.email}</p>

                        <p>{user.role}</p>

                        <button
                            onClick={() =>
                                deleteUser(user.id)
                            }
                        >
                            Delete
                        </button>

                    </div>
                ))
            }

        </div>
    );
}

export default ManageUsers;