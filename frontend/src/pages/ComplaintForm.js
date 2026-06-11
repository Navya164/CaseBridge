import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserPermissions, hasPermission } from '../utils/permissionUtils';

function ComplaintForm() {

    const [complaintData, setComplaintData] = useState({
        title: '',
        description: '',
        status: 'PENDING'
    });

    const [file, setFile] = useState(null);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        loadPermissions();
    }, []);

    const loadPermissions = async () => {
        try {
            const data = await getUserPermissions();
            setPermissions(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setComplaintData({
            ...complaintData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const userId = localStorage.getItem("userId");

        console.log("USER ID =", userId);

        const complaintPayload = {
            ...complaintData,
            userId: Number(userId)
        };

        console.log("PAYLOAD =", complaintPayload);

        // CREATE COMPLAINT
        const complaintResponse = await axios.post(
            'http://localhost:8080/api/complaints',
            complaintPayload
        );

        // SAFE RESPONSE HANDLING
        const complaintId = complaintResponse.data.id;
        const complaintCode = complaintResponse.data.complaintCode;

        if (!complaintId || !complaintCode) {
            alert("Backend did not return complaint ID or code!");
            return;
        }

        // UPLOAD EVIDENCE
        if (file) {

            const formData = new FormData();
            formData.append('file', file);

            await axios.post(
                `http://localhost:8080/api/evidence/${complaintId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
        }

        // SUCCESS
        alert(
            `Complaint Registered Successfully!\nYour Complaint ID: ${complaintCode}`
        );

        // RESET FORM
        setComplaintData({
            title: '',
            description: '',
            status: 'PENDING'
        });

        setFile(null);

    } catch (error) {

        console.log(error);
        alert('Submission Failed');

    }
};

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
        }}>

            <div style={{
                width: '700px',
                padding: '40px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                color: 'white'
            }}>

                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '10px',
                    fontSize: '36px',
                    color: '#7c0eb4'
                }}>
                    Complaint Registration
                </h1>

                <p style={{
                    textAlign: 'center',
                    marginBottom: '35px',
                    color: '#540982'
                }}>
                    Register your complaint and upload evidence securely
                </p>

                <form onSubmit={handleSubmit}>

                    {/* TITLE */}
                    <label style={{ color: 'black', fontWeight: 'bold' }}>
                        Complaint Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={complaintData.title}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '14px',
                            marginTop: '8px',
                            marginBottom: '25px',
                            borderRadius: '10px',
                            border: 'none',
                            fontSize: '16px'
                        }}
                    />

                    {/* DESCRIPTION */}
                    <label style={{ color: 'black', fontWeight: 'bold' }}>
                        Complaint Description
                    </label>

                    <textarea
                        name="description"
                        value={complaintData.description}
                        onChange={handleChange}
                        required
                        rows="6"
                        style={{
                            width: '100%',
                            padding: '14px',
                            marginTop: '8px',
                            marginBottom: '25px',
                            borderRadius: '10px',
                            border: 'none',
                            fontSize: '16px'
                        }}
                    />

                    {/* FILE UPLOAD */}
                    <div style={{ marginBottom: '25px' }}>
                        <h3 style={{ color: '#7d0daa' }}>
                            Upload Evidence
                        </h3>

                        <input
                            type="file"
                            onChange={handleFileChange}
                        />

                        {file && (
                            <p style={{ marginTop: '10px' }}>
                                Selected: <strong>{file.name}</strong>
                            </p>
                        )}
                    </div>

                    {/* PERMISSION BUTTONS */}
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginBottom: '20px'
                    }}>

                        {hasPermission(permissions, 'DOWNLOAD_REPORT') && (
                            <button type="button" style={btn1}>
                                Download Report
                            </button>
                        )}

                        {hasPermission(permissions, 'PRINT_REPORT') && (
                            <button type="button" style={btn2}>
                                Print Report
                            </button>
                        )}

                        {hasPermission(permissions, 'TEST_MODULE') && (
                            <button type="button" style={btn3}>
                                Test Module
                            </button>
                        )}

                    </div>

                    {/* SUBMIT */}
                    <button type="submit" style={submitBtn}>
                        Submit Complaint
                    </button>

                </form>

            </div>
        </div>
    );
}

// styles
const btn1 = { padding: '10px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px' };
const btn2 = { padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px' };
const btn3 = { padding: '10px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px' };

const submitBtn = {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(to right,#06b6d4,#3b82f6)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold'
};

export default ComplaintForm;