import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrackComplaint() {

    const [code, setCode] = useState('');
    const [complaint, setComplaint] = useState(null);

    const [myComplaints, setMyComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [history, setHistory] = useState([]);

    // LOAD USER COMPLAINTS
    const loadMyComplaints = async (userId) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/complaints/user/${userId}`
            );
            setMyComplaints(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            loadMyComplaints(userId);
        }
    }, []);

    // TRACK BY CODE
    const handleTrack = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/complaints/track/${code}`
            );
            setComplaint(res.data);
        } catch (err) {
            alert('Complaint not found');
            setComplaint(null);
        }
    };

    // LOAD HISTORY (AUDIT TRAIL)
    const loadHistory = async (complaintId) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/complaints/${complaintId}/history`
            );
            setHistory(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log("History error:", error);
            setHistory([]);
        }
    };

    // VIEW HANDLER (IMPORTANT FIX)
    const handleViewComplaint = (c) => {
        setSelectedComplaint(c);
        setHistory([]);
        loadHistory(c.id);
    };

    const getStepStyle = (step) => {
        if (!complaint) return {};

        if (complaint.status === step) {
            return { background: '#22c55e', color: 'white' };
        }

        if (
            (complaint.status === 'IN_PROGRESS' && step === 'PENDING') ||
            complaint.status === 'RESOLVED'
        ) {
            return { background: '#3b82f6', color: 'white' };
        }

        return { background: '#e5e7eb', color: '#111' };
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: '1000px',
                padding: '30px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.1)',
                textAlign: 'center'
            }}>

                <h2>Track Your Complaint</h2>

                <input
                    placeholder="Enter Complaint Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        marginTop: '15px',
                        borderRadius: '8px'
                    }}
                />

                <button
                    onClick={handleTrack}
                    style={{
                        marginTop: '15px',
                        width: '100%',
                        padding: '12px',
                        background: '#22c55e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px'
                    }}
                >
                    Track
                </button>

                {/* TRACK RESULT */}
                {complaint && (
                    <div style={{ marginTop: '30px' }}>
                        <h3>Status: {complaint.status}</h3>

                        {complaint.reviewAction && (
                            <p><b>Review Action:</b> {complaint.reviewAction}</p>
                        )}

                        {complaint.officerNote && (
                            <p><b>Officer Note:</b> {complaint.officerNote}</p>
                        )}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '20px'
                        }}>
                            <div style={{ ...stepBox, ...getStepStyle('PENDING') }}>PENDING</div>
                            <div style={{ ...stepBox, ...getStepStyle('IN_PROGRESS') }}>IN PROGRESS</div>
                            <div style={{ ...stepBox, ...getStepStyle('RESOLVED') }}>RESOLVED</div>
                        </div>

                        <p style={{ marginTop: '20px' }}>
                            <b>Title:</b> {complaint.title}
                        </p>
                    </div>
                )}

                <hr style={{ marginTop: '40px' }} />

                {/* MY COMPLAINTS */}
                <h2 style={{
                    fontWeight: "900",
                    fontSize: "28px",
                    marginTop: "30px",
                    marginBottom: "20px"
                }}>
                    MY COMPLAINTS
                </h2>

                <table style={{
                    width: "100%",
                    border: "4px double black",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                    fontWeight: "bold"
                }}>
                    <thead>
                        <tr>
                            <th style={tableHeader}>Complaint ID</th>
                            <th style={tableHeader}>Title</th>
                            <th style={tableHeader}>Status</th>
                            <th style={tableHeader}>View</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myComplaints.map((c) => (
                            <tr key={c.id}>
                                <td style={tableCell}>{c.complaintCode}</td>
                                <td style={tableCell}>{c.title}</td>
                                <td style={tableCell}>{c.status}</td>
                                <td>
                                    <button onClick={() => handleViewComplaint(c)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* COMPLAINT DETAILS */}
                {selectedComplaint && (
                    <div style={{
                        marginTop: '30px',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        textAlign: 'left'
                    }}>
                        <h3>Complaint Details</h3>

                        <p><b>Complaint ID:</b> {selectedComplaint.complaintCode}</p>
                        <p><b>Title:</b> {selectedComplaint.title}</p>
                        <p><b>Status:</b> {selectedComplaint.status}</p>
                        <p><b>Review Action:</b> {selectedComplaint.reviewAction || 'Not Available'}</p>
                        <p><b>Officer Note:</b> {selectedComplaint.officerNote || 'Not Available'}</p>

                        {/* HISTORY TABLE */}
                        <hr style={{ marginTop: '20px', marginBottom: '20px' }} />

                        <h3>Complaint History</h3>

                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            marginTop: '10px'
                        }}>
                            <thead>
                                <tr>
                                    <th style={tableHeader}>Date</th>
                                    <th style={tableHeader}>Action</th>
                                    <th style={tableHeader}>Officer Note</th>
                                    <th style={tableHeader}>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {history.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={tableCell}>
                                            No history available
                                        </td>
                                    </tr>
                                ) : (
                                    history.map((h) => (
                                        <tr key={h.id}>
                                            <td style={tableCell}>
                                                {h.updatedAt ? new Date(h.updatedAt).toLocaleString() : '-'}
                                            </td>
                                            <td style={tableCell}>{h.reviewAction || '-'}</td>
                                            <td style={tableCell}>{h.officerNote || '-'}</td>
                                            <td style={tableCell}>{h.status || '-'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                    </div>
                )}

            </div>
        </div>
    );
}

const stepBox = {
    padding: '10px',
    borderRadius: '8px',
    width: '30%',
    textAlign: 'center',
    fontWeight: 'bold'
};

const tableHeader = {
    border: "3px double black",
    padding: "12px",
    fontWeight: "bold",
    textAlign: "center"
};

const tableCell = {
    border: "2px solid black",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold"
};

export default TrackComplaint;