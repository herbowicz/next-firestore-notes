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
    const [userDetails, setUserDetails] = useState({})
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
                        {user && (
                            <div style={{
                                display: 'flex',

                            }}>
                                <Link href={{ pathname: `/u/${dbUser?.nickname || user.displayName}` }}
                                    passHref legacyBehavior>
                                    <Nav.Link>
                                        <Image style={{
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                        }}
                                            src={dbUser?.photoURL}
                                            width='50'
                                            height='50'
                                            alt=''
                                        />
                                        <div style={{
                                            color: 'chartreuse',
                                            background: '#20344f',
                                            borderRadius: 10,
                                            padding: '0 3px',
                                            fontSize: 14,
                                            display: 'inline-block',
                                            margin: '3px 0 0 -15px',
                                            height: 20,
                                        }}>
                                            {dbUser?.points}
                                        </div>
                                    </Nav.Link>
                                </Link>
                            </div>
                        )}
                    </Navbar.Brand>
                </Link>
                <Link href="/" passHref legacyBehavior>
                    <Nav.Link>
                        <div style={{
                            display: 'inline-block',
                            color: '#20344f',
                            fontSize: '1.5em',
                            fontFamily: "'bungee-rotated', 'Bungee', cursive"
                        }}>
                            {'a2p.dev'}
                        </div>
                    </Nav.Link>
                </Link>
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
                                <Link href="/shop" passHref legacyBehavior>
                                    <Nav.Link>Shop</Nav.Link>
                                </Link>
                                <Link href="/records" passHref legacyBehavior>
                                    <Nav.Link>Records</Nav.Link>
                                </Link>
                                <Link href="/wheel" passHref legacyBehavior>
                                    <Nav.Link>Wheel</Nav.Link>
                                </Link>
                                <Link href="/documents" passHref legacyBehavior>
                                    <Nav.Link>Docs</Nav.Link>
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
        </Navbar >
    );
}

export default NavbarComp