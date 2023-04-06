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
        <Container className={styles.container} style={{transform: `rotate(${value}deg)`}}>
            <div className={styles.spin__btn} onClick={spin}>Spin</div>
            <div className={styles.wheel}>
            <div className={styles.number} style={{'--i': 1, '--clr': '#db7093'}}><span>Winx Club</span></div>
            <div className={styles.number} style={{'--i': 2, '--clr': '#20b2aa'}}><span>Smeshariki</span></div>
            <div className={styles.number} style={{'--i': 3, '--clr': '#8dc242'}}><span>Amphibia</span></div>
            <div className={styles.number} style={{'--i': 4, '--clr': '#daa520'}}><span>The Owl House</span></div>
            <div className={styles.number} style={{'--i': 5, '--clr': '#ff340f'}}><span>Tom and Jerry</span></div>
            <div className={styles.number} style={{'--i': 6, '--clr': '#f0e33f'}}><span>SpongeBob</span></div>
            <div className={styles.number} style={{'--i': 7, '--clr': '#3cb371'}}><span>Gravity Falls</span></div>
            <div className={styles.number} style={{'--i': 8, '--clr': '#4169e1'}}><span>X-Men</span></div>
        </div>
        </Container>
    )
}

export default Wheel
