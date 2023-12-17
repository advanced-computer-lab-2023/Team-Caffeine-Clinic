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
    <form style={{marginBottom:"-20px"}} className="create"  >
        {/* {console.log(order.medicines)} */}
        <div className="site-section" id="shop">
          <div className="container">
            <div className="row">
              <div className="title-section text-center col-12">
                <h2 className="text-uppercase">Medicines</h2>
              </div>
            </div>   

            <div className="row">
              {user && order.medicines && order.medicines.map(medicine => (
                <div key={order._id} className="col-sm-6 col-lg-4 text-center item mb-4">
                  <MedicineDetails key={medicine._id} medicine={medicine} />
                </div>
              ))}
              
        <div className="text-center">
        <div>
          <p style={{fontSize:"20px"}}><strong>Total Price:</strong>{order.totalPrice}</p>
          <br></br>
          <p><strong>Delivery Address : </strong>{order.deliveryaddress}</p>
          <p><strong>Status : </strong>{Status}</p>
          {Status !== 'Cancelled' && Status !== 'Cancelled and Refunded' && Status !== 'Delivered' && <button onClick={CancelOrder}> Cancel</button>}
          {error && <div className="error">{error}</div>}

          <br></br><br></br><br></br>
        </div>
        </div>
            </div >
          </div>
        </div>
    </form>
  )
}

export default OrderDetails