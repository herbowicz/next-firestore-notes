import React, { useState } from 'react'
import styles from '../styles/Evernote.module.scss'
import { useAuth } from '../context/authContext'
import NoteOperations from '../components/NoteOperations'
import NoteDetails from '../components/NoteDetails'

const Dashboard = () => {
    const { user } = useAuth()
    const [ID, setID] = useState(null)
    const getSingleNote = (id) => {
        setID(id)
    }

    return (
        <>
            <p>This route is protected</p>
            <h5>You are logged in as: {user.email}</h5>
            <p>Your ID is: {user.uid}</p>

            <hr />

            <div className={styles.container}>
                <div>
                    <title>Evernote Clone</title>
                    <meta name="description" content="This is an Evernote Clone" />
                    <link rel="icon" href="/favicon.ico" />
                </div>

                <main>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <NoteOperations getSingleNote={getSingleNote} />
                        </div>
                        <div className={styles.right}>
                            <NoteDetails ID={ID} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Dashboard
