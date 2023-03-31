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
                <Row>
                    <div>
                        <h5>You are logged in as: {user.email}</h5>
                        This route is protected. Your ID is: {user.uid}
                        <hr />
                    </div>
                </Row>
                <Row>
                    <Col md>
                        <NoteOperations getSingleNote={getSingleNote} />
                    </Col>
                    <Col md>
                        <NoteDetails ID={ID} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard
