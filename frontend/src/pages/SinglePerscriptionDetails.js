import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SinglePerscriptionDetails = () => {
    const [perscription, setPerscription] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPerscription = async () => {
            let url = `/api/perscription/singlePersc/${id}`;
  
            const response = await fetch(url);
            if (!response.ok) {
                console.log('Error fetching perscription data');
                return; // Handle the error appropriately
            }
  
            const json = await response.json();
            setPerscription(json);
        }
        fetchPerscription();
    }, [id]); // Include id as a dependency to re-fetch the data when the id changes

    // Render the component
    return (
        <div className="perscription">
            {perscription ? (
                <div className="doctor-details">
                    <div className="details"><strong>Patient: </strong>{perscription.patientID}</div>
                    <div className="details"><strong>Doctor: </strong>{perscription.doctorID}</div>
                    <div className="details"><strong>Date: </strong>{perscription.date_of_perscription}</div>
                    <div className="details"><strong>state: </strong>{perscription.state}</div>
                    <div className="details"><strong>medicine: </strong>{perscription.medicine}</div>
                </div>
            ) : (
                <p>Loading perscription data...</p>
            )}
        </div>
    );
}

export default SinglePerscriptionDetails;
