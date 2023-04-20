import styles from './Wheel.module.css'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Container, Row } from 'react-bootstrap'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { database } from '../firebase'
import { useDbUser } from '../context/userContext'
import { useAuth } from '../context/authContext'


const Wheel = () => {
    const { dbUser, setDbUser } = useDbUser()
    const { user } = useAuth()

    const [flag, setFlag] = useState(false)
    const [spinning, setSpinning] = useState(false)
    const [value, setValue] = useState(0)
    const [total, setTotal] = useState(dbUser?.points)
    const [score, setScore] = useState(null)
    const [last, setLast] = useState([])

    const time = 2
    const fields = useMemo(() => [40, 0, 90, 1, 80, 2, 70, 3, 60, 4, 50, 5, 100, 6, 30, 7, 20, 8, 10, 9], [])
    const colorArray = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF",
        "#20344F"
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const winning = () => {
        const angle = 360 / fields.length
        const win = angle - Math.floor((value % 360) / angle)
        const winPos = win => win === -1 ? 19 : win === 0 ? 20 : win
        console.log(score, fields[winPos(win) - 1])
        return fields[winPos(win) - 1]
    }

    useEffect(() => {
        if (flag) {
            setScore(winning())
        }
    }, [flag, last, winning])

    const updateUserPoints = (points) => {
        const c = doc(database, 'users', user.email)
        getDoc(c)
            .then(data => data.data())
            .then(data => updateDoc(c, { ...data, points }))
            .then(() => {
                console.log('Points updated!')
            })
            .catch(err => console.log(err))
    }

    const spin = () => {
        console.log('hit')
        setSpinning(true)
        const rand = Math.round(Math.random() * 3600)
        setValue(value => value + rand)

        score !== null && setLast([score, ...last])
        setTotal(total + score)
        setFlag(true)

        console.log('total po hicie', total, ' score ', score)

        // frontend
        setDbUser({ ...dbUser, points: total },)
        // backend
        updateUserPoints(total)

        setTimeout(() => {
            setSpinning(false)
        }, time * 1000)
    }

    const pointerEvents = spinning ? 'none' : 'auto'

    return (
        <Container>
            <h3>Wheel of Fortune</h3>
            <hr />
            <Row>
                <h5>{spinning ? 'Spinning ...' : flag ? `Your score is ${score}. ${score > 50 ? 'Well done!' : ''}` : `Try your luck now!`}</h5>
                {last.length > 0 && <h6>Last: {JSON.stringify(last, null, 2)}</h6>}
                <h6>Total: {total}</h6>
            </Row>
            <Row>
                <div className={styles.container}>
                    {/* <div className={styles.v}></div>
                    <div className={styles.h}></div> */}
                    <div className={styles.spin__btn} style={{ pointerEvents }} onClick={spin}>Spin</div>
                    <div className={styles.wheel} style={{ transform: `rotate(${value}deg)`, '--time': time }}>
                        {fields.map((el, i) => (
                            <div key={i} className={styles.number} style={{
                                '--angle': 360 / fields.length,
                                '--i': i,
                                '--clr': colorArray[i]
                            }}>
                                <span>{el}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default Wheel