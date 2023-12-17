import { useAuthContext } from '../hooks/useAuthContext';


const AdminDetails = ({ admin }) => {
  const {user} = useAuthContext()


    const handleClick = async () => {
      const response = await fetch('/api/Admin/' + admin._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      window.location.reload();
  }

    return (
<div id="doctors" className="doctors">
<div className="container">
        <div className="row">
        <div className="col-lg">
    <div className="member d-flex align-items-start">
        <div className="member-info"> 
        <h4>{admin.id}</h4>
        <p><strong>Username: </strong>{admin.username}</p>
        <p><strong>Creation Date: </strong>{admin.createdAt}</p>
        <button className='button-41' onClick={handleClick}>delete</button>
        </div>
        </div>
        </div>
        </div>
        </div>
    <br />
    </div>  
)
  }
  
  export default AdminDetails