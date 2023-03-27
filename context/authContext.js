import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider, signInWithPopup 
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}) => {
    const router = useRouter()
    const provider = new GoogleAuthProvider()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    const glogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential?.accessToken
                // The signed-in user info.
                const user = result.user
                console.log({ credential, token, user })
                router.push('/dashboard')
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.email
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log({ errorCode, errorMessage, email, credential })
            })
    } 

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, glogin }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}