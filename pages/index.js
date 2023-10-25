import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../firebase'
import { useAuth } from '../context/authContext'

const dbInstance = collection(database, 'users');

const Home = () => {
	const { user } = useAuth()
	const [users, setUsers] = useState([])

	// useEffect(() => {
	// 	onSnapshot(dbInstance, docsSnap => {
	// 		docsSnap.forEach(doc => {
	// 			setUsers((users) => [...users, doc.data()])
	// 		})
	// 	})
	// }, [])

	return (
		<div style={{
			width: '100vw',
			height: 'calc(100vh - 100px)',
		}}>
			<div style={{
				color: '#20344f'
			}}>
				<div>
					<h1 className="text-center">Hi!</h1>
					<p className="text-center">{user ? `Welcome ${user.displayName || user.ncik}`: `Login or Signup to continue...`}</p>
				</div>
			</div>
		</div>
	)
}

export default Home
