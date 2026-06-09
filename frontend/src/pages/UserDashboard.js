import React from 'react';

function UserDashboard() {

    return (
        <div style={styles.container}>

            <h1 style={styles.title}>
                Complaint Dashboard
            </h1>

            <div style={styles.grid}>

                {/* NEW COMPLAINT CARD */}
                <div
                    style={styles.card}
                    onClick={() => window.location.href = '/complaint'}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                        style={styles.image}
                        alt="new"
                    />

                    <h2>New Complaint</h2>
                    <p>Register a new complaint with evidence upload</p>
                </div>

                {/* TRACK COMPLAINT CARD */}
                <div
                    style={styles.card}
                    onClick={() => window.location.href = '/track'}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                        style={styles.image}
                        alt="track"
                    />

                    <h2>Track Complaint</h2>
                    <p>Check status using your Complaint ID</p>
                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right,#dbeafe,#ede9fe)'
    },

    title: {
        fontSize: '32px',
        marginBottom: '40px',
        color: '#1e293b'
    },

    grid: {
        display: 'flex',
        gap: '30px'
    },

    card: {
        width: '250px',
        height: '250px',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '0.3s',
        textAlign: 'center',
        padding: '20px'
    },

    image: {
        width: '80px',
        marginBottom: '15px'
    }
};

export default UserDashboard;