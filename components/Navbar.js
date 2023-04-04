import React from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import { useRouter } from 'next/router'

const NavbarComp = () => {
    const { user, logout } = useAuth()
    const router = useRouter()

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand>
                        {user && <Image src={user.photoURL} width='50' height='50' alt=''/>}{' '}
                        <span>{' '}NextJS Firebase Auth</span>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user ? (
                            <>
                                <Link href="/dashboard" passHref>
                                    <Nav.Link>Dashboard</Nav.Link>
                                </Link>
                                <Link href="/documents" passHref>
                                    <Nav.Link>Documents</Nav.Link>
                                </Link>
                                <Link href="/profile" passHref>
                                    <Nav.Link>Profile</Nav.Link>
                                </Link>
                                <Link href="/records" passHref>
                                    <Nav.Link>Records</Nav.Link>
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