import React, { useState } from 'react';
import axios from 'axios';

function TrackComplaint() {

    const [code, setCode] = useState('');
    const [complaint, setComplaint] = useState(null);

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

    const getStepStyle = (step) => {
        if (!complaint) return {};
        if (complaint.status === step) {
            return { background: '#22c55e', color: 'white' };
        }
        if (
            (complaint.status === 'IN_PROGRESS' && step === 'PENDING') ||
            (complaint.status === 'RESOLVED')
        ) {
            return { background: '#3b82f6', color: 'white' };
        }
        return { background: '#e5e7eb', color: '#111' };
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <div style={{
                width: '500px',
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

                {/* TIMELINE */}
                {complaint && (
                    <div style={{ marginTop: '30px' }}>

                        <h3>Status: {complaint.status}</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>

                            <div style={{ ...stepBox, ...getStepStyle('PENDING') }}>
                                PENDING
                            </div>

                            <div style={{ ...stepBox, ...getStepStyle('IN_PROGRESS') }}>
                                IN PROGRESS
                            </div>

                            <div style={{ ...stepBox, ...getStepStyle('RESOLVED') }}>
                                RESOLVED
                            </div>

                        </div>

                        <p style={{ marginTop: '20px' }}>
                            <b>Title:</b> {complaint.title}
                        </p>

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

export default TrackComplaint;