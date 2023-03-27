import React from 'react'
import { useAuth } from '../context/authContext'

const Dashboard = () => {
    const { user } = useAuth()
    
    return (
        <>
            <p>This route is protected</p>
            <h5>You are logged in as: {user.email}</h5>
            <p>Your ID is: {user.uid}</p>
        </>
    )
}

export default Dashboard