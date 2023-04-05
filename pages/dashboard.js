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
