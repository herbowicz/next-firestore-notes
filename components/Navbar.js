import React from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from '../context/authContext'
import { useDbUser } from '../context/userContext'

const NavbarComp = () => {
    const { user, logout } = useAuth()
    const { dbUser } = useDbUser()
    const router = useRouter()
    console.log('USER', user, 'DBUSER', dbUser)

    return (
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand>
                        {user && <Image
                            style={{
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }}
                            src={dbUser.photoURL || user.photoURL}
                            width='50'
                            height='50'
                            alt='' />}{' '}
                    </Navbar.Brand>
                </Link>
                <div style={{
                    display: 'inline-block',
                    color: '#20344f',
                    fontSize: '1.5em',
                    fontFamily: "'bungee-rotated', 'Bungee', cursive"
                }}>
                    {'a2p.dev'}
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user ? (
                            <>
                                <Link href="/dashboard" passHref>
                                    <Nav.Link>Dashboard</Nav.Link>
                                </Link>
                                <Link href="/records" passHref>
                                    <Nav.Link>Records</Nav.Link>
                                </Link>
                                <Link href="/wheel" passHref>
                                    <Nav.Link>Wheel</Nav.Link>
                                </Link>
                                <Link href={{
                                    pathname: `/u/${dbUser?.nickname || user.displayName}`,
                                    // query: { email: user.email }
                                }} passHref>
                                    <Nav.Link>Profile</Nav.Link>
                                </Link>
                                <Link href="/documents" passHref>
                                    <Nav.Link>Documents</Nav.Link>
                                </Link>
                                <Link href="/edit" passHref>
                                    <Nav.Link>Edit</Nav.Link>
                                </Link>
                                <Nav.Link
                                    onClick={() => {
                                        logout()
                                        router.push('/login')
                                    }}
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Link href="/signup" passHref>
                                    <Nav.Link>Signup</Nav.Link>
                                </Link>
                                <Link href="/login" passHref>
                                    <Nav.Link>Login</Nav.Link>
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComp