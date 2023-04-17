'use client'

import styles from './Message.module.css'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { addMessage } from '../utils/crud'

export default function Message() {
    const [message, setMessage] = useState('')
    const { user } = useAuth()
    const [author, setAuthor] = useState()

    useEffect(() => {
        user && setAuthor(user?.email || 'anonymous')

        console.log(user)
    }, [user])

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    return (
        <form className={styles.form} onSubmit={e => {
            e.preventDefault()
            addMessage({
                title: message,
                author: author || 'anonymous'
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