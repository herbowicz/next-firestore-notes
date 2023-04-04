import { useState, useEffect } from 'react'
import { Table, Image } from 'react-bootstrap'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../firebase'

const dbInstance = collection(database, 'users');

const HallOfFame = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		onSnapshot(dbInstance, docsSnap => {
			docsSnap.forEach(doc => {
				setUsers((users) => [...users, doc.data()])
			})
		})
	}, [])

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Title</th>
					<th>Points</th>
				</tr>
			</thead>
			<tbody>
				{users
					.sort((a, b) => (a.points < b.points) ? 1 : -1)
					.map((el, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>
								<Image src={el.photoURL} width='22' height='22' alt='' />{' '}
								{el.displayName || el.email}
							</td>
							<td>{el.title || '[No Title]'}</td>
							<td>{el.points}</td>
						</tr>
					))}
			</tbody>
		</Table>
	)
}

export default HallOfFame