import { useRouter } from 'next/router'
import { Container, Row, Col, Image } from 'react-bootstrap'
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
                    <Col>
                        <h2>{user.displayName}</h2>
                        <span style={{ fontSize: 14, background: '#eee' }}>
                            https://a2p/dev/u/{nick}
                            {/* https://a2p/dev/u/{user.nickname} */}
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
                                src={user.photoURL}
                                alt='' />
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <UserDetails profile="public" />
                </Row>
            </Container>
        </>
    )
}

export default Nick

