import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserForm = ({ submit, data }) => {
    const [content, setContent] = useState(data)

    const updateContent = (e, key) => {
        e.preventDefault()
        setContent({ ...content, [key]: e.target.value })
    }


    console.log('content keys', Object.keys(content))

    const capitalized = word =>  word.charAt(0).toUpperCase() + word.slice(1)

    return (
        <>
            <Form onSubmit={e => submit(e, content)}>
                {Object.keys(content).map((el, i) => (
                    <Form.Group key={i}>
                        <Form.Label>{capitalized(el)}</Form.Label>
                        <Form.Control type="text"
                            placeholder={data[el]}
                            onChange={e => updateContent(e, el)}
                            value={content[el]}></Form.Control>
                    </Form.Group>
                ))}

                <Button className='mt-2' variant="primary" type="submit">
                    Update User
                </Button>
            </Form>
        </>
    );
}

export default UserForm
