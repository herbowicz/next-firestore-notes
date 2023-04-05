import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '../context/authContext'
import ProtectedRoute from '../components/ProtectedRoute'

const noAuthRequired = ['/', '/login', '/signup']

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AuthContextProvider>
      <Navbar />
      <div style={{
        background: '#20344f'
      }}>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </div>
    </AuthContextProvider>
  )
}
