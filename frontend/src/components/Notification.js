import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from 'react'
import Toast from 'react-toast-component';

const Notification = () => {
    const [notifications, setNotifications] = useState(null)
    const user = useAuthContext()
    const [isOpen, setToast] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                let response = await fetch('/api/patient/getNotification', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.user.token}`
                    },
                })

                if (response.status === 404) {
                    response = await fetch('/api/doctorInfo/getNotification', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${user.user.token}`
                        },
                    })
                }
                if (response.status === 404) {
                    response = await fetch('/api/medicine/getNotification', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${user.user.token}`
                        },
                    })
                }
                if (response.ok) {
                    const data = await response.json()
                    setNotifications(data.notifications)
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (user) {
            fetchNotifications()
        }
    }, [user])

    return (
    <div className="App" style={{z:{index: "9999"}}}>
      {notifications &&  notifications.map((notification, index) => (
    <Toast
        isOpen={isOpen}
      hasAutoDismiss={false}
      hasCloseBtn
      closeCallback={() => setToast(false)}
      description={notification.body}
      title={notification.title}
      duration={5000}
      classNames={['info']} 
    />
    ))}
  </div>
    )
}

export default Notification