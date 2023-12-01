import { useState } from 'react'
import { useMedicinesContext } from '../hooks/useMedicinesContext'
import { useAuthContext } from '../hooks/useAuthContext'


const MedicineForm = () => {
  const { dispatch } = useMedicinesContext()
  const [Name, setName] = useState('')
  const [Price, setPrice] = useState('')
  const [Description, setDescription] = useState('')
  const [Quantity, setQuantity] = useState('')
  const [activeIngredients, setactiveIngredients] = useState('')
  const [error, setError] = useState(null)
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const medicine = {Name, Price, Description,activeIngredients,Quantity}
    
    const response = await fetch('/api/medicine/addMedicine', {
      method: 'POST',
      body: JSON.stringify(medicine),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setPrice('')
      setDescription('')
      setQuantity('')
      setactiveIngredients('')
      dispatch({type: 'CREATE_MEDICINE', payload: json})
      setTimeout(function(){
        window.open(`/Medicines`,'_self');
   }, 1500);
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Medicine</h3>

      <label>Medicine Name:</label>
      <input 
        type="text"
        required = {true} 
        onChange={(e) => setName(e.target.value)} 
        value={Name}
      />

      <label>Price:</label>
      <input 
        type="number" 
        required = {true} 
        onChange={(e) => setPrice(e.target.value)} 
        value={Price}
      />

      <label>Quantity:</label>
      <input 
        type="number" 
        required = {true} 
        onChange={(e) => setQuantity(e.target.value)} 
        value={Quantity}
      />

      <label>Description:</label>
      <input 
        type="text" 
        required = {true}  
        onChange={(e) => setDescription(e.target.value)} 
        value={Description} 
      />
      
      <label>Active Ingredients:</label>
      <input 
        type="text" 
        required = {true}    
        onChange={(e) => setactiveIngredients(e.target.value)} 
        value={activeIngredients} 
      />

      <button>Add Medicine</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default MedicineForm