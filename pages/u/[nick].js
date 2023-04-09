import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { database } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore'
import { Container, Row, Col, Image } from 'react-bootstrap'
import UserDetails from '../../components/UserDetails'
import { useAuth } from '../../context/authContext'

const Nick = ({ query }) => {
    const { user } = useAuth()
    const [profile, setProfile] = useState({})
    const router = useRouter()
    const { nick } = router.query

    useEffect(() => {
        const getProfile = async () => {
            const userData= doc(database, 'users', nick)
            const data = await getDoc(userData)
            setProfile(data.data())
        }
        getProfile()
    }, [nick])

    return (
        <>
            <Container>
                <h3><p>Profile </p></h3>
                <hr />
                <Row>
                    <Col>
                        <h2>{user.displayName}</h2>
                        <span style={{ fontSize: 14, background: '#eee' }}>
                            a2p.dev/u/{nick}
                        </span>
                    </Col>
                    <Col>
                        <div style={{ maxWidth: 200, maxHeight: 200 }}>
                            <Image
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    maxHeight: 200
                                }}
                                src={ profile?.photoURL }
                                alt='' />
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                <>
                    {profile && Object.entries(profile)
                        // .filter(([key]) => !uneditable.includes(key))
                        .map(([key, value], i) => (
                            <Row key={i}>
                                <Col> {key} </Col>
                                <Col> {value} </Col>
                            </Row>
                        ))
                    }
                </>
                </Row>
            </Container>
        </>
    )
}

export default Nick

