'use client'

import styles from './Chat.module.css'
import { useState, useEffect } from 'react'
import supabase from '../../utils/supabase'
import Link from 'next/link'
import { useAuth } from '../../context/authContext'
import { getTimer } from '../../utils/functions'
import Message from '../../components/Message'

export default function RealtimePosts({ serverPosts }) {
    const [posts, setPosts] = useState(serverPosts)
    const { user } = useAuth()
    const [author, setAuthor] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (user) {
            setAuthor(user?.displayName || user?.email || 'Anonymous')
            setEmail(user?.email)
        }

        console.log(user)
    }, [user])

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

    console.log('email', email, 'author', author)
    return <div style={{

    }}>
        <div className={styles.container}>
            <div className={styles.chatbox}>

                <div className={styles.top}>
                    <span>
                        Chat
                    </span>
                    <span className={styles.rotated}>
                        a2p.dev
                    </span>
                    <Link href="/dashboard" passHref legacyBehavior >
                        <span className={styles.link}>Back</span>
                    </Link>
                </div>

                <div className={styles.chats}>
                    {[...posts].reverse().map((el, i) => (
                        <div key={el.id} className={el?.email === email ? styles.mychat : ''}>
                            <div key={el.id} className={styles.post} style={{
                                background: el?.email === email ? '#77b3d4c7' :'#4f5d73c7'
                            }}>
                                <div className={styles.timer}>
                                    {getTimer(el.created_at)}
                                </div>
                                <div style={{
                                    margin: '0 7px 0 5px'
                                }}>
                                    <span className={styles.avatar}>
                                        {el.author?.charAt(0)}
                                    </span>
                                    <span className={styles.title}>
                                        {el.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Message author={author} email={email} />

            </div>
        </div>

    </div>
}

