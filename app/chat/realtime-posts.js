'use client'

import styles from './Chat.module.css'
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
        <div className={styles.container}>
            <div className={styles.chatbox}>
                <div className={styles.client}>
                    <img src="../images/Favicon.svg" alt="logo"/>
                    <div className={styles.clientinfo}>
                        <h2>Message</h2>
                        <p>online</p>
                    </div>
                </div>

                <div className={styles.chats} id="message">
                    <div className={styles.clientchat}>Hi There!</div>
                    <div className={styles.myChat}>Please type your username then your message</div>

                    <div className={styles.mychat}>Test 1</div>
                    <div className={styles.mychat}>Test 2</div>
                    {posts.map(el => (
                        <div key={el.id} className={styles.mychat}>{el.title}</div>
                    ))}

                </div>

                <div className={styles.chatinput} id="chatbox">
                    <form action="../htbin/chatsend.py" method="post" id="searchForm"  className={styles.chatinput}>
                        <input type="text" name="msg" placeholder="Username" />
                        <input type="text" name="msg" placeholder="Enter Message" />
                        <button className={styles.sendbtn} type="submit">
                            <img src="../images/send.png" alt="send-btn" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
{/*         
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
                    background: `rgba(234,122,232,.2)`,
                    fontFamily: 'Arial', 
                }}>
                    <div style={{
                        marginLeft: 38,
                        fontSize: 11,
                        color: '#aaa'
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
                            fontSize: 27,
                            lineHeight: 1,
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            fontFamily: 'Luminari',
                        }}>
                            {el.author.charAt(0)}
                        </span>
                        <span style={{
                            marginLeft: 5,
                            color: '#eee',
                            fontSize: 17,
                            width: 30,
                            height: 30,

                        }}>
                            {el.title}
                        </span>
                    </div>
                </div>
            </>
        ))} */}
    </div>
}

