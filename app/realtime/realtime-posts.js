'use client'

import { useState, useEffect } from 'react'
import supabase from '../../utils/supabase'

export default function RealtimePosts({ serverPosts }) {
    const [posts, setPosts] = useState(serverPosts)
    const [message, setMessage] = useState('')

    const submitOnEnter = (event) => {
        event.preventDefault()
        if (event.keyCode === 13) {
            // onSubmit(message)
            setMessage('')
        }
    }

    const handleChange = (event) => {
        console.log('bum')
        setMessage(event.target.value);
    };

    useEffect(() => {
        const channel = supabase
            .channel('realtime posts')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'posts'
            }, (payload) => {
                setPosts([...posts, payload.new])
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [posts])

    return <div>
        {posts.map(el => (
            <div  key={el.id}>{el.author}{'>'} {el.title}</div>
        ))}
        <br />
    </div>
}

