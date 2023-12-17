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
    <section id="appointment" class="appointment section-bg">

    <div class="container">
    <div class="section-title">
    <h2>Add a New Admin</h2>
   </div> 

       <form className="create php-email-form" onSubmit={handleSubmit}> 
       <div class="row">
       <div className="col-md-4 form-group">
      <label>Username:</label>
      <input 
        type="text" 
        className="form-control"
        onChange={(e) => setUsername(e.target.value)} 
        value={Username}
      />
      </div>
      <div className="col-md-4 form-group mt-3 mt-md-0">
      <label>Password:</label>
      <input 
        type="password" 
        className="form-control" 
        onChange={(e) => setPassword(e.target.value)} 
        value={Password}
      />
      </div>
      <div className="col-md-4 form-group mt-3 mt-md-0">
      <label>Email:</label>
      <input 
        type="email"  
        className="form-control"
        onChange={(e) => setEmail(e.target.value)} 
        value={Email}
      />
      </div>
      </div>

      <div className="text-center"><button type="submit">Add Admin</button></div>
      {error && <div className="error">{error}</div>}
    </form>
    <br />
    <br />

</div>
</section>
  )
}

export default AdminForm