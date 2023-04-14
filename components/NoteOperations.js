import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import Button from './Button'
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
            noteModified: undefined
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
            .then((data) =>  setNotesArray(data.docs
                .map(item => ({ ...item.data(), id: item.id }))       
                .sort((a, b) => {
                    const aDate = a.noteModified?.seconds || a.noteCreated.seconds
                    const bDate = b.noteModified?.seconds || b.noteCreated.seconds
                    return bDate - aDate
                })
            ))
            
    }


    useEffect(() => {
        getNotes()
    }, [])

    const getImage = i => {
        //gs://next-firestore-notes.appspot.com/170.png
        const url = `https://storage.cloud.google.com/next-firestore-notes.appspot.com/cards/a2p.dev-banner.png`
        return url
    }

    return (
        <>
            <Button variant="secondary" onClick={inputToggle}>
                {isInputVisible ? 'Close' : 'Add'}
            </Button>

            {isInputVisible &&  <NoteForm mode='save' submit={saveNote} />}

            <Row className='mt-3'> 
                {ID && (
                    <Col className='col-md-auto' style={{ minWidth: '18rem' }}>
                        <NoteDetails ID={ID} />
                    </Col>
                )}
                <Col>
                    <Row>
                        {notesArray[0] && notesArray
                            .map((note, i) => {
                                return (
                                    <Col key={note.id} eventKey={i} onClick={() => getSingleNote(note.id)}>
                                        <Card className="my-1 bg-light" style={{ minWidth: '18rem', cursor: 'pointer' }}>
                                            {/* <Image className="card-img-top" src={getImage(i)} alt="Card image cap" /> */}
                                            <Card.Header>
                                                <Card.Title className="me-auto">{note.noteTitle}</Card.Title>
                                                <Card.Text>{formatDate(note.noteModified || note.noteCreated)}</Card.Text>
                                            </Card.Header>
                                            <Card.Body>{note.noteDesc.substring(0, 160)} [...]</Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default NoteOperations