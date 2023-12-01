import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import MedicineDetails from './MedicineDetails'

const OrderDetails = ({ order }) => {
  const {user} = useAuthContext()
  const [Status,setStatus] = useState(order.status)
  const [error, setError] = useState(null)



  let CancelOrder = async (e) => {

    e.preventDefault()
    const response = await fetch(`/api/patient/cancelorder/${order._id}`,{
          method:'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })

    if (response.status==200) {
      setStatus('Cancelled and Refunded')
    }
    if (response.status==400) {
      setStatus(order.status)
      setError("Cannot Delete")
    } 
  }
  



  return (
    <form style={{marginBottom:"-20px"}} className="create" >
      <div className="workout-details">
        {/* {console.log(order.medicines)} */}
        {user && order.medicines && order.medicines.map(medicine => (
          <MedicineDetails key={medicine._id} medicine={medicine} />
        ))}

        <p style={{fontSize:"20px"}}><strong>Total Price:</strong>{order.totalPrice}</p>
        <br></br>

        <p><strong>Status : </strong>{Status}</p>
        <p><strong>Delivery Address : </strong>{order.deliveryaddress}</p>
        {Status!='Cancelled' && Status!='Cancelled and Refunded' && Status != 'Delivered' &&<button onClick={CancelOrder}> Cancel</button>}
        {error && <div className="error">{error}</div>}
        
      </div>
      <br></br><br></br><br></br>
    </form>
  )
}

export default OrderDetails