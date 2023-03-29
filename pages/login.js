import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../context/authContext'

const Login = () => {
    const router = useRouter()
    const { user, login, socialLogin } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleLogin = async (e) => {
        e.preventDefault()

        console.log(user)
        try {
            await login(data.email, data.password)
            router.push('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    // useEffect(() => {
    //     if (user) {
    //         router.push('/dashboard')
    //     }
    // }, [router, user])

    return (
        <div
            style={{
                width: '40%',
                margin: 'auto',
            }}
        >
            <h1 className="text-center my-3 ">Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={(e) =>
                            setData({
                                ...data,
                                email: e.target.value,
                            })
                        }
                        value={data.email}
                        required
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={(e) =>
                            setData({
                                ...data,
                                password: e.target.value,
                            })
                        }
                        value={data.password}
                        required
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <hr />
            <button name="google.com" onClick={e => socialLogin(e)}>Login with Google</button>
            {' '}
            <button name="github.com" onClick={e => socialLogin(e)}>Login with Github</button>
            {' '}
            <button name="facebook.com" onClick={e => socialLogin(e)}>Login with Facebook</button>
        </div>
    )
}

export default Login