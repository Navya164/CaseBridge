import React, { useEffect, useState } from 'react';

import axios from 'axios';

function AdminPermission() {

    const [users, setUsers] = useState([]);

    const [permissions, setPermissions] = useState([]);

    const [selectedUser, setSelectedUser] = useState('');

    const [selectedPermission, setSelectedPermission] = useState('');

    const [endDate, setEndDate] = useState('');

    useEffect(() => {

        fetchUsers();

        fetchPermissions();

    }, []);

    const fetchUsers = async () => {

        try {

            const response = await axios.get(
                'http://localhost:8080/api/users'
            );

            setUsers(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    const fetchPermissions = async () => {

        try {

            const response = await axios.get(
                'http://localhost:8080/api/permissions'
            );

            setPermissions(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    const assignPermission = async () => {

        try {

            await axios.post(

                'http://localhost:8080/api/permissions/assign',

                null,

                {

                    params: {

                        userId:selectedUser,

                        permissionId:selectedPermission,

                        endDate:endDate
                    }
                }
            );

            alert('Permission Assigned Successfully');

        } catch(error) {

            console.log(error);

            alert('Assignment Failed');
        }
    };

    return (

        <div style={styles.container}>

            <h1 style={styles.heading}>

                Permission Management

            </h1>

            <div style={styles.card}>

                <label>Select User</label>

                <select
                    style={styles.input}
                    onChange={(e) =>
                        setSelectedUser(e.target.value)
                    }
                >

                    <option value="">
                        Select User
                    </option>

                    {
                        users.map((user) => (

                            <option
                                key={user.id}
                                value={user.id}
                            >

                                {user.fullName}

                            </option>
                        ))
                    }

                </select>

                <label>Select Permission</label>

                <select
                    style={styles.input}
                    onChange={(e) =>
                        setSelectedPermission(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Permission
                    </option>

                    {
                        permissions.map((permission) => (

                            <option
                                key={permission.id}
                                value={permission.id}
                            >

                                {permission.permissionName}

                            </option>
                        ))
                    }

                </select>

                <label>Permission Expiry</label>

                <input
                    type="datetime-local"
                    style={styles.input}
                    onChange={(e) =>
                        setEndDate(e.target.value)
                    }
                />

                <button
                    style={styles.button}
                    onClick={assignPermission}
                >

                    Assign Permission

                </button>

            </div>

        </div>
    );
}

const styles = {

    container:{
        padding:'40px'
    },

    heading:{
        fontSize:'32px',
        marginBottom:'30px',
        color:'#1e293b'
    },

    card:{
        background:'white',
        padding:'30px',
        borderRadius:'15px',
        width:'500px',
        boxShadow:'0 6px 18px rgba(0,0,0,0.2)'
    },

    input:{
        width:'100%',
        padding:'12px',
        marginTop:'10px',
        marginBottom:'20px',
        borderRadius:'8px',
        border:'1px solid gray'
    },

    button:{
        background:'#2563eb',
        color:'white',
        padding:'12px 20px',
        border:'none',
        borderRadius:'8px',
        fontWeight:'bold',
        cursor:'pointer'
    }
};

export default AdminPermission;