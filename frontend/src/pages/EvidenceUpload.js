import React, { useState } from 'react';
import axios from 'axios';

function EvidenceUpload() {

    const [complaintId, setComplaintId] = useState('');

    const [file, setFile] = useState(null);

    const handleUpload = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('file', file);

        try {

            await axios.post(

                `http://localhost:8080/api/evidence/${complaintId}`,

                formData,

                {
                    headers: {
                        'Content-Type':
                            'multipart/form-data'
                    }
                }
            );

            alert('Evidence Uploaded');

        } catch(error) {

            console.log(error);

            alert('Upload Failed');
        }
    };

    return (

        <div
            style={{
                width:'500px',
                margin:'30px auto',
                border:'1px solid gray',
                padding:'20px'
            }}
        >

            <h2>Upload Evidence</h2>

            <form onSubmit={handleUpload}>

                <input

                    type='number'

                    placeholder='Complaint ID'

                    value={complaintId}

                    onChange={(e) =>
                        setComplaintId(e.target.value)
                    }

                    style={{
                        width:'100%',
                        marginBottom:'10px'
                    }}
                />

                <input

                    type='file'

                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }

                    style={{
                        color:'black',
                        marginBottom:'15px'
                        
                    }}
                />

                <br/>

                <button type='submit'>
                    Upload
                </button>

            </form>

        </div>
    );
}

export default EvidenceUpload;