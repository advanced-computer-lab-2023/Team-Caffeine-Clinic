import { useEffect } from "react"
import { useOrdersContext } from "../hooks/useOrdersContext"
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import OrderDetails from "../components/OrderDetails"

const Orders = () => {
  const {orders, dispatch} = useOrdersContext()
  const {user} = useAuthContext()
  

  useEffect(() => {
    const fetchOrders = async () => {
      try{
        const response = await fetch('/api/patient/orders',{
              method:'GET',
              headers: {
              'Authorization': `Bearer ${user.token}`
              }
          })
        const json = await response.json()
        if (response.ok) {
          dispatch({type: 'SET_ORDER', payload: json})
        }
      }
      catch(error){
      }
    }
    fetchOrders()
     
  }, [dispatch,user])

  return (
    <><header>
      <Navbar />
    </header><div className="home">
        <div className="workouts">
          {orders && orders.map(order => (
            <OrderDetails key={order._id} order={order} />
          ))}

        </div>
      </div></>
  )
}

export default Orders