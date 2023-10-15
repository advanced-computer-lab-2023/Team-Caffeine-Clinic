import { useState } from 'react'

const AdminForm = () => {
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const admin = {Username,Password}
    
    const response = await fetch('/api/Admin/addAdmin', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setUsername('')
      setPassword('')
      console.log('new Admin added:', json)
    }
    window.location.reload();

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Admin</h3>

      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={Username}
      />

      <label>Password:</label>
      <input 
        type="password"  
        onChange={(e) => setPassword(e.target.value)} 
        value={Password}
      />

      <button>Add Admin</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AdminForm