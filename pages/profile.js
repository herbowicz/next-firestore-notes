import { Container, Col, Row } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import UploadFile from '../components/UploadFile'

const Profile = () => {
    const { user } = useAuth()

    return (
        <Container>
            <h3><p>Profile</p></h3>
            <Row>
                You are logged in as: {user.email}
            </Row>
            <Row>
                Your ID is: {user.uid}
            </Row>
            <Row className="w-25 p-3">
                <UploadFile  />
            </Row>
        </Container>
    )
}

export default Profile