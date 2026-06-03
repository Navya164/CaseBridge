import React from 'react';

import {
    Link,
    useNavigate
} from 'react-router-dom';

function Navbar() {

    const token = localStorage.getItem('token');

    const role = localStorage.getItem('role');

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('role');

        navigate('/');

        window.location.reload();
    };

    return (

        <div style={styles.navbar}>

            <div style={styles.logo}>
                CASEBRIDGE
            </div>

            <div>

                {

                    !token ? (

                        <>

                            <Link
                                to="/"
                                style={styles.link}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                style={styles.link}
                            >
                                Register
                            </Link>

                        </>

                    ) : (

                        <>

                            {/* USER */}

                            {

                                role === 'USER' && (

                                    <>

                                        <Link
                                            to="/complaint"
                                            style={styles.link}
                                        >
                                            Complaint & Evidence
                                        </Link>

                                    </>

                                )
                            }

                            {/* OFFICER */}

                            {

                                role === 'OFFICER' && (

                                    <>

                                        <Link
                                            to="/officer"
                                            style={styles.link}
                                        >
                                            Officer Dashboard
                                        </Link>

                                    </>

                                )
                            }

                            {/* ADMIN */}

                            {

                                role === 'ADMIN' && (

                                    <>

                                        <Link
                                            to="/admin"
                                            style={styles.link}
                                        >
                                            Admin Dashboard
                                        </Link>

                                        <Link
                                            to="/analytics"
                                            style={styles.link}
                                        >
                                            Analytics
                                        </Link>

                                        <Link
                                            to="/permissions"
                                            style={styles.link}
                                        >
                                            Permissions
                                        </Link>

                                    </>

                                )
                            }

                            <button
                                onClick={logout}
                                style={styles.logout}
                            >
                                Logout
                            </button>

                        </>

                    )
                }

            </div>

        </div>
    );
}

const styles = {

    navbar:{
        background:'rgba(15,23,42,0.95)',
        padding:'18px 40px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        boxShadow:'0 4px 15px rgba(0,0,0,0.4)',
        position:'sticky',
        top:'0',
        zIndex:'100'
    },

    logo:{
        fontSize:'28px',
        fontWeight:'bold',
        color:'#38bdf8',
        letterSpacing:'2px'
    },

    link:{
        color:'white',
        marginRight:'25px',
        fontSize:'17px',
        fontWeight:'600',
        textDecoration:'none'
    },

    logout:{
        background:'#ef4444',
        border:'none',
        color:'white',
        padding:'10px 18px',
        borderRadius:'8px',
        fontWeight:'bold',
        cursor:'pointer'
    }
};

export default Navbar;