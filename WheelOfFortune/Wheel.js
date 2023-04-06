import { useState } from 'react'
import styles from './Wheel.module.css'
import { Container } from 'react-bootstrap'

const Wheel = () => {

    const [value, setValue] = useState(Math.ceil(Math.random() * 3600))

    const spin = () => {
        // wheel.style.transform = "rotate(" + value + "deg)"
        console.log(value)
        setValue(value => value + Math.ceil(Math.random() * 3600))
    }

    return (
        <Container className={styles.container}>
            <div className={styles.spin__btn} onClick={spin}>Spin</div>
            <div className={styles.wheel} style={{transform: `rotate(${value}deg)`}}>
            <div className={styles.number} style={{'--i': 1, '--clr': '#db7093'}}><span>0</span></div>
            <div className={styles.number} style={{'--i': 2, '--clr': '#20b2aa'}}><span>100</span></div>
            <div className={styles.number} style={{'--i': 3, '--clr': '#8dc242'}}><span>2</span></div>
            <div className={styles.number} style={{'--i': 4, '--clr': '#daa520'}}><span>10</span></div>
            <div className={styles.number} style={{'--i': 5, '--clr': '#ff340f'}}><span>5</span></div>
            <div className={styles.number} style={{'--i': 6, '--clr': '#f0e33f'}}><span>50</span></div>
            <div className={styles.number} style={{'--i': 7, '--clr': '#3cb371'}}><span>1</span></div>
            <div className={styles.number} style={{'--i': 8, '--clr': '#4169e1'}}><span>20</span></div>
        </div>
        </Container>
    )
}

export default Wheel
