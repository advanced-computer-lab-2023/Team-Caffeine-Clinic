import { useAuthContext } from '../hooks/useAuthContext';

const HealthPackdetails = ({ hp }) => {
  const {user} = useAuthContext()

  const handleClick = async () => {
    const response = await fetch('/api/Admin/deleteHealthPackage/' + hp._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    window.location.reload();
}

let handleSubmit = async (e) => {

  e.preventDefault()

  window.open(`/editHP/${hp._id}`,"_self");
}

    return (
      <div className="Admin-details">
        <h4>{hp.id}</h4>
        <p><strong>name: </strong>{hp.name}</p>
        <p><strong>Description: </strong>{hp.description}</p>
        <p><strong>Services Included: </strong>{hp.servicesIncluded}</p>
        <p><strong>Base Price: </strong>{hp.basePrice}</p>
        <p><strong>Doctor Discount: </strong>{hp.discounts.doctorSession}</p>
        <p><strong>Family member Discount: </strong>{hp.discounts.pharmacyMedicine}</p>
        <p><strong>Pharmacy Medicine Discount: </strong>{hp.discounts.familySubscription}</p>
        {/* <p><strong>Discounts: </strong>{hp.discounts}</p> */}
        <p>{hp.createdAt}</p>
        <span className="span1 "onClick={handleClick}>Delete</span>
        <br />
        <span className="span2" onClick={handleSubmit}>Edit</span>
        {/* <span onClick={handleClick}>Update</span> */}
      </div>

    )
  }
  
  export default HealthPackdetails