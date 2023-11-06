import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';


import Navbar from '../components/Navbar'

const EditHealthPackage = () => {
    const {id} = useParams() 
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [services, setServices] = useState('')
    const [basePrice, setBasePrice] = useState('')
    const [docSession, setdocSession] = useState('')
    const [medicine, setMedicine] = useState('')
    const [family, setFamily] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
    e.preventDefault()
    
    const hp = {id, name, description, services, basePrice}
    
    const response = await fetch('http://localhost:4000/api/Admin/updateHealthPackage/' + id, {
      method: 'PATCH',
      body: JSON.stringify(hp),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setDescription('')
      setServices("");
      setBasePrice("");
      setdocSession('')
      setMedicine('')
      setFamily('')
    }

  }

  return (
    <><header>
      <nav>
        <Link className="home-button" to="/AdminHome">Home</Link>
      </nav>
    </header><form className="create" onSubmit={handleSubmit}>
        <h3>edit HealthPackage</h3>

        <label>Name:</label>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          value={name} />

        <label>Description:</label>
        <input
          type="text"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description} />
          
        <label>Services:</label>
        <input
          type="text"
          required
          onChange={(e) => setServices(e.target.value)}
          value={services} />

        <label>BasePrice:</label>
        <input
          type="number"
          required
          onChange={(e) => setBasePrice(e.target.value)}
          value={basePrice} />

        <label>Doctor Session Discount:</label>
        <input
          type="number"
          required
          onChange={(e) => setdocSession(e.target.value)}
          value={docSession} />

        <label>Medicine Session Discount:</label>
        <input
          type="number"
          required
          onChange={(e) => setMedicine(e.target.value)}
          value={medicine} />

        <label>Family Member Discount:</label>
        <input
          type="number"
          required
          onChange={(e) => setFamily(e.target.value)}
          value={family} />

        <button>Save changes</button>
        {/* <label> {Edit} </label> */}
        {error && <div className="error">{error}</div>}
      </form></>
  )
}

export default EditHealthPackage