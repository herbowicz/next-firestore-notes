import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Button, Stack } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import Note from  './Note'

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

    const saveNote = (e, title, desc) => {
        e.preventDefault()
        addDoc(dbInstance, {
            noteAuthor: user.email,
            noteTitle: title,
            noteDesc: desc,
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                getNotes();
            })
        setInputVisible(false)
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
            <Button onClick={inputToggle}>
                Add a New Note
            </Button>

            {isInputVisible && (
                <div>
                    <Note mode= 'save' submit={saveNote} />
                </div>
            )}

            <Stack className='mt-3'>
                {notesArray.map((note) => {
                    return (
                        <div 
                            key={note.id}
                            onClick={() => getSingleNote(note.id)}>
                            <h4>{note.noteTitle}</h4>
                        </div>
                    )
                })}
            </Stack>
        </>
    )
}