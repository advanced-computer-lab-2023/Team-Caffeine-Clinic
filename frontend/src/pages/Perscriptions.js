import { useEffect, useState } from 'react'
import DoctorDetails from '../components/DoctorDetails';
import PerscriptionDetails from '../components/PerscriptionDetails';

const Perscription = () => {

    const [perscriptions, setPerscription] = useState(null);
    const [dateFilter, setDateFilter] = useState('');
    const [doctorFilter, setDoctorFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');

    useEffect(() => {
      const fetchPerscription = async () => {
        let url = '/api/perscription';

        const params = new URLSearchParams();
        if (dateFilter) params.append('date', dateFilter);
        if (doctorFilter) params.append('doctor', doctorFilter);
        if (stateFilter) params.append('state', stateFilter);
        if (params.toString()) url += `?${params.toString()}`;

        console.log(url)
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
            setPerscription(json)
            console.log(json);
        }
      }
      fetchPerscription();
    }, [dateFilter, doctorFilter, stateFilter])

    return (
      <div className="doctors">
        {/* Filter section */}
        <div className="filters">
          <input 
            type="text" 
            placeholder="Filter by Date" 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)} 
            className="filter-input"
          />
          <input 
            type="text" 
            placeholder="Filter by Doctor" 
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="filter-input" 
          />
             <input 
            type="text" 
            placeholder="Filter by state" 
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="filter-input" 
          />
        </div>

        {/* Perscriptions list */}
        <div className='doctors'>
          {perscriptions && perscriptions.map((perscription) => (
            <PerscriptionDetails key={perscription._id} perscription={perscription} />
          ))}
        </div>
      </div>
  )
}

export default Perscription;