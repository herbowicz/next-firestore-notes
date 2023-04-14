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
                        <Row className='mb-2'>     
                            {singleNote?.noteCreated  && <Col><small>Created: {formatDate(singleNote.noteCreated)}</small></Col>}
                            {singleNote?.noteModified && <Col><small>Last modified: {formatDate(singleNote.noteModified)}</small></Col>}
                        </Row>
                        <p >
                            <Image src={profile?.photoURL} width='35' height='35' alt='' />
                            {' '}
                            By <strong>{profile?.nickname || profile?.displayName || singleNote?.noteAuthor}</strong> ({profile?.points})
                        </p>
                        <Row className='mb-2'>
                            <h1>{singleNote?.noteTitle}</h1>
                        </Row>
                        <Row>
                            <div dangerouslySetInnerHTML={{ __html: singleNote?.noteDesc }}></div>
                        </Row>
                    </div>
                </>
            )}
            <div className='my-4'>
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