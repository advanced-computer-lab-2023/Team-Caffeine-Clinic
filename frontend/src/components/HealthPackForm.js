import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';

const HealthPackForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [servicesIncluded, setServices] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [docSession, setdocSession] = useState('')
  const [medicine, setMedicine] = useState('')
  const [family, setFamily] = useState('')
  const [error, setError] = useState(null)
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()


    const hp = {name,description,servicesIncluded,basePrice,docSession,medicine,family}
    console.log(JSON.stringify(hp));
    
    const response = await fetch('/api/Admin/createHealthPackage', {
      method: 'POST',
      body: JSON.stringify(hp),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setDescription('')
      setServices('')
      setBasePrice('')
      setdocSession('')
      setFamily('')
      setMedicine('')
      console.log('new Health Package added:', json)
    }

    window.location.reload();
  }
 


  return (
    <section id="appointment" class="appointment section-bg">

    <div class="container">
    <div class="section-title">
    <h2>Add a New Health Package</h2>
   </div> 
  
    <form className="create php-email-form" onSubmit={handleSubmit}> 
    <div class="row">
      <div className="col-md-4 form-group">
      <label>Name:</label>
      <input 
        type="text" 
        className="form-control"
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />
      </div>
      <div className="col-md-4 form-group mt-3 mt-md-0">
      <label>Description:</label>
      <input 
        type="text"  
        className="form-control"
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
      />
      </div>
      <div className="col-md-4 form-group mt-3 mt-md-0">
      <label>Services:</label>
      <input 
        type="text" 
        className="form-control" 
        onChange={(e) => setServices(e.target.value)} 
        value={servicesIncluded}
      />
      </div>
      </div>

      <div className="row">
          <div className="col-md-4 form-group mt-3">
      <label>Base Price:</label>
      <input 
        type="text"  
        className="form-control"
        onChange={(e) => setBasePrice(e.target.value)} 
        value={basePrice}
      />
      </div>
      <div className="col-md-4 form-group mt-3">
      <label>Doctor Session Discount:</label>
      <input 
        type="text"  
        className="form-control"
        onChange={(e) => setdocSession(e.target.value)} 
        value={docSession}
      />
      </div>
      <div className="col-md-4 form-group mt-3">
      <label>Pharmacy medicine discount:</label>
      <input 
        type="text" 
        className="form-control" 
        onChange={(e) => setMedicine(e.target.value)} 
        value={medicine}
      />
      </div>
      <div className="col-md-4 form-group mt-3">
      <label>Family Member Discount:</label>
      <input 
        type="text"  
        className="form-control"
        onChange={(e) => setFamily(e.target.value)} 
        value={family}
      />
      </div>
      </div>
      <div className="text-center"><button type="submit">Add Health Package</button></div>
      {error && <div className="error">{error}</div>}
    </form>
    <br />
    <br />

</div>
</section>

  )
}

export default HealthPackForm