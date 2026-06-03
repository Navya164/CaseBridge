import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend

} from 'recharts';

function AnalyticsDashboard() {

    const [complaints, setComplaints] =
        useState([]);

    useEffect(() => {

        fetchComplaints();

    }, []);

    const fetchComplaints = async () => {

        const response = await axios.get(

            'http://localhost:8080/api/complaints'

        );

        setComplaints(response.data);
    };

    const pending =
        complaints.filter(
            c => c.status === 'PENDING'
        ).length;

    const progress =
        complaints.filter(
            c => c.status === 'IN_PROGRESS'
        ).length;

    const resolved =
        complaints.filter(
            c => c.status === 'RESOLVED'
        ).length;

    const data = [

        {
            name:'Pending',
            value: pending
        },

        {
            name:'In Progress',
            value: progress
        },

        {
            name:'Resolved',
            value: resolved
        }
    ];

    const COLORS = [

        '#ff4444',
        '#ffbb33',
        '#00C851'
    ];

    return (

        <div
            style={{
                textAlign:'center',
                marginTop:'40px'
            }}
        >

            <h2>Complaint Analytics</h2>

            <PieChart
                width={500}
                height={400}
            >

                <Pie

                    data={data}

                    cx="50%"

                    cy="50%"

                    outerRadius={120}

                    dataKey="value"

                    label
                >

                    {
                        data.map((entry, index) => (

                            <Cell

                                key={index}

                                fill={
                                    COLORS[index]
                                }

                            />
                        ))
                    }

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </div>
    );
}

export default AnalyticsDashboard;