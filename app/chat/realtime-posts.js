'use client'

import { useState, useEffect } from 'react'
import supabase from '../../utils/supabase'
import { getTimer } from '../../utils/functions'

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

    return <div style={{

    }}>
        {posts.map(el => (
            <>
                <br />
                <div key={el.id} style={{
                    border: '1px solid #20344f',
                    borderRadius: 20,
                    padding: 5,
                    margin: '5px 10px 5px 0',
                    width: 'auto',
                    display: 'inline-block',
                    background: '#ededed'
                }}>
                    <div style={{
                        marginLeft: 36,
                        fontSize: 12,
                        color: 'grey'
                    }}>
                        {getTimer(el.created_at)}
                    </div>
                    <div style={{
                        margin: '0 7px 0 5px'
                    }}>
                        <span style={{
                            background: '#20344f',
                            color: 'white',
                            display: 'inline-block',
                            textAlign: 'center',
                            fontSize: 25,
                            width: 30,
                            height: 30,
                            borderRadius: '50%'
                        }}>
                            {el.author.charAt(0)}
                        </span>
                        <span style={{
                            marginLeft: 5,
                            color: '#20344f',
                            fontSize: 20,
                            width: 30,
                            height: 30,

                        }}>
                            {el.title}
                        </span>
                    </div>
                </div>
            </>
        ))}
        <br />
    </div>
}

