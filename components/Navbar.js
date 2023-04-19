'use client'

import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { database } from '../firebase'
import { useAuth } from '../context/authContext'
import { useDbUser } from '../context/userContext'

const NavbarComp = () => {
    const { user, logout } = useAuth()
    const { dbUser, setDbUser } = useDbUser()
    const [ userDetails, setUserDetails ] = useState({})
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            console.log('navbar USER', user)
            const userData = doc(database, 'users', user?.email)
            const data = await getDoc(userData)

            setUserDetails(data.data())  // this component
            await setDbUser(data.data())  // user context
            
        }
        user && getUser()
    }, [setDbUser, user])

    return (
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <Link href="/" passHref legacyBehavior>
                    <Navbar.Brand>
                        {user && <Image
                            style={{
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }}
                            src={dbUser?.photoURL}
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
                                <Link href="/dashboard" passHref legacyBehavior>
                                    <Nav.Link>Dashboard</Nav.Link>
                                </Link>
                                <Link href="/chat" passHref legacyBehavior>
                                    <Nav.Link>Chat</Nav.Link>
                                </Link>
                                <Link href="/records" passHref legacyBehavior>
                                    <Nav.Link>Records</Nav.Link>
                                </Link>
                                <Link href="/wheel" passHref legacyBehavior>
                                    <Nav.Link>Wheel</Nav.Link>
                                </Link>
                                <Link
                                    href={{
                                        pathname: `/u/${userDetails?.nickname || user.displayName}`,
                                        // query: { email: user.email }
                                    }}
                                    passHref
                                    legacyBehavior>
                                    <Nav.Link>Profile</Nav.Link>
                                </Link>
                                <Link href="/documents" passHref legacyBehavior>
                                    <Nav.Link>Documents</Nav.Link>
                                </Link>
                                <Link href="/edit" passHref legacyBehavior>
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
                                <Link href="/signup" passHref legacyBehavior>
                                    <Nav.Link>Signup</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link>Login</Nav.Link>
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComp