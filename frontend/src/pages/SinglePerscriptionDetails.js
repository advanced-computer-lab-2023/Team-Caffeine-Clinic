import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SinglePerscriptionDetails = () => {
    const [perscription, setPerscription] = useState(null);
    const [doctorName, setName] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchPerscription = async () => {
            let url = `/api/perscription/singlePersc/${id}`;

            const response = await fetch(url);
            if (!response.ok) {
                console.error('Error fetching prescription data');
                return; // Handle the error appropriately
            }

            const json = await response.json();
            setPerscription(json);
        };

        fetchPerscription();
    }, [id]);

    useEffect(() => {
        const fetchName = async () => {
            if (perscription && perscription.doctorID) { // Check if perscription is defined and has doctorID property
                const url = `/api/perscription/doctor/${perscription.doctorID}`;

                const response = await fetch(url);
                if (!response.ok) {
                    console.error('Error fetching doctor data');
                    return; // Handle the error appropriately
                }

                const json = await response.json();
                setName(json);
            }
        };

        fetchName();
    }, [perscription]);

    return (
        <div className="perscription">
            {perscription ? (
                <div className="doctor-details">
                    <div className="details"><strong>Patient: </strong>{perscription.patientID}</div>
                    <div className="details"><strong>Doctor: </strong>{doctorName}</div>
                    <div className="details"><strong>Date: </strong>{perscription.date_of_perscription}</div>
                    <div className="details"><strong>State: </strong>{perscription.state}</div>
                    <div className="details"><strong>Medicine: </strong>{perscription.medicine}</div>
                </div>
            ) : (
                <p>Loading prescription data...</p>
            )}
        </div>
    );
}

export default SinglePerscriptionDetails;
