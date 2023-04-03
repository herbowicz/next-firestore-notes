import { useState, useEffect } from 'react'
import { database } from '../firebase';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    setDoc,
    deleteDoc
} from 'firebase/firestore'
import { Button } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import UserForm from './UserForm'

export default function UserDetails() {
    const { user } = useAuth()
    const [userDetails, setUserDetails] = useState()
    const [isEdit, setIsEdit] = useState(false);
    const [points, setPoints] = useState(0);

    const [content, setContent] = useState({})

    const getEditData = () => {
        setIsEdit(!isEdit);
        setPoints(points => points + 5)
    }

    useEffect(() => {
        const getUser = async () => {
            if (user) {
                const userData= doc(database, 'users', user?.email)
                const data = await getDoc(userData)
                setUserDetails(data.data())
            }
        }
        
        getUser();
    }, [user, setUserDetails])

    useEffect(() => setPoints(userDetails?.points), [userDetails])
    useEffect(() => setContent({
        title: userDetails?.title || '',
        desc: userDetails?.desc || '',
        about: userDetails?.about || ''
    }), [userDetails])

    console.log('UDetails content')

    const updateUser = (e, content) => {
        e.preventDefault()
        const collectionById = doc(database, 'users', user.email)

        const data = {...user, ...content, points}
        console.log({data})

        setDoc(collectionById, data)
            .then(() => {
                alert('User preserved!')
                window.location.reload()
            })
            .catch(err => conosle.log(err))
    }

    return (
        <>
            {isEdit ? (
                <div>
                    <UserForm submit={updateUser} data={content} />
                </div>
            ) : (
                <>
                    <div>
                        <h6>{userDetails?.uid}</h6>
                        <h1>{userDetails?.displayName}</h1>
                        <h2>Points: {points}</h2>
                        <div>{userDetails?.email}</div>
                        <hr />
                        {JSON.stringify(userDetails)}
                    </div>
                </>
            )}
            <div className='my-2'>
                <Button onClick={getEditData} variant="success">
                    {isEdit ? 'Close' : 'Edit'}
                </Button>
            </div>
        </>
    )
}

