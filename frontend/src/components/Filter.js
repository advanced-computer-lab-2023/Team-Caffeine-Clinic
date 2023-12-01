import { useEffect, useState } from 'react'

const Filter = () => {

  const [Medicines, setMedicines] = useState(null)

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch('/api/medicine/viewDistinct')
      const json = await response.json()

      if (response.ok) {
        setMedicines(json)
      }
    }

    fetchMedicines()
  }, [])


  const [Use, setUse] = useState("")

  let handleSubmit = async (e) => {

    e.preventDefault()

    if(Use!==""){
    window.open(`/filter/${Use}`,"_self");
      setUse("Filter Results")
    }


  }

  return (
    <form className="create" onSubmit={handleSubmit}>
    {/* Displaying the value of med */}
    <strong>{"Filter Medicines"}</strong>
    <br />

    <select onChange={(e) =>  setUse(e.target.value)}> 
      <option value="">-- Select a medical use -- </option>
            {/* Mapping through each med object in our meds array
          and returning an option element with the appropriate attributes / values.
         */}
      {Medicines && Medicines.map((Medicine) => <option value={Medicine}>{Medicine}</option>)}
    </select>
    <button style={{height:37 , marginLeft:10,marginTop:5 , background:'darkgrey'}} >Filter</button>
    </form>
  )
}

export default Filter