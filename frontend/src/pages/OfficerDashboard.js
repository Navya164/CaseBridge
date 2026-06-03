import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OfficerDashboard() {

    const [complaints, setComplaints] = useState([]);
    const [evidenceMap, setEvidenceMap] = useState({});

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {

        try {

            const response = await axios.get(
                'http://localhost:8080/api/complaints'
            );

            setComplaints(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    const reviewEvidence = async (complaintId) => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/evidence/complaint/${complaintId}`
            );

            setEvidenceMap({
                ...evidenceMap,
                [complaintId]: response.data
            });

        } catch(error) {

            console.log(error);
            alert('Failed to load evidence');
        }
    };

    const updateStatus = async (complaintId, status) => {

        try {

            await axios.put(
                `http://localhost:8080/api/complaints/${complaintId}/status`,
                null,
                {
                    params:{ status }
                }
            );

            alert('Status Updated');

            fetchComplaints();

        } catch(error) {

            console.log(error);
            alert('Failed to update status');
        }
    };

    return (

        <div style={{ padding:'20px' }}>

            <h1>OFFICER DASHBOARD</h1>

            {
                complaints.map((complaint) => (

                    <div
                        key={complaint.id}
                        style={{
                            border:'1px solid gray',
                            padding:'20px',
                            marginBottom:'20px',
                            borderRadius:'10px'
                        }}
                    >

                        <h2>{complaint.title}</h2>

                        <p>{complaint.description}</p>

                        <div style={{ marginTop:'10px' }}>

    <strong>Status:</strong>

    <span
        style={{

            marginLeft:'10px',

            padding:'6px 14px',

            borderRadius:'20px',

            fontWeight:'bold',

            color:'white',

            fontSize:'14px',

            backgroundColor:

                complaint.status === "PENDING"
                ? "#ef4444"

                : complaint.status === "IN_PROGRESS"
                ? "#facc15"

                : complaint.status === "RESOLVED"
                ? "#22c55e"

                : "#6b7280"
        }}
    >

        {complaint.status}

    </span>

</div>

                        <button
                            onClick={() =>
                                reviewEvidence(complaint.id)
                            }
                            style={{
                                padding:'8px 15px',
                                cursor:'pointer'
                            }}
                        >
                            Review Evidence
                        </button>

                        <br/><br/>

                        <select
                            onChange={(e) =>
                                updateStatus(
                                    complaint.id,
                                    e.target.value
                                )
                            }
                            defaultValue=""
                            style={{
                                padding:'8px'
                            }}
                        >

                            <option value="">
                                Select Status
                            </option>

                            <option value="PENDING">
                                PENDING
                            </option>

                            <option value="IN_PROGRESS">
                                IN_PROGRESS
                            </option>

                            <option value="RESOLVED">
                                RESOLVED
                            </option>

                        </select>

                        {/* EVIDENCE SECTION */}

                        {
                            evidenceMap[complaint.id] && (

                                <div
                                    style={{
                                        marginTop:'20px',
                                        background:'#f4f4f4',
                                        padding:'15px',
                                        borderRadius:'8px'
                                    }}
                                >

                                    <h3>Evidence Files</h3>

                                    {
                                        evidenceMap[complaint.id].length === 0 ? (

                                            <p>No evidence uploaded</p>

                                        ) : (

                                            evidenceMap[complaint.id].map((file) => (

                                                <div
                                                    key={file.id}
                                                    style={{
                                                        marginBottom:'12px'
                                                    }}
                                                >

                                                    <a
                                                        href={`http://localhost:8080/${file.filePath}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        style={{
                                                            color:'blue',
                                                            textDecoration:'underline',
                                                            fontWeight:'bold'
                                                        }}
                                                    >

                                                        {file.fileName}

                                                    </a>

                                                </div>

                                            ))
                                        )
                                    }

                                </div>
                            )
                        }

                    </div>
                ))
            }

        </div>
    );
}

export default OfficerDashboard;