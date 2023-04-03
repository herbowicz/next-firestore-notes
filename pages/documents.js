import { Container, Row } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import UploadFile from '../components/UploadFile'
import ShowFiles from '../components/ShowFiles'

const Documents = () => {
    const { user } = useAuth()

    return (
        <Container>
            <h3>Documents</h3>
            <hr />
            <Row>
                <h4>{user.displayName}</h4>
            </Row>
            <Row>
                <ShowFiles />
            </Row>
            <Row className="w-25 p-3">
                <UploadFile  />
            </Row>
        </Container>
    )
}

export default Documents