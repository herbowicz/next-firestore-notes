import { Container, Row } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import HallOfFame from '../components/HallOfFame'

const Recoreds = () => {
    const { user } = useAuth()

    return (
        <Container>
            <h3>Hall of Fame</h3>
            <hr />
            <HallOfFame />
        </Container>
    )
}

export default Recoreds