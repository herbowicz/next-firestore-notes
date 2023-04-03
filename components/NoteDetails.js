import { useState, useEffect } from 'react'
import { database } from '../firebase';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
import { Button } from 'react-bootstrap'
import NoteForm from  './NoteForm'

const dbInstance = collection(database, 'notes');

export default function NoteDetails({ ID }) {
    const [singleNote, setSingleNote] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [title, setNoteTitle] = useState('');
    const [desc, setNoteDesc] = useState('');

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

    useEffect(() => {
        getNotes();
    }, [])

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

    const editNote = (e, title, desc) => {
        e.preventDefault()
        const collectionById = doc(database, 'notes', singleNote.id)

        console.log(title, desc)

        updateDoc(collectionById, {
            noteTitle: title,
            noteDesc: desc,
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
                    <NoteForm mode='update' submit={editNote} content={{title, desc}}/>
                </div>
            ) : (
                <>
                    <div>
                        <h6>By {singleNote?.noteAuthor}</h6>
                        <h1>{singleNote?.noteTitle}</h1>
                        <div dangerouslySetInnerHTML={{ __html: singleNote?.noteDesc }}></div>
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