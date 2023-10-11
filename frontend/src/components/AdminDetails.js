const AdminDetails = ({ admin }) => {

    const handleClick = async () => {
      const response = await fetch('/api/Admin/' + admin._id, {
        method: 'DELETE'
      })
      const json = await response.json()
      // if (response.ok) {
      //   dispatch({type: 'DELETE_WORKOUT', payload: json})
      // }
    }

    return (
      <div className="Admin-details">
        <h4>{admin.id}</h4>
        <p><strong>Username: </strong>{admin.Username}</p>
        <p><strong>Password: </strong>{admin.Password}</p>
        <p>{admin.createdAt}</p>
        <span onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default AdminDetails