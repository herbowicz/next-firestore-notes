import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import NoteOperations from '../components/NoteOperations'
import NoteDetails from '../components/NoteDetails'

const Dashboard = () => {
    const { user } = useAuth()
    const [ID, setID] = useState(null)
    const getSingleNote = (id) => {
        setID(id)
    }

    return (
        <>
            <title>herbowicz.vercel.app</title>
            <meta name="description" content="This is a herbowicz.vercel app" />
            <link rel="icon" href="/favicon.ico" />

            <Container>
                <h3><p>Dashboard</p></h3>
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
