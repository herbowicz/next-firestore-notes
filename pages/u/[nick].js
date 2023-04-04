import { useRouter } from 'next/router'
import { Container, Row, Image } from 'react-bootstrap'
import { useAuth } from '../../context/authContext'
import UserDetails from '../../components/UserDetails'

const Nick = () => {
    const { user } = useAuth()
    const router = useRouter()
    const { nick } = router.query

    return (
        <>
            <Container>
                <h3><p>Profile</p></h3>
                <hr />
                <Row>
                    <h2>{user.displayName}</h2>
                </Row>
                <Row>
                    <div style={{ width: 250, height: 250 }}>
                        <Image
                            style={{
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }}
                            src={user.photoURL}
                            alt='' />
                    </div>
                </Row>
                <Row>
                    <h5>User: {nick}</h5>
                </Row>
                <Row>
                    <UserDetails />
                </Row>
            </Container>
        </>
    )
}

export default Nick

