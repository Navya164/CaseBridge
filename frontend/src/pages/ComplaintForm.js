import React, { useState } from 'react';
import axios from 'axios';

function ComplaintForm() {

    const [complaintData, setComplaintData] = useState({

        title:'',
        description:'',
        status:'PENDING'
    });

    const [file, setFile] = useState(null);

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

            // CREATE COMPLAINT

            const complaintResponse = await axios.post(

                'http://localhost:8080/api/complaints',

                complaintData
            );

            const complaintId = complaintResponse.data.id;

            // UPLOAD EVIDENCE

            if(file) {

                const formData = new FormData();

                formData.append('file', file);

                await axios.post(

                    `http://localhost:8080/api/evidence/${complaintId}`,

                    formData,

                    {

                        headers: {

                            'Content-Type':'multipart/form-data'
                        }
                    }
                );
            }

            alert('Complaint & Evidence Submitted Successfully');

            setComplaintData({

                title:'',
                description:'',
                status:'PENDING'
            });

            setFile(null);

        } catch(error) {

            console.log(error);

            alert('Submission Failed');
        }
    };

    return (

        <div
            style={{
                minHeight:'100vh',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                padding:'40px'
            }}
        >

            <div
                style={{
                    width:'700px',
                    padding:'40px',
                    borderRadius:'20px',
                    background:'rgba(255,255,255,0.08)',
                    backdropFilter:'blur(12px)',
                    boxShadow:'0 8px 25px rgba(0,0,0,0.5)',
                    color:'white'
                }}
            >

                <h1
                    style={{
                        textAlign:'center',
                        marginBottom:'10px',
                        fontSize:'36px',
                        color:'#7c0eb4'
                    }}
                >

                    Complaint Registration

                </h1>

                <p
                    style={{
                        textAlign:'center',
                        marginBottom:'35px',
                        color:'#540982'
                    }}
                >

                    Register your complaint and upload evidence securely

                </p>

                <form onSubmit={handleSubmit}>

                    {/* TITLE */}

                    <label
                        style={{
                            color: 'black',
                            fontWeight:'bold',
                            fontSize:'16px'
                        }}
                    >
                        Complaint Title
                    </label>
                    

                    <input
                        type='text'
                        name='title'
                        placeholder='Enter complaint title'
                        value={complaintData.title}
                        onChange={handleChange}
                        required
                        style={{
                            width:'100%',
                            padding:'14px',
                            marginTop:'8px',
                            marginBottom:'25px',
                            borderRadius:'10px',
                            border:'none',
                            fontSize:'16px',
                            background:'#f8fafc'
                        }}
                    />

                    {/* DESCRIPTION */}

                    <label
                        style={{
                            color:'black',
                            fontWeight:'bold',
                            fontSize:'16px'
                        }}
                    >
                        Complaint Description
                    </label>

                    <textarea
                        name='description'
                        placeholder='Describe your complaint in detail...'
                        value={complaintData.description}
                        onChange={handleChange}
                        required
                        rows='6'
                        style={{
                            width:'100%',
                            padding:'14px',
                            marginTop:'8px',
                            marginBottom:'25px',
                            borderRadius:'10px',
                            border:'none',
                            fontSize:'16px',
                            background:'#f8fafc'
                        }}
                    />

                    {/* EVIDENCE */}

                    <div
                        style={{
                            background:'rgba(255,255,255,0.08)',
                            padding:'20px',
                            borderRadius:'12px',
                            marginBottom:'25px',
                            border:'1px solid rgba(255,255,255,0.1)'
                        }}
                    >

                        <h2
                            style={{
                                marginBottom:'15px',
                                color:'#7d0daa'
                            }}
                        >
                            Upload Evidence
                        </h2>

                        <input
                            type='file'
                            onChange={handleFileChange}
                            style={{
                                color:'white',
                                fontSize:'15px'
                            }}
                        />

                        {

                            file && (

                                <p
                                    style={{
                                        marginTop:'15px',
                                        color:'#cbd5e1'
                                    }}
                                >

                                    Selected File:
                                    <strong>
                                        {' '} {file.name}
                                    </strong>

                                </p>
                            )
                        }

                    </div>

                    {/* BUTTON */}

                    <button
                        type='submit'
                        style={{
                            width:'100%',
                            padding:'15px',
                            background:'linear-gradient(to right,#06b6d4,#3b82f6)',
                            border:'none',
                            borderRadius:'12px',
                            color:'white',
                            fontSize:'18px',
                            fontWeight:'bold',
                            cursor:'pointer',
                            transition:'0.3s'
                        }}
                    >

                        Submit Complaint

                    </button>

                </form>

            </div>

        </div>
    );
}

export default ComplaintForm;