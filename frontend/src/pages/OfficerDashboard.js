import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OfficerDashboard() {

    const [stats, setStats] = useState({

        total:0,
        pending:0,
        progress:0,
        resolved:0
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await axios.get(
                'http://localhost:8080/api/complaints'
            );

            const complaints = response.data;

            setStats({

                total:
                    complaints.length,

                pending:
                    complaints.filter(
                        c => c.status === 'PENDING'
                    ).length,

                progress:
                    complaints.filter(
                        c => c.status === 'IN_PROGRESS'
                    ).length,

                resolved:
                    complaints.filter(
                        c => c.status === 'RESOLVED'
                    ).length
            });

        } catch(error) {

            console.log(error);
        }
    };

    const cardStyle = {

        flex:'1',
        minWidth:'240px',
        padding:'30px',
        borderRadius:'22px',
        color:'white',
        boxShadow:'0 10px 25px rgba(0,0,0,0.12)',
        transition:'0.3s',
        cursor:'pointer'
    };

    return (

        <div
            style={{
                minHeight:'100vh',
                background:'linear-gradient(to bottom,#eef2ff,#e0e7ff)',
                padding:'40px'
            }}
        >

            {/* TITLE */}

            <h1
                style={{
                    fontSize:'44px',
                    color:'#1e1b4b',
                    marginBottom:'45px',
                    fontWeight:'bold'
                }}
            >
                Officer Dashboard
            </h1>

            {/* TOP SECTION */}

            <div
                style={{
                    display:'flex',
                    gap:'25px',
                    flexWrap:'wrap'
                }}
            >

                {/* TOTAL */}

                <div
                    title="Total complaints available in the system"
                    style={{
                        ...cardStyle,
                        background:'linear-gradient(to right,#4f46e5,#6366f1)'
                    }}
                >

                    <h2>Total Complaints</h2>

                    <h1
                        style={{
                            fontSize:'55px',
                            marginTop:'15px'
                        }}
                    >
                        {stats.total}
                    </h1>

                </div>

                {/* PENDING */}

                <div
                    title="Complaints waiting for officer review"
                    style={{
                        ...cardStyle,
                        background:'linear-gradient(to right,#ef4444,#f87171)'
                    }}
                >

                    <h2>Pending</h2>

                    <h1
                        style={{
                            fontSize:'55px',
                            marginTop:'15px'
                        }}
                    >
                        {stats.pending}
                    </h1>

                </div>

                {/* IN PROGRESS */}

                <div
                    title="Complaints currently under investigation"
                    style={{
                        ...cardStyle,
                        background:'linear-gradient(to right,#f59e0b,#fbbf24)'
                    }}
                >

                    <h2>In Progress</h2>

                    <h1
                        style={{
                            fontSize:'55px',
                            marginTop:'15px'
                        }}
                    >
                        {stats.progress}
                    </h1>

                </div>

                {/* RESOLVED */}

                <div
                    title="Complaints successfully resolved"
                    style={{
                        ...cardStyle,
                        background:'linear-gradient(to right,#22c55e,#4ade80)'
                    }}
                >

                    <h2>Resolved</h2>

                    <h1
                        style={{
                            fontSize:'55px',
                            marginTop:'15px'
                        }}
                    >
                        {stats.resolved}
                    </h1>

                </div>

            </div>

            {/* SECOND SECTION */}

            <div
                style={{
                    marginTop:'45px',
                    background:'white',
                    borderRadius:'20px',
                    padding:'30px',
                    boxShadow:'0 8px 20px rgba(0,0,0,0.08)'
                }}
            >

                <h2
                    style={{
                        color:'#1e293b',
                        marginBottom:'25px'
                    }}
                >
                    Recent Complaint Activity
                </h2>

                <div style={styles.activityItem}>
                    ✅ 2 complaints moved to RESOLVED today
                </div>

                <div style={styles.activityItem}>
                    🔄 1 new complaint assigned
                </div>

                <div style={styles.activityItem}>
                    ⚠️ 4 pending complaints require attention
                </div>

            </div>

            {/* THIRD SECTION */}

            <div
                style={{
                    marginTop:'35px',
                    background:'white',
                    borderRadius:'20px',
                    padding:'30px',
                    boxShadow:'0 8px 20px rgba(0,0,0,0.08)'
                }}
            >

                <h2
                    style={{
                        color:'#1e293b',
                        marginBottom:'25px'
                    }}
                >
                    Priority Alerts
                </h2>

                <div style={styles.alertItem}>
                    ⚠️ 4 complaints pending for more than 3 days
                </div>

                <div style={styles.alertItem}>
                    🚨 High priority cyber complaints detected
                </div>

                <div style={styles.alertItem}>
                    ⏳ Evidence review pending for multiple cases
                </div>

            </div>

        </div>
    );
}

const styles = {

    activityItem:{

        background:'#eef2ff',
        padding:'16px',
        borderRadius:'12px',
        marginBottom:'15px',
        color:'#312e81',
        fontWeight:'500'
    },

    alertItem:{

        background:'#fef2f2',
        padding:'16px',
        borderRadius:'12px',
        marginBottom:'15px',
        color:'#991b1b',
        fontWeight:'500'
    }
};

export default OfficerDashboard;