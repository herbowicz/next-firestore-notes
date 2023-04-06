import { Container, Row } from 'react-bootstrap'
import WheelOfFortune from '../WheelOfFortune/Wheel'

const Wheel = () => {
    return (
        <Container>
            <h3>Wheel of Fortune</h3>
            <hr />
            <Row>
                <h5>Try your luck now!</h5>
            </Row>
            <Row>
                <WheelOfFortune />
            </Row>
        </Container>
    )
}

export default Wheel