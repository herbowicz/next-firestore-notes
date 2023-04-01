import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Note = ({ mode, submit, content }) => {

    const [title, setTitle] = useState(content?.title || '');
    const [desc, setDesc] = useState(content?.desc || '');

    const updateTitle = (e) => {
        e.preventDefault(); 
        setTitle(e.target.value); 
    };

    const updateDesc = (e) => {
        e.preventDefault();
        setDesc(e.target.value); 
    };

    return (
        <>
            <Form onSubmit={e => submit(e, title, desc)}>
                <Form.Group>  
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Title..." 
                        onChange={updateTitle}
                        value={ title }></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" type="text" placeholder="Your story..." 
                        onChange={updateDesc}
                        value={ desc }></Form.Control>
                </Form.Group>

                <Button className='mt-2' variant="primary" type="submit">
                    {mode === 'update' ? 'Update' : 'Save'} Note
                </Button>
            </Form>
        </>
    );
}

export default Note
