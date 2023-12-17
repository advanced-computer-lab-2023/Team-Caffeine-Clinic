import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'

const EditResults = () => {
  const [Edit, setEdit] = useState('')
  const {Name} = useParams() 
  const [Price, setPrice] = useState('')
  const [activeIngredients, setactiveIngredients] = useState('')
  const [error, setError] = useState(null)
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const medicine = {Name,  Price, activeIngredients}
    
    const response = await fetch('/api/medicine/editMedicine', {
      method: 'PUT',
      body: JSON.stringify(medicine),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setEdit("Error");
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setPrice('')
      setactiveIngredients('')
      setEdit("Edited");
      setTimeout(function(){
        window.open(`/Medicines`,'_self');
   }, 1500);
   
    }

  }

  return (
    <><header>
      <Navbar />
      <div className="title-section text-center col-12">
    <h2 >Edit Medicine</h2>
   </div>
    </header><form className="Add_Med" onSubmit={handleSubmit}>

        <label>Price:</label>
        <input
          type="number"
          required
          onChange={(e) => setPrice(e.target.value)}
          value={Price} />

        <label>Active Ingredients:</label>
        <input
          type="text"
          required
          onChange={(e) => setactiveIngredients(e.target.value)}
          value={activeIngredients} />

        <button>Save changes</button>
        <label> {Edit} </label>
        {error && <div className="error">{error}</div>}
      </form></>
  )
}

export default EditResults