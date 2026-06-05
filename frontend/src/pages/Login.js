import React, { useState } from 'react';
import axios from 'axios';

function Login() {

    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    });

    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value
        });
    };

    const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            'http://localhost:8080/api/users/login',
            loginData
        );

        console.log("LOGIN RESPONSE:");
        console.log(response.data);

        localStorage.setItem(
            'token',
            response.data.token
        );

        localStorage.setItem(
            'role',
            response.data.role
        );

        localStorage.setItem(
            'userId',
            response.data.userId
        );

        alert('Login Successful');

        if(response.data.role === 'ADMIN') {

            window.location.href = '/admin';

        } else if(response.data.role === 'OFFICER') {

            window.location.href = '/officer';

        } else {

            window.location.href = '/complaint';
        }

    } catch(error) {

        console.log(error);

        alert(
            error.response?.data ||
            'Login Failed'
        );
    }
};
    return (

        <div style={styles.container}>

            <form
                onSubmit={handleLogin}
                style={styles.card}
            >

               

                <p  style={styles.subtitle}>
                    COMPLAINT MANAGEMENT SYSTEM
                </p>

                <input
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    onChange={handleChange}
                    style={styles.input}
                />

                <button
                    type='submit'
                    style={styles.button}
                >
                    Login
                </button>

            </form>

        </div>
    );
}

const styles = {

    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'90vh'
    },

    card:{
        background:'rgba(114, 50, 50, 0.08)',
        padding:'50px',
        borderRadius:'18px',
        width:'400px',
        backdropFilter:'blur(10px)',
        boxShadow:'0 8px 25px rgba(0,0,0,0.5)'
    },

    title:{
        textAlign:'center',
        color:'#38bdf8',
        marginBottom:'10px',
        fontSize:'36px'
    },

    subtitle:{
        textAlign:'center',
        marginBottom:'30px',
        color:'#130222'
    },

    input:{
        width:'100%',
        padding:'14px',
        marginBottom:'20px',
        borderRadius:'10px',
        border:'none',
        fontSize:'16px'
    },

    button:{
        width:'100%',
        padding:'14px',
        background:'#8538f8',
        border:'none',
        borderRadius:'10px',
        color:'white',
        fontWeight:'bold',
        fontSize:'18px'
    }
};

export default Login;