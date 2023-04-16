'use client'

import styles from './Chat.module.css'
import { useState, useEffect } from 'react'
import supabase from '../../utils/supabase'
import { getTimer } from '../../utils/functions'
import Message from '../../components/Message'

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

    console.log({posts})
    return <div style={{

    }}>
        <div className={styles.container}>
            <div className={styles.chatbox}>
                <div className={styles.top}>
                    Chat
                </div>

                <div className={styles.chats}>
                    {[...posts].reverse().map((el, i) => (
                        <div key={el.id} className={i % 2 && styles.mychat}>

                            <div key={el.id} className={styles.post} style={{
                                    background: i % 2 ? '#4f5d73c7' : '#77b3d4c7'
                                }}>
                                <div className={styles.timer}>
                                    {getTimer(el.created_at)}
                                </div>
                                <div style={{
                                    margin: '0 7px 0 5px'
                                }}>
                                    <span className={styles.avatar}>
                                        {el.author.charAt(0)}
                                    </span>
                                    <span className={styles.title}>
                                        {el.title}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

                <Message />

                {/* <div className={styles.chatinput} id="chatbox">
                    <form action="../htbin/chatsend.py" method="post" id="searchForm" className={styles.chatinput}>
                        <input type="text" name="msg" placeholder="Username" />
                        <input type="text" name="msg" placeholder="Enter Message" />
                        <button className={styles.sendbtn} type="submit">
                            <img src="../images/send.png" alt="send-btn" />
                        </button>
                    </form>
                </div> */}
            </div>
        </div>

        

        {/* {posts.map(el => (
            <>
                <br />
                <div key={el.id} className={styles.post}>
                    <div className={styles.timer}>
                        {getTimer(el.created_at)}
                    </div>
                    <div style={{
                        margin: '0 7px 0 5px'
                    }}>
                        <span className={styles.avatar}>
                            {el.author.charAt(0)}
                        </span>
                        <span className={styles.title}>
                            {el.title}
                        </span>
                    </div>
                </div>
            </>
        ))} */}
    </div>
}

