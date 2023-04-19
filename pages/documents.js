import { Container, Row } from 'react-bootstrap'
import UploadFile from '../components/UploadFile'
import ShowFiles from '../components/ShowFiles'

const Documents = () => {
    return (
        <Container>
            <h3>Documents</h3>
            <hr />
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