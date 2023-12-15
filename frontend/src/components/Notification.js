import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from 'react'

const Notification = () => {
    const [notifications, setNotifications] = useState(null)
    const user = useAuthContext()

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
        <div>
            <div className='box'>
                <h3>Notifications</h3>
                {notifications && notifications.map((notification, index) => (
                    <div key={index}>
                        <p><strong>Title:</strong> {notification.title}</p>
                        <p>{notification.body}</p>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Notification