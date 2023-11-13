import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';

const AdminForm = () => {
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [Email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const admin = {Username, Password, Email}
    
    const response = await fetch('/api/Admin/addAdmin', {
      method: 'POST',
      body: JSON.stringify(admin),
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

      <label>Email:</label>
      <input 
        type="email"  
        onChange={(e) => setEmail(e.target.value)} 
        value={Email}
      />

      <button>Add Admin</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AdminForm