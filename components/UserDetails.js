import { useState, useEffect } from 'react'
import { database } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Col, Row } from 'react-bootstrap'
import Button from './Button'
import UserForm from './UserForm'
import { useDbUser } from '../context/userContext'
import { useAuth } from '../context/authContext'

const uneditable = ['uid', 'photoURL', 'email']

export default function UserDetails() {
    const { dbUser, setDbUser } = useDbUser()
    const { user } = useAuth()
    const [userDetails, setUserDetails] = useState()
    const [isEdit, setIsEdit] = useState(false);

    const [content, setContent] = useState({})

    const getEditData = () => {
        console.log('click')
        setIsEdit(!isEdit)
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
    }, [userDetails])


    const updateUser = (e, content) => {
        e.preventDefault()
        const collectionById = doc(database, 'users', user.email)

        const data = {...user, ...content}
        console.log(data)

        updateDoc(collectionById, data)
            .then(() => {
                alert('User preserved!')
                //window.location.reload()
            })
            .catch(err => conosle.log(err))
    }

    const submit = (e, content) => {
        setDbUser({...dbUser, ...content})
        updateUser(e, content)
    }

    return (
        <>
            {isEdit ? (
                <>
                    <UserForm submit={submit} data={content} />
                </>
            ) : (
                <>
                    {userDetails && Object.entries(userDetails)
                        // .filter(([key]) => !uneditable.includes(key))
                        .map(([key, value], i) => (
                            <Row key={i}>
                                <Col> {key} </Col>
                                <Col> {value} </Col>
                            </Row>
                        ))
                    }
                </>
            )}
            <div className='my-2'>
                <Button onClick={() => {
                    console.log('!!!!')
                    getEditData()
                }} variant="success">
                    {isEdit ? 'Close' : 'Edit'}
                </Button>
            </div>
        </>
    )
}
