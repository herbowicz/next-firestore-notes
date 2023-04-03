import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NoteOperations from '../components/NoteOperations'

const Dashboard = () => {
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
