import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from 'react'

import Toast from 'react-toast-component';
import { useDisclosure } from "@chakra-ui/hooks";
import NotificationList from './notificationList';
import ChatLoading from "./ChatLoading";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
  } from "@chakra-ui/modal";
import { ChakraProvider } from '@chakra-ui/react';



const Notification = () => {
    const [notifications, setNotifications] = useState(null)
    const user = useAuthContext()

    const [isOpen, setToast] = useState(true);
    const { isSideOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);



    useEffect(() => {
        const fetchNotifications = async () => {

            try {
                let response = await fetch('/api/patient/getNotification', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.user.token}`
                    },
                })


                if (response.status === 404 || response.status === 500 ) {

                if (response.status === 500) {

                    response = await fetch('/api/doctorInfo/getNotification', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${user.user.token}`
                        },
                    })
                }

                if (response.status === 404 || response.status === 500) {
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
                    setLoading(false);

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


        <>
        <div className="App" style={{ z: { index: "9999" } }}>
        <ChakraProvider><Drawer  placement="left" onClose={onClose} isOpen={true}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Notifications</DrawerHeader>
                <DrawerBody>
                    {loading ? (
                        <ChatLoading />
                    ) : (
                        notifications?.map((notification) => (
                            <NotificationList
                                key={notification.title}
                                notification={notification} />
                        ))
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
        </ChakraProvider>
                {notifications && notifications.map((notification, index) => (
                    <Toast
                        isOpen={isOpen}
                        hasAutoDismiss={false}
                        hasCloseBtn
                        closeCallback={() => setToast(false)}
                        description={notification.body}
                        title={notification.title}
                        duration={5000}
                        classNames={['info']} />
                ))}
            </div></>

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