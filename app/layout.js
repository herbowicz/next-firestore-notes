import './global.css'
import { AuthContextProvider } from '../context/authContext'
import { UserContextProvider } from '../context/authContext'

export const metadata = {
  title: 'a2p',
  description: 'a2p.dev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <AuthContextProvider>
            {/* <main>
              <UserContextProvider> */}
                <main>
                  {children}
                {/* </main>
              </UserContextProvider> */}
            </main>
          </AuthContextProvider>
        </main>
      </body>
    </html>
  )
}
