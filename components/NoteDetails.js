import { useState, useEffect } from 'react'
import {
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
import { Button, Image, Row, Col } from 'react-bootstrap'
import { database } from '../firebase'
import { formatDate } from '../utils/functions'
import NoteForm from './NoteForm'

const NoteDetails = ({ ID }) => {
    const [singleNote, setSingleNote] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [title, setNoteTitle] = useState('')
    const [desc, setNoteDesc] = useState('')
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const getSingleNote = async () => {
            if (ID) {
                const singleNote = doc(database, 'notes', ID)
                const data = await getDoc(singleNote)
                setSingleNote({ ...data.data(), id: data.id })
            }
        }
        getSingleNote();
    }, [ID, setSingleNote])

    useEffect(() => {
        const getProfile = async () => {
            if (singleNote?.noteAuthor) {
                const singleProfile = doc(database, 'users', singleNote.noteAuthor)
                const data = await getDoc(singleProfile)
                setProfile({ ...data.data(), id: data.id })
            }
        }
        getProfile()
    }, [singleNote])

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setSingleNote(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })[0]);
            })
    }

    const getEditData = () => {
        setIsEdit(!isEdit);
        setNoteTitle(singleNote.noteTitle);
        setNoteDesc(singleNote.noteDesc)
    }

    const editNote = (e, title, desc) => {
        e.preventDefault()
        const collectionById = doc(database, 'notes', singleNote.id)

        console.log(title, desc)

        updateDoc(collectionById, {
            noteTitle: title,
            noteDesc: desc,
            noteModified: new Date()
            })
        .then(() => {
            window.location.reload()
        })
    }

    const deleteNote = (id) => {
        const collectionById = doc(database, 'notes', id)

        deleteDoc(collectionById)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <>
            {isEdit ? (
                <div>
                    <NoteForm mode='update' submit={editNote} content={{ title, desc }} />
                </div>
            ) : (
                <>
                    <div>
                        <Row>
                            {singleNote?.noteCreated  && <Col>Created: {formatDate(singleNote.noteCreated)}</Col>}
                            {singleNote?.noteModified && <Col>Last modified: {formatDate(singleNote.noteModified)}</Col>}
                        </Row>
                        <p>
                            <Image src={profile?.photoURL} width='30' height='30' alt='' />
                            {' '}
                            By {profile?.nickname || profile?.displayName || singleNote?.noteAuthor} ({profile?.points})
                        </p>

                        <Row>
                            <h1>{singleNote?.noteTitle}</h1>
                        </Row>
                        <Row>
                            <div dangerouslySetInnerHTML={{ __html: singleNote?.noteDesc }}></div>
                        </Row>
                    </div>
                </>
            )}
            <div className='my-2'>
                <Button onClick={getEditData} variant="success">
                    {isEdit ? 'Close' : 'Edit'}
                </Button>
                {' '}
                <Button onClick={() => deleteNote(singleNote.id)} variant="danger">
                    Delete
                </Button>
            </div>
        </>
    )
}

export default NoteDetails