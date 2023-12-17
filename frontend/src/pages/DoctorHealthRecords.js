import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const HealthRecordsPage = () => {
    const [healthRecords, setHealthRecords] = useState([]);
    
    const { user } = useAuthContext();
    const doctorSection = {
        marginTop: '60px',
      };
    useEffect(() => {
        async function fetchHealthRecords() {
            try {
                const response = await fetch(`api/doctorInfo/getAllHealthRecords?userName=${user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                console.log(data)
                setHealthRecords(data);
            } catch (error) {
                console.error('Error fetching health records:', error);
            }
        }

        if (user) {
            fetchHealthRecords();
        }
    }, [user]);

    return (
        <div style={doctorSection}>
            <h1>Health Records</h1>
            <ol>
                {healthRecords && healthRecords.map((record, index) => (
                    <li key={index}>
                        {record.patientUsername}:
                        <ul>
                            {record.healthRecords&&record.healthRecords.map((healthRecord, i) => (
                                <li key={i}>{healthRecord}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default HealthRecordsPage;
