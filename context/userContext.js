import { createContext, useContext, useState, useEffect } from 'react'

export const UserContext = createContext({})

export const useUser = () => useContext(UserContext)

export const UserContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState({
        points: null
    })
    const value = { user, setUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider