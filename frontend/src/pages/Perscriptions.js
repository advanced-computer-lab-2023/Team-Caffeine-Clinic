import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import PerscriptionDetails from '../components/PerscriptionDetails';

const Perscription = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [doctorFilter, setDoctorFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [dates, setDates] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [states, setStates] = useState([]);
    const [error, setError] = useState(null);

    const user = useAuthContext()

    useEffect(() => {
        const fetchPrescription = async () => {
            try {
                let url = 'http://localhost:4000/api/prescription';

                const params = new URLSearchParams();
                if (dateFilter) params.append('date', dateFilter);
                if (doctorFilter) params.append('doctorName', doctorFilter);
                if (stateFilter) params.append('state', stateFilter);
                if (params.toString()) url += `?${params.toString()}`;

                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${user.user.token}`
                    }
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const json = await response.json();
                setPrescriptions(json);

                // Extracting unique values for the dropdown filters
                const uniqueDates = [...new Set(json.map(item => item.date))];
                const uniqueDoctors = [...new Set(json.map(item => item.doctorName))];
                const uniqueStates = [...new Set(json.map(item => item.state))];

                setDates(uniqueDates);
                setDoctors(uniqueDoctors);
                setStates(uniqueStates);
            } catch (err) {
                console.error('Fetching prescriptions failed:', err);
                setError(err.message || 'Fetching prescriptions failed');
            }
        };
        if(user){
            fetchPrescription();
        }
    }, [dateFilter, doctorFilter, stateFilter, user]);

    return (
        <div className="doctors">
            <div className="filters">
                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="filter-input">
                    <option value="">Filter by Date</option>
                    {dates.map((date, index) => (
                        <option key={index} value={date}>{date}</option>
                    ))}
                </select>

                <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} className="filter-input">
                    <option value="">Filter by Doctor</option>
                    {doctors.map((doctor, index) => (
                        <option key={index} value={doctor}>{doctor}</option>
                    ))}
                </select>

                <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="filter-input">
                    <option value="">Filter by State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>
            </div>

            <div className='prescription-list'>
                {prescriptions.length > 0 ? (
                    prescriptions.map((prescription, index) => (
                        <PerscriptionDetails key={prescription._id || index} prescription={prescription} />
                    ))
                ) : (
                    <p className="no-prescriptions-message">No available prescriptions</p>
                )}
            </div>
        </div>
    );
};

export default Perscription;



// import { useEffect, useState } from 'react';
// import { useAuthContext } from "../hooks/useAuthContext";
// import PerscriptionDetails from '../components/PerscriptionDetails';

// const Perscription = () => {
//     const [perscriptions, setPerscription] = useState([]);
//     const [dateFilter, setDateFilter] = useState('');
//     const [doctorFilter, setDoctorFilter] = useState('');
//     const [stateFilter, setStateFilter] = useState('');
//     const [error, setError] = useState(null);  // Track any potential error

//     const user = useAuthContext()

//     useEffect(() => {
//         const fetchPerscription = async () => {
//             try {
//                 let url = 'http://localhost:4000/api/perscription';

//                 const params = new URLSearchParams();
//                 if (dateFilter) params.append('date', dateFilter);
//                 if (doctorFilter) params.append('doctorName', doctorFilter);
//                 if (stateFilter) params.append('state', stateFilter);
//                 if (params.toString()) url += `?${params.toString()}`;

//                 const response = await fetch(url, {
//                     headers: {
//                         'Authorization': `Bearer ${user.user.token}`
//                     }
//                 });
                
//                 // Add check for response.ok to handle HTTP status errors
//                 if (!response.ok) throw new Error('Network response was not ok');

//                 const json = await response.json();
//                 setPerscription(json);
//             } catch (err) {
//                 // Log error for debugging and set error state
//                 console.error('Fetching perscriptions failed:', err);
//                 setError(err.message || 'Fetching perscriptions failed');
//             }
//         };
//         if(user){
//             fetchPerscription();
//         }
//     }, [dateFilter, doctorFilter, stateFilter, user]);

//     return (
//         <div className="doctors">
//             {/* Filter section */}
//             <div className="filters">
//                 <input
//                     type="text"
//                     placeholder="Filter by Date"
//                     value={dateFilter}
//                     onChange={(e) => setDateFilter(e.target.value)}
//                     className="filter-input"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Filter by Doctor"
//                     value={doctorFilter}
//                     onChange={(e) => setDoctorFilter(e.target.value)}
//                     className="filter-input"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Filter by state"
//                     value={stateFilter}
//                     onChange={(e) => setStateFilter(e.target.value)}
//                     className="filter-input"
//                 />
//             </div>

//             {/* Perscriptions list */}
//             <div className='perscription-list'>
//                 {perscriptions.length > 0 ? (
//                     perscriptions.map((perscription, index) => (
//                     perscription ? (
//                 <PerscriptionDetails key={perscription._id || index} perscription={perscription} />
//             ) : (
//                 <p></p>
//             )
//         ))
//     ) : (
//         <p></p>
//     )}
// </div>
//         </div>
//     );

    
// };

// export default Perscription;
