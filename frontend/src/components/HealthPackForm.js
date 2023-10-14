import { useState } from 'react'

const HealthPackForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [servicesIncluded, setServices] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [docSession, setdocSession] = useState('')
  const [medicine, setMedicine] = useState('')
  const [family, setFamily] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hp = {name,description,servicesIncluded,basePrice}
    console.log(JSON.stringify(hp));
    
    const response = await fetch('/api/Admin/createHealthPackage', {
      method: 'POST',
      body: JSON.stringify(hp),
      headers: {
        'Content-Type': 'application/json'
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

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Health Package</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />

      <label>Description:</label>
      <input 
        type="text"  
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
      />

      <label>Services:</label>
      <input 
        type="text"  
        onChange={(e) => setServices(e.target.value)} 
        value={servicesIncluded}
      />

      <label>Base Price:</label>
      <input 
        type="text"  
        onChange={(e) => setBasePrice(e.target.value)} 
        value={basePrice}
      />

      <label>Doctor Session Discount:</label>
      <input 
        type="text"  
        onChange={(e) => setdocSession(e.target.value)} 
        value={docSession}
      />
      <label>Pharmacy medicine discount:</label>
      <input 
        type="text"  
        onChange={(e) => setMedicine(e.target.value)} 
        value={medicine}
      />
      <label>Family Member Discount:</label>
      <input 
        type="text"  
        onChange={(e) => setFamily(e.target.value)} 
        value={family}
      />

      <button>Add Health Package</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default HealthPackForm