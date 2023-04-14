import { useState } from 'react';
import Button from './Button';
import Form from 'react-bootstrap/Form';

const NoteForm = ({ mode, submit, content }) => {

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
                <Form.Group className='mt-3'>  
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Title..." 
                        onChange={updateTitle}
                        value={ title }></Form.Control>
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows="7" type="text" placeholder="Your story..." 
                        onChange={updateDesc}
                        value={ desc }></Form.Control>
                </Form.Group>

                <Button variant="secondary" type="submit">
                    {mode === 'update' ? 'Update' : 'Save'}
                </Button>
            </Form>
        </>
    );
}

export default NoteForm
