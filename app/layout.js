import './global.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'a2p',
  description: 'a2p.dev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
