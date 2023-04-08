import { useState, useEffect } from 'react'
import { database } from '../firebase';
import {
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
import { Col, Row } from 'react-bootstrap'
import Button from './Button'
import { useAuth } from '../context/authContext'
import UserForm from './UserForm'

const uneditable = ['uid', 'photoURL', 'email']

export default function UserDetails({profile}) {
    const { user } = useAuth()
    const [userDetails, setUserDetails] = useState()
    const [isEdit, setIsEdit] = useState(false);
    const [points, setPoints] = useState(0);

    const [content, setContent] = useState({})

    const getEditData = () => {
        console.log('click')
        setIsEdit(!isEdit)
        // setPoints(points => points + 5)
    }

    useEffect(() => {
        const getUser = async () => {
            if (user) {
                const userData= doc(database, 'users', user?.email)
                const data = await getDoc(userData)
                setUserDetails(data.data())
            }
        }
        
        getUser()
    }, [user, setUserDetails])

    useEffect(() => {
        setContent({
            nickname: userDetails?.nickname || '',
            about: userDetails?.about || '',
            role: userDetails?.role || '',
        })
        setPoints(userDetails?.points || 0)
    }, [userDetails])


    const updateUser = (e, content) => {
        e.preventDefault()
        const collectionById = doc(database, 'users', user.email)

        const data = {...user, ...content, points}
        console.log(data)

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
                <> 
                    <UserForm submit={updateUser} data={content} />
                </>
            ) : (
                <>
                    {userDetails && Object.entries(userDetails)
                        .filter(([key]) => !uneditable.includes(key))
                        .map(([key, value], i) => (
                            <Row key={i}>
                                <Col> {key} </Col>
                                <Col> {value} </Col>
                            </Row>
                        ))
                    }
                </>
            )}
            {profile === 'public' || <div className='my-2'>
                <Button onClick={() => getEditData()} variant="success">
                    {isEdit ? 'Close' : 'Edit'}
                </Button>
            </div>}
        </>
    )
}
