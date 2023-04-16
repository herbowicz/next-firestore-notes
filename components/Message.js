'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { addMessage } from '../utils/crud'
import Button from './Button';

export default function Message() {
    const [message, setMessage] = useState('')
    const { user } = useAuth()
    const [author, setAuthor] = useState()

    useEffect(() => {
        user && setAuthor(user?.displayName || user?.email || 'user')

        console.log(user)
    }, [user])

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    return (
        <form onSubmit={e => {
            e.preventDefault()
            addMessage({
                title: message,
                author: author || 'user'
            })
            setMessage('')
        }} style={{
            display: 'flex',
            marginTop: 5
        }}>
            <input type="text"
                placeholder="Your message here..."
                onChange={handleChange}
                value={message}
                style={{
                    flex: 1,
                    fontSize: 18,
                    paddingLeft: 10
                }} />
            <Button variant="outline-dark">+</Button>

        </form>
    )
}