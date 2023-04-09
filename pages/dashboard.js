import React, { useState, useEffect } from 'react'
import { database } from '../firebase';
import { doc, getDoc } from 'firebase/firestore'
import { Container, Row, Col } from 'react-bootstrap'
import NoteOperations from '../components/NoteOperations'
import { useDbUser } from '../context/userContext'
import { useAuth } from '../context/authContext'

const Dashboard = () => {
    const { setDbUser } = useDbUser()
    const { user } = useAuth()
    const [ID, setID] = useState(null)
    const getSingleNote = (id) => {
        setID(id)
    }

    useEffect(() => {
        const getDbUser = async () => {
            if (user) {
                const userData= doc(database, 'users', user?.email)
                const data = await getDoc(userData)
                setDbUser(data.data())
            }
        }
        getDbUser()
    }, [])

    return (
        <>
            <title>a2p.dev</title>
            <meta name="description" content="a2p.dev" />
            <link rel="icon" href="/logo.png" />

            <Container>
                <h3>Dashboard</h3>
                <hr />
                <Row>
                    <Col>
                        <NoteOperations getSingleNote={getSingleNote} ID={ID} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard
