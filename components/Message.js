'use client'

import styles from './Message.module.css'
import { useState } from 'react'

import { addMessage } from '../utils/crud'

export default function Message({ author }) {
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    return (
        <form className={styles.form} onSubmit={e => {
            e.preventDefault()
            addMessage({
                title: message,
                author: author
            })
            setMessage('')
        }}>
            <input type="text"
                className={styles.input} 
                placeholder="Your message here..."
                onChange={handleChange}
                value={message}
            />
            <button className={styles.button} variant="outline-dark">+</button>

        </form>
    )
}