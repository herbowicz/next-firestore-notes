import { Container, Row } from 'react-bootstrap'
import UserDetails from '../components/UserDetails'

const Edit = () => {

    return (
        <Container>
            <h3>Edit</h3>
            <hr />
            <Row className="my-4 mx-1">
                Edit user details, set them as public or private
            </Row>
            <Row>
                <UserDetails />
            </Row>
        </Container>
    )
}

export default Edit