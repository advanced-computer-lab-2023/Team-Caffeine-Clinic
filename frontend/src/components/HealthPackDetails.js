const HealthPackdetails = ({ hp }) => {

  const handleClick = async () => {
    const response = await fetch('/api/Admin/deleteHealthPackage/' + hp._id, {
      method: 'DELETE'
    })
    const json = await response.json()
}

    return (
      <div className="Admin-details">
        <h4>{hp.id}</h4>
        <p><strong>name: </strong>{hp.name}</p>
        <p><strong>Description: </strong>{hp.description}</p>
        <p><strong>Services Included: </strong>{hp.servicesIncluded}</p>
        <p><strong>Base Price: </strong>{hp.basePrice}</p>
        {/* <p><strong>Discounts: </strong>{hp.discounts}</p> */}
        <p>{hp.createdAt}</p>
        <span onClick={handleClick}>Delete</span>
        {/* <span onClick={handleClick}>Update</span> */}
      </div>
    )
  }
  
  export default HealthPackdetails