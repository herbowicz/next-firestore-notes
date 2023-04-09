import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup, signInWithRedirect,
    GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider,
    fetchSignInMethodsForEmail, linkWithCredential
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email,
                    photoURL: user.photoURL
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

    function getProvider(provider) {
        switch (provider) {
            case 'google.com':
                return new GoogleAuthProvider()
            case 'github.com':
                return new GithubAuthProvider()
            case 'facebook.com':
                return new FacebookAuthProvider()
            default:
                throw new Error(`No provider implemented for ${provider}`);
        }
    }

    const socialLogin = (e) => {
        const { target: { name } } = e;
        let provider = getProvider(name)

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = provider.constructor.credentialFromResult(result)
                const token = credential?.accessToken
                const user = result.user
                // console.log({ credential, token, user })

                router.push('/dashboard')
            })
            .catch((error) => {
                const errorCode = error.code
                const email = error.customData.email
                const errorMessage = error.message
                const credential = provider.constructor.credentialFromError(error)
                console.log({ errorCode, errorMessage, email, credential })

                if (errorCode === 'auth/account-exists-with-different-credential') {
                    console.log('Account exists with different credential')

                    const login = async () => {
                        try {
                            const methods = await fetchSignInMethodsForEmail(auth, email)

                            if (methods[0] === 'password') {
                                var password = promptUserForPassword();
                                await signInWithEmailAndPassword(email, password)
                            } else {
                                await signInWithRedirect(auth, getProvider(methods[0]))
                            }

                            linkWithCredential(credential)
                        } catch (err) {
                            console.log(err)
                        }
                    }
                    login()
                    router.push('/dashboard')
                }
            })
    }

    const updatePhotoURL = url => {
        setUser({ ...user, photoURL: url })
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, socialLogin, updatePhotoURL }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
