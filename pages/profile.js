import { Container, Row } from 'react-bootstrap'
import UserDetails from '../components/UserDetails'

const Profile = () => {

    return (
        <Container>
            <h3>Profile</h3>
            <hr />
            <Row>
                <UserDetails />
            </Row>
        </Container>
    )
}

export default Profile