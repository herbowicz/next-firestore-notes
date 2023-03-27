import styles from '../styles/Evernote.module.scss'
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../context/authContext'

const dbInstance = collection(database, 'notes');

export default function NoteOperations({ getSingleNote }) {
    const [isInputVisible, setInputVisible] = useState(false);
    const { user } = useAuth()
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');
    const [notesArray, setNotesArray] = useState([]);
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    const addDesc = (value) => {
        setNoteDesc(value)
    }

    const saveNote = () => {
        addDoc(dbInstance, {
            noteAuthor: user.email,
            noteTitle: noteTitle,
            noteDesc: noteDesc,
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                getNotes();
            })
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <>
            <div className={styles.btnContainer}>
                <button
                    onClick={inputToggle}
                    className={styles.button}>
                    Add a New Note
                </button>
            </div>

            {isInputVisible ? (
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    <input
                        className={styles.ReactQuill}
                        placeholder='Your story..'
                        onChange={(e) => addDesc(e.target.value)}
                        value={noteDesc}
                    />
                    {/* <div className={styles.ReactQuill}>
                        <ReactQuill
                            onChange={addDesc}
                            value={noteDesc}
                        />
                    </div> */}
                    <button
                        onClick={saveNote}
                        className={styles.saveBtn}>
                        Save Note
                    </button>
                </div>
            ) : (
                <></>
            )}

            <div className={styles.notesDisplay}>
                {notesArray.map((note) => {
                    return (
                        <div 
                            key={note.id}
                            className={styles.notesInner}
                            onClick={() => getSingleNote(note.id)}>
                            <h4>{note.noteTitle}</h4>
                        </div>
                    )
                })}
            </div>
        </>
    )
}