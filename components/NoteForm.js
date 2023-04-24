import { useState } from 'react'
import Button from './Button'
import Form from 'react-bootstrap/Form'
import 'suneditor/dist/css/suneditor.min.css'
import Editor from './Editor'


const NoteForm = ({ mode, submit, content }) => {
    const [title, setTitle] = useState(content?.title || '')
    const [desc, setDesc] = useState(content?.desc || '')

    const updateTitle = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    return (
        <>
            <Form onSubmit={e => submit(e, title, desc)}>
                <Form.Group className='mt-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' placeholder='Enter the Title...'
                        onChange={updateTitle}
                        value={title}></Form.Control>
                </Form.Group>

                <Editor desc={desc} setDesc={setDesc} />

                <Button variant='secondary' type='submit'>
                    {mode === 'update' ? 'Update' : 'Save'}
                </Button>
            </Form>
        </>
    )
}

export default NoteForm
