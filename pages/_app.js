import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/style.css'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore'
import { firebaseConfig } from '../firebase'
import { AuthContextProvider } from '../context/authContext'
import UserContextProvider from '../context/userContext'
import ProtectedRoute from '../components/ProtectedRoute'

const noAuthRequired = ['/', '/login', '/signup']

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const fuego = new Fuego(firebaseConfig)

  return (
  <FuegoProvider fuego={fuego}>
    <AuthContextProvider>
      <UserContextProvider>
        <Navbar />
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </UserContextProvider>
    </AuthContextProvider>
  </FuegoProvider>
  )
}
