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
    const activeIngredientsArray = activeIngredients.split(',');
    const medicine = {Name, Price, Description,activeIngredientsArray,Quantity}
    
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
    <>
    <div className="title-section text-center col-12">
    <h2 >Add a New Medicine</h2>
   </div>
    <form className="Add_Med" onSubmit={handleSubmit}>
      <label>Medicine Name:</label>
      <input
        type="text"
        required={true}
        onChange={(e) => setName(e.target.value)}
        value={Name} />
      <br></br>
      <label>Price:</label>
      <input
        type="number"
        required={true}
        onChange={(e) => setPrice(e.target.value)}
        value={Price} />
      <br></br>
      <label>Quantity:</label>
      <input
        type="number"
        required={true}
        onChange={(e) => setQuantity(e.target.value)}
        value={Quantity} />
      <br></br>
      <label>Description:</label>
      <input
        type="text"
        required={true}
        onChange={(e) => setDescription(e.target.value)}
        value={Description} />
      <br></br>
      <label>Active Ingredients
        (format:"MainIngredient,Ing2,Ing3,..."):</label>
      <input
        type="text"
        required={true}
        onChange={(e) => setactiveIngredients(e.target.value)}
        value={activeIngredients} />
      <br></br>
      <button>Add Medicine</button>
      {error && <div className="error">{error}</div>}
    </form></>
  )
}

export default MedicineForm