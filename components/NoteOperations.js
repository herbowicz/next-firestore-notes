import { useState, useEffect } from 'react'
import { Button, Accordion, Container, Row, Col, Toast } from 'react-bootstrap'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { database } from '../firebase'
import { useAuth } from '../context/authContext'
import NoteForm from './NoteForm'
import NoteDetails from './NoteDetails'
import { formatDate } from '../utils/functions'

const NoteOperations = ({ getSingleNote, ID }) => {
    const [isInputVisible, setInputVisible] = useState(false);
    const { user } = useAuth()
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');
    const [notesArray, setNotesArray] = useState([]);
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    const dbInstance = collection(database, 'notes')

    const saveNote = (e, title, desc) => {
        e.preventDefault()
        addDoc(dbInstance, {
            noteAuthor: user.email,
            noteTitle: title,
            noteDesc: desc,
            noteCreated: new Date(),
            noteModified: null
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                getNotes();
            })
        setInputVisible(false)
    }

    const getNotes = () => {
        getDocs(collection(database, 'notes'))
            .then((data) => {
                setNotesArray(data.docs
                    .map((item) => {
                        return { ...item.data(), id: item.id }
                    })
                )
            })
    }


    useEffect(() => {
        getNotes()
    }, [])

    return (
        <>
            <Button onClick={inputToggle}>
                Add a New Note
            </Button>

            {isInputVisible && (
                <div>
                    <NoteForm mode='save' submit={saveNote} />
                </div>
            )}

            <Row className='mt-3'>
                <Col>
                    <Row>
                        {notesArray
                            // .sort((a, b) => a.noteUpdated < b.noteUpdated)
                            .map((note, i) => {
                                return (
                                    <Col key={note.id} eventKey={i} onClick={() => getSingleNote(note.id)}>
                                        <Toast className="my-1">
                                            <Toast.Header>
                                                <strong className="me-auto">{note.noteTitle}</strong>
                                                <small>{formatDate(note.noteModified)}</small>
                                            </Toast.Header>
                                            <Toast.Body>{note.noteDesc.substring(0, 80)} [...]</Toast.Body>
                                        </Toast>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
                {ID && (
                    <Col>
                        <NoteDetails ID={ID} />
                    </Col>
                )}
            </Row>

        </>
    )
}

export default NoteOperations