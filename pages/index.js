import { useState, useEffect } from 'react'
import { Container, Table, Image } from 'react-bootstrap'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../firebase'

const dbInstance = collection(database, 'users');

const Home = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		onSnapshot(dbInstance, docsSnap => {
			docsSnap.forEach(doc => {
				setUsers((users) => [...users, doc.data()])
			})
		})
	}, [])

	return (
		<div style={{
			width: '100vw',
			height: 'calc(100vh - 100px)',
		}}>
			<div style={{
				color: '#20344f'
			}}>
				<div>
					<h1 className="text-center">Hello!</h1>
					<p className="text-center">Login or Signup to continue...</p>
				</div>
			</div>
		</div>
	)
}

export default Home
