import styles from './Wheel.module.css'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDbUser } from '../context/userContext'
import { database } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuth } from '../context/authContext'


const Wheel = () => {
    const { dbUser, setDbUser } = useDbUser()
    const { user } = useAuth()

    const [flag, setFlag] = useState(false)
    const [spinning, setSpinning] = useState(false)
    const [value, setValue] = useState(0)
    const [total, setTotal] = useState(dbUser?.points || 0)
    const [score, setScore] = useState()

    const rand = Math.round(Math.random() * 3600)
    const time = 5
    const fields = useMemo(() =>[100,0,90,1,80,2,70,3,60,4,50,5,40,6,30,7,20,8,10,9], [])

    useEffect(() => {        
        const angle = 360/fields.length
        const win = angle - Math.floor((value % 360)/angle)
        const winPos = win => win === -1 ? 19 : win === 0 ? 20 : win
        flag && setScore(fields[winPos(win) - 1])
    }, [fields, flag, value])

    useEffect(() => {
        const timer = setTimeout(() => {
            // frontend
            setDbUser({ points: total })
            // backend
            updateUserPoints(total)

            console.log('total', total)
        }, time * 1000);
        return () => clearTimeout(timer);
    }, [setDbUser, updateUserPoints, time, total]);

    const spin = () => {
        setSpinning(true)
        setValue(value => value + rand)
        showScore(score, time)
        flag && setScore(score)
        flag && setTotal(total => total + score)
        setFlag(true)
    }

    const updateUserPoints = useCallback((points) => {
        const c = doc(database, 'users', user.email)

        user && getDoc(c)
            .then(data => data.data())
            .then(data => setDoc(c, {...data, points})) 
            .then(() => {
                console.log('Points updated!')
            })
            .catch(err => console.log(err))
    }, [user])

    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`;
        
    const showScore = (score, time) => {     
        flag && setScore(score)
        setFlag(true)
        console.log({score})

        setTimeout(() => {
            setSpinning(false)
        }, time * 1000)
    }

    return (
        <Container>
            <h3>Wheel of Fortune</h3>
            <hr />
            <Row>
                <h5>{ spinning ? 'Spinning...' : flag ? `Your score is ${score} score.` : `Try your luck now!` }</h5>
                <h6>Total: { dbUser?.points }</h6>
            </Row>
            <Row>
                {/* <WheelOfFortune showScore={showScore} spinning={spinning} setSpinning={setSpinning} /> */}

                <Container className={styles.container}>  
            <div className={styles.spin__btn} onClick={spin}>Spin</div>
            <div className={styles.wheel} style={{ transform: `rotate(${value}deg)`, '--time': time }}>
                {fields.map((el, i) => (
                    <div key={i} className={styles.number} style={{
                        '--angle': 360/fields.length,
                        '--i': i,
                        '--clr': rgb 
                    }}><span>{el}</span></div>
                ))}
        </div>
        </Container>
            </Row>
        </Container>
    )
}

export default Wheel