import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/style.css'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import {  FuegoProvider } from '@nandorojo/swr-firestore'
import { AuthContextProvider } from '../context/authContext'
import UserContextProvider from '../context/userContext'
import ProtectedRoute from '../components/ProtectedRoute'
import { app } from '../firebase'

const noAuthRequired = ['/', '/login', '/signup']

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
  <FuegoProvider fuego={app}>
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
