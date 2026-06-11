import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OfficerComplaints() {

    const [complaints, setComplaints] = useState([]);
    const [filter, setFilter] = useState('PENDING');

    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState('');
    const [evidence, setEvidence] = useState([]);

    const [reviewAction, setReviewAction] = useState('');
    const [officerNote, setOfficerNote] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/api/complaints'
            );
            setComplaints(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredComplaints = complaints.filter(
        (c) => c.status === filter
    );

    const openEditModal = async (complaint) => {
        setSelectedComplaint(complaint);
        setUpdatedStatus(complaint.status);
        setReviewAction(complaint.reviewAction || '');
        setOfficerNote(complaint.officerNote || '');

        try {
            const response = await axios.get(
                `http://localhost:8080/api/evidence/complaint/${complaint.id}`
            );
            setEvidence(response.data);
        } catch (error) {
            console.log(error);
        }
        try {
    const historyResponse = await axios.get(
        `http://localhost:8080/api/complaints/${complaint.id}/history`
    );

    setHistory(historyResponse.data);

} catch (error) {
    console.log(error);
}
    };

    const closeModal = () => {
        setSelectedComplaint(null);
        setEvidence([]);
        setHistory([]);
        setUpdatedStatus('');
        setReviewAction('');
        setOfficerNote('');
    };

    const saveChanges = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/complaints/${selectedComplaint.id}/status`,
                {
                    status: updatedStatus,
                    reviewAction: reviewAction,
                    officerNote: officerNote
                }
            );

            alert("Updated Successfully");

            closeModal();
            fetchComplaints();

        } catch (error) {
            console.log(error);
            alert("Update Failed");
        }
    };

    return (
        <div style={styles.page}>

            <h1 style={styles.title}>
                Complaint Management
            </h1>

            {/* FILTERS */}
            <div style={styles.filterContainer}>

                <button
                    onClick={() => setFilter('PENDING')}
                    style={filter === 'PENDING'
                        ? styles.activeButton
                        : styles.filterButton}
                >
                    PENDING
                </button>

                <button
                    onClick={() => setFilter('IN_PROGRESS')}
                    style={filter === 'IN_PROGRESS'
                        ? styles.activeButton
                        : styles.filterButton}
                >
                    IN PROGRESS
                </button>

                <button
                    onClick={() => setFilter('RESOLVED')}
                    style={filter === 'RESOLVED'
                        ? styles.activeButton
                        : styles.filterButton}
                >
                    RESOLVED
                </button>

            </div>

            {/* COMPLAINT LIST */}
            {
                filteredComplaints.map((complaint) => (
                    <div key={complaint.id} style={styles.card}>

                        <div>
                            <h2 style={styles.complaintTitle}>
                                {complaint.title}
                            </h2>

                            <p style={styles.description}>
                                {complaint.description}
                            </p>

                            <div style={{ marginTop: '15px' }}>
                                <span style={styles.statusLabel}>Status:</span>

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

                        <button
                            onClick={() => openEditModal(complaint)}
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

                    <div
                        style={styles.overlay}
                        onClick={closeModal}
                    >

                        <div
                            style={styles.modal}
                            onClick={(e) => e.stopPropagation()}
                        >

                            <h2 style={styles.modalTitle}>
                                {selectedComplaint.title}
                            </h2>

                            <p style={styles.modalDescription}>
                                {selectedComplaint.description}
                            </p>

                            <p style={{ color: '#4f46e5', fontWeight: 'bold' }}>
                                ID: {selectedComplaint.complaintCode}
                            </p>

                            {/* REVIEW ACTION */}
                            <div style={{ marginTop: '20px' }}>

                                <label style={{
                                    fontWeight: '700',
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: '#111827'
                                }}>
                                    Review Action
                                </label>

                                <select
                                    value={reviewAction}
                                    onChange={(e) => setReviewAction(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        outline: 'none',
                                        marginTop: '6px'
                                    }}
                                >
                                    <option value="">Select Action</option>
                                    <option value="NEEDS_MORE_EVIDENCE">Needs More Evidence</option>
                                    <option value="REJECTED">Rejected</option>
                                    <option value="ESCALATED">Escalated</option>
                                </select>

                            </div>

                            {/* OFFICER NOTE */}
                            <div style={{ marginTop: '20px' }}>
                                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                                    Officer Note
                                </label>

                                <textarea
                                    value={officerNote}
                                    onChange={(e) => setOfficerNote(e.target.value)}
                                    placeholder="Write detailed officer remarks..."
                                    style={{
                                        width: '100%',
                                        minHeight: '120px',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: '1px solid #ccc',
                                        fontSize: '14px',
                                        resize: 'vertical',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            {/* STATUS */}
                            <div style={{ marginTop: '20px' }}>
                                <label style={styles.modalLabel}>
                                    Update Status
                                </label>

                                <select
                                    value={updatedStatus}
                                    onChange={(e) => setUpdatedStatus(e.target.value)}
                                    style={styles.dropdown}
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                    <option value="RESOLVED">RESOLVED</option>
                                </select>
                            </div>

                            {/* EVIDENCE */}
                            <div style={{ marginTop: '20px' }}>
                                <h3>Evidence</h3>

                                {
                                    evidence.length === 0 ? (
                                        <p>No Evidence Uploaded</p>
                                    ) : (
                                        evidence.map((file) => (
                                            <div key={file.id}>
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

                            {/* AUDIT TRAIL */}

<div style={{ marginTop: '25px' }}>

    <h3>Complaint History</h3>

    {
        history.length === 0 ? (

            <p>No History Available</p>

        ) : (

            <table
    style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        tableLayout: 'fixed'
    }}
>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Date</th>
                        <th style={styles.tableHeader}>Action</th>
                        <th style={styles.tableHeader}>Note</th>
                        <th style={styles.tableHeader}>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        history.map((item) => (

                            <tr key={item.id}>

                                <td style={styles.tableCell}>
                                    {
                                        new Date(item.updatedAt)
                                        .toLocaleString()
                                    }
                                </td>

                                <td style={styles.tableCell}>
                                    {item.reviewAction}
                                </td>

                                <td style={styles.tableCell}>
                                    {item.officerNote}
                                </td>

                                <td style={styles.tableCell}>
                                    {item.status}
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        )
    }

</div>

                            {/* ACTIONS */}
                            <div style={styles.modalButtons}>

                                <button
                                    onClick={saveChanges}
                                    style={styles.saveButton}
                                >
                                    Save
                                </button>

                                <button
                                    onClick={closeModal}
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

/* STYLES (UNCHANGED) */
const styles = {
    page: { minHeight: '100vh', background: '#eef2ff', padding: '35px' },
    title: { fontSize: '42px', color: '#1e1b4b', marginBottom: '30px' },
    filterContainer: { display: 'flex', gap: '15px', marginBottom: '35px' },
    filterButton: { padding: '12px 22px', border: 'none', borderRadius: '10px', background: '#c7d2fe', fontWeight: 'bold', cursor: 'pointer' },
    activeButton: { padding: '12px 22px', border: 'none', borderRadius: '10px', background: '#4f46e5', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    card: { background: 'white', padding: '25px', borderRadius: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    complaintTitle: { color: '#111827' },
    description: { color: '#475569' },
    statusLabel: { fontWeight: 'bold', marginRight: '10px' },
    pendingBadge: { background: '#ef4444', color: 'white', padding: '5px 10px', borderRadius: '12px' },
    progressBadge: { background: '#f59e0b', color: 'white', padding: '5px 10px', borderRadius: '12px' },
    resolvedBadge: { background: '#22c55e', color: 'white', padding: '5px 10px', borderRadius: '12px' },
    editButton: { padding: '10px 16px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',

    width: '850px',      // wider modal

    maxHeight: '90vh',   // scroll if content grows
    overflowY: 'auto'
},
    modalTitle: { marginBottom: '10px', color: '#1e1b4b' },
    modalDescription: { color: '#475569' },
    modalLabel: { fontWeight: 'bold' },
    dropdown: { width: '100%', padding: '10px', marginTop: '10px' },
    evidenceLink: { color: '#4f46e5', display: 'block', marginTop: '8px' },
    modalButtons: { display: 'flex', gap: '10px', marginTop: '20px' },
    saveButton: { flex: 1, padding: '10px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px' },
    tableHeader: {
    border: '1px solid #ddd',
    padding: '8px',
    background: '#4f46e5',
    color: 'white'
},

tableCell: {
    border: '1px solid #ddd',
    padding: '10px',
    fontSize: '14px',
    verticalAlign: 'top'
},
    cancelButton: { flex: 1, padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px' }
};

export default OfficerComplaints;