import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Complaints() {

    const [complaints, setComplaints] = useState([]);

    const [filter, setFilter] = useState('PENDING');

    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [updatedStatus, setUpdatedStatus] = useState('');

    const [evidence, setEvidence] = useState([]);

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

    const filteredComplaints = complaints.filter(

        complaint => complaint.status === filter
    );

    const openEditModal = async (complaint) => {

        setSelectedComplaint(complaint);

        setUpdatedStatus(complaint.status);

        try {

            const response = await axios.get(
                `http://localhost:8080/api/evidence/complaint/${complaint.id}`
            );

            setEvidence(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    const saveChanges = async () => {

        try {

            await axios.put(
                `http://localhost:8080/api/complaints/${selectedComplaint.id}/status`,
                null,
                {
                    params:{
                        status:updatedStatus
                    }
                }
            );

            alert('Complaint Updated Successfully');

            setSelectedComplaint(null);

            fetchComplaints();

        } catch(error) {

            console.log(error);

            alert('Failed To Update');
        }
    };

    return (

        <div style={styles.page}>

            <h1 style={styles.title}>
                Complaint Management
            </h1>

            {/* FILTER BUTTONS */}

            <div style={styles.filterContainer}>

                <button
                    onClick={() => setFilter('PENDING')}
                    style={
                        filter === 'PENDING'
                        ? styles.activeButton
                        : styles.filterButton
                    }
                >
                    PENDING
                </button>

                <button
                    onClick={() => setFilter('IN_PROGRESS')}
                    style={
                        filter === 'IN_PROGRESS'
                        ? styles.activeButton
                        : styles.filterButton
                    }
                >
                    IN PROGRESS
                </button>

                <button
                    onClick={() => setFilter('RESOLVED')}
                    style={
                        filter === 'RESOLVED'
                        ? styles.activeButton
                        : styles.filterButton
                    }
                >
                    RESOLVED
                </button>

            </div>

            {/* COMPLAINT CARDS */}

            {
                filteredComplaints.map((complaint) => (

                    <div
                        key={complaint.id}
                        style={styles.card}
                    >

                        <div>

                            <h2 style={styles.complaintTitle}>
                                {complaint.title}
                            </h2>

                            <p style={styles.description}>
                                {complaint.description}
                            </p>

                            <div style={{ marginTop:'15px' }}>

                                <span style={styles.statusLabel}>
                                    Status:
                                </span>

                                <span
                                    style={
                                        complaint.status === 'PENDING'
                                        ? styles.pendingBadge

                                        : complaint.status === 'IN_PROGRESS'
                                        ? styles.progressBadge

                                        : styles.resolvedBadge
                                    }
                                >
                                    {complaint.status}
                                </span>

                            </div>

                        </div>

                        {/* EDIT BUTTON */}

                        <button
                            onClick={() =>
                                openEditModal(complaint)
                            }
                            style={styles.editButton}
                        >
                            Edit
                        </button>

                    </div>
                ))
            }

            {/* MODAL */}

            {
                selectedComplaint && (

                    <div style={styles.overlay}>

                        <div style={styles.modal}>

                            <h2 style={styles.modalTitle}>
    {selectedComplaint.title}
</h2>

                            <p style={styles.modalDescription}>

                                {selectedComplaint.description}

                            </p>

                            <div style={{ marginTop:'25px' }}>

                                <label style={styles.modalLabel}>
                                    Update Status
                                </label>

                                <br/>

                                <select
                                    value={updatedStatus}
                                    onChange={(e) =>
                                        setUpdatedStatus(
                                            e.target.value
                                        )
                                    }
                                    style={styles.dropdown}
                                >

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

                            </div>

                            {/* EVIDENCE */}

                            <div style={{ marginTop:'25px' }}>

                                <h3>
                                    Review Evidence
                                </h3>

                                {
                                    evidence.length === 0 ? (

                                        <p>
                                            No Evidence Uploaded
                                        </p>

                                    ) : (

                                        evidence.map((file) => (

                                            <div
                                                key={file.id}
                                                style={{
                                                    marginTop:'10px'
                                                }}
                                            >

                                                <a
                                                    href={`http://localhost:8080/${file.filePath}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={styles.evidenceLink}
                                                >
                                                    {file.fileName}
                                                </a>

                                            </div>

                                        ))
                                    )
                                }

                            </div>

                            {/* BUTTONS */}

                            <div style={styles.modalButtons}>

                                <button
                                    onClick={saveChanges}
                                    style={styles.saveButton}
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() =>
                                        setSelectedComplaint(null)
                                    }
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }

        </div>
    );
}

const styles = {

    page:{

        minHeight:'100vh',
        background:'#eef2ff',
        padding:'35px'
    },

    title:{

        fontSize:'42px',
        color:'#1e1b4b',
        marginBottom:'30px'
    },

    filterContainer:{

        display:'flex',
        gap:'15px',
        marginBottom:'35px'
    },

    filterButton:{

        padding:'12px 22px',
        border:'none',
        borderRadius:'10px',
        background:'#c7d2fe',
        color:'#1e1b4b',
        fontWeight:'bold',
        cursor:'pointer'
    },

    activeButton:{

        padding:'12px 22px',
        border:'none',
        borderRadius:'10px',
        background:'#4f46e5',
        color:'white',
        fontWeight:'bold',
        cursor:'pointer'
    },

    card:{

        background:'white',
        padding:'30px',
        borderRadius:'20px',
        marginBottom:'25px',
        boxShadow:'0 8px 20px rgba(0,0,0,0.08)',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },

    complaintTitle:{

        color:'#111827',
        marginBottom:'12px'
    },

    description:{

        color:'#475569',
        width:'90%'
    },

    statusLabel:{

        fontWeight:'bold',
        marginRight:'10px'
    },

    pendingBadge:{

        background:'#ef4444',
        color:'white',
        padding:'6px 14px',
        borderRadius:'20px',
        fontSize:'13px'
    },

    progressBadge:{

        background:'#f59e0b',
        color:'white',
        padding:'6px 14px',
        borderRadius:'20px',
        fontSize:'13px'
    },

    resolvedBadge:{

        background:'#22c55e',
        color:'white',
        padding:'6px 14px',
        borderRadius:'20px',
        fontSize:'13px'
    },

    editButton:{

        padding:'12px 20px',
        border:'none',
        borderRadius:'10px',
        background:'#4f46e5',
        color:'white',
        fontWeight:'bold',
        cursor:'pointer'
    },

    overlay:{

        position:'fixed',
        top:'0',
        left:'0',
        width:'100%',
        height:'100%',
        background:'rgba(0,0,0,0.5)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:'999'
    },

    modal:{

        background:'white',
        width:'500px',
        padding:'35px',
        borderRadius:'20px',
        boxShadow:'0 10px 30px rgba(0,0,0,0.2)'
    },

    modalTitle:{

        color:'#1e1b4b',
        marginBottom:'20px'
    },

    modalDescription:{

        color:'#475569',
        lineHeight:'1.6'
    },

    modalLabel:{

        fontWeight:'bold',
        color:'#111827'
    },

    dropdown:{

        width:'100%',
        padding:'12px',
        marginTop:'10px',
        borderRadius:'10px',
        border:'1px solid #cbd5e1'
    },

    evidenceLink:{

        color:'#4f46e5',
        fontWeight:'bold',
        textDecoration:'none'
    },

    modalButtons:{

        display:'flex',
        gap:'15px',
        marginTop:'30px'
    },

    saveButton:{

        flex:'1',
        padding:'14px',
        border:'none',
        borderRadius:'10px',
        background:'#22c55e',
        color:'white',
        fontWeight:'bold',
        cursor:'pointer'
    },

    cancelButton:{

        flex:'1',
        padding:'14px',
        border:'none',
        borderRadius:'10px',
        background:'#ef4444',
        color:'white',
        fontWeight:'bold',
        cursor:'pointer'
    }
};

export default Complaints;