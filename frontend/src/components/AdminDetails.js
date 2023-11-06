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
      <div className="Admin-details">
        <h4>{admin.id}</h4>
        <p><strong>Username: </strong>{admin.username}</p>
        <p>{admin.createdAt}</p>
        <span onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default AdminDetails