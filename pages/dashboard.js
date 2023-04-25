import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NoteOperations from '../components/NoteOperations'
import Navbar2 from '../components/Navbar2'

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
                <Navbar2 title={'Dashboard'}/>
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
