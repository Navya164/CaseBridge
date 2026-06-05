import React, { useState } from 'react';

import axios from 'axios';

function Register() {

    const [user, setUser] = useState({

        fullName: '',

        email: '',

        password: '',

        role: 'USER'
    });

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                'http://localhost:8080/api/users',

                user
            );

            alert('User Registered Successfully');

            window.location.href = '/';

        } catch(error) {

            console.log(error);

            alert('Registration Failed');
        }
    };

    return (

        <div

            style={{

                width: '400px',

                margin: '50px auto',

                padding: '30px',

                border: '1px solid gray',

                borderRadius:'10px',

                backgroundColor:'#f8f8f8'
            }}
        >

            <h2
                style={{
                    textAlign:'center',
                    marginBottom:'20px'
                }}
            >

                User Registration

            </h2>

            <form onSubmit={handleSubmit}>

                <input

                    type='text'

                    name='fullName'

                    placeholder='Full Name'

                    onChange={handleChange}

                    style={inputStyle}
                />

                <input

                    type='email'

                    name='email'

                    placeholder='Email'

                    onChange={handleChange}

                    style={inputStyle}
                />

                <input

                    type='password'

                    name='password'

                    placeholder='Password'

                    onChange={handleChange}

                    style={inputStyle}
                />

                <select

                    name='role'

                    value={user.role}

                    onChange={handleChange}

                    style={inputStyle}
                >

                    <option value='USER'>

                        USER

                    </option>

                    <option value='OFFICER'>

                        OFFICER

                    </option>
                    <option value="ADMIN">ADMIN</option>

                </select>

                <button

                    type='submit'

                    style={{

                        width:'100%',

                        padding:'10px',

                        backgroundColor:'#222',

                        color:'white',

                        border:'none',

                        cursor:'pointer',

                        fontSize:'16px'
                    }}
                >

                    Register

                </button>

            </form>

        </div>
    );
}

const inputStyle = {

    width:'100%',

    padding:'10px',

    marginBottom:'15px',

    fontSize:'15px'
};

export default Register;