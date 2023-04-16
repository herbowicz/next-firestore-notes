'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { addMessage } from '../utils/crud'
import Button from './Button';
import Form from 'react-bootstrap/Form'
import { Input } from 'react-bootstrap'

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
        <Form className='mt-3 d-inline-flex'
            onSubmit={e => {
            e.preventDefault()
            addMessage({
                title: message,
                author: author || 'user'
            })
            setMessage('')
        }}>
            <Form.Group>  
                <Form.Control type="text" 
                    placeholder="Your message here..." 
                    onChange={handleChange}
                    value={message}>
                </Form.Control>
            </Form.Group>
            <Button variant="outline-dark">+</Button>
        </Form>
    )
}