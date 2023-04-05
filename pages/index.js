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
				color: 'white',
				padding: 50
			}}>
				<div>
					<h1 className="text-center">Hello!</h1>
					<p className="text-center">Login or Signup to continue...</p>
				</div>
				<div style={{
					fontFamily: "'Bungee', cursive",
					fontSize: '20vh',
					lineHeight: '17vh',
					width: '250px',
					height: '500px',
					margin: '70px auto',
					// transform: 'rotate(270deg) translate(0, 100px)',
				}}>
				<table>
						<tr><td>d</td><td>a</td></tr>
						<tr><td>e</td><td>2</td></tr>
						<tr><td>v</td><td>p</td></tr>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Home
