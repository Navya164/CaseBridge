import React, { useEffect, useState } from 'react';

import axios from 'axios';

function PermissionManagement() {

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

            alert('Permission Assigned');

        } catch(error) {

            console.log(error);

            alert('Assignment Failed');
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h1 style={styles.title}>
                    Permission Management
                </h1>

                <select
                    style={styles.input}
                    onChange={(e) =>
                        setSelectedUser(e.target.value)
                    }
                >

                    <option>
                        Select User
                    </option>

                    {
                        users.map((user) => (

                            <option
                                key={user.id}
                                value={user.id}
                            >

                                {user.fullName}
                                ({user.role})

                            </option>
                        ))
                    }

                </select>

                <select
                    style={styles.input}
                    onChange={(e) =>
                        setSelectedPermission(
                            e.target.value
                        )
                    }
                >

                    <option>
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
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        minHeight:'90vh'
    },

    card:{
        width:'500px',
        background:'rgba(255,255,255,0.2)',
        padding:'40px',
        borderRadius:'20px',
        boxShadow:'0 8px 25px rgba(0,0,0,0.3)'
    },

    title:{
        textAlign:'center',
        marginBottom:'30px',
        color:'#111827'
    },

    input:{
        width:'100%',
        padding:'14px',
        marginBottom:'20px',
        borderRadius:'10px',
        border:'1px solid gray',
        fontSize:'16px'
    },

    button:{
        width:'100%',
        padding:'14px',
        background:'#2563eb',
        color:'white',
        border:'none',
        borderRadius:'10px',
        fontWeight:'bold',
        fontSize:'16px'
    }
};

export default PermissionManagement;