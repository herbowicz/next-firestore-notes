'use client'

import { createContext, useContext, useState } from 'react'

export const UserContext = createContext({})

export const useDbUser = () => useContext(UserContext)

export const UserContextProvider = ({
    children,
}) => {
    const [dbUser, setDbUser] = useState({
        points: null,
        nickname: '',
        about: '',
        role: ''
    })
    const value = { dbUser, setDbUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
