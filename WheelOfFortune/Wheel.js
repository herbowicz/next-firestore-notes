import { useState, useEffect } from 'react'
import styles from './Wheel.module.css'
import { Container } from 'react-bootstrap'
import { useUser } from '../context/userContext'
import { database } from '../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { useAuth } from '../context/authContext'

const Wheel = ({ showPoints, setSpinning }) => {
    const { setUser } = useUser()
    const { user } = useAuth()

    const rand = Math.round(Math.random() * 3600)
    const [value, setValue] = useState(0)

    const time = 5
    const fields = [100,0,90,1,80,2,70,3,60,4,50,5,40,6,30,7,20,8,10,9]
    const angle = 360/fields.length

    const win = angle - Math.floor((value % 360)/angle)
    const winPos = win => win === -1 ? 19 : win === 0 ? 20 : win
    const points = fields[winPos(win) - 1]

    const spin = () => {
        setSpinning(true)
        setValue(value => value + rand)
        showPoints(value, points, time)
    }


    const updateUser = (points) => {
        const collectionById = doc(database, 'users', user.email)

        const data = {...data, points}

        setDoc(collectionById, data)
            .then(() => {
                console.log('Points updated!', collectionById)
            })
            .catch(err => conosle.log(err))
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setUser({points})
            console.log('points', points)
            updateUser(points)
        }, time * 1000);
        return () => clearTimeout(timer);
    }, [setUser, time, points]);

    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`;
        

    return (
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
    )
}

export default Wheel
