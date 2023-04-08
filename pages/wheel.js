import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import WheelOfFortune from '../WheelOfFortune/Wheel'
import { useUser } from '../context/userContext'

const Wheel = () => {
    const { user } = useUser()

    const [spinning, setSpinning] = useState(false)
    const [flag, setFlag] = useState(false)

    const showPoints = (value, points, time) => {     
        setTimeout(() => {
            flag || setFlag(true)
            console.log(Math.floor((value % 360)/18), points)
            setSpinning(false)
        }, time * 1000)
        
    }

    return (
        <Container>
            <h3>Wheel of Fortune</h3>
            <hr />
            <Row>
                <h5>{ spinning ? 'Spinning...' : flag ? `Your score is ${user.points} points.` : `Try your luck now!` }</h5>
            </Row>
            <Row>
                <WheelOfFortune showPoints={showPoints} spinning={spinning} setSpinning={setSpinning} />
            </Row>
        </Container>
    )
}

export default Wheel