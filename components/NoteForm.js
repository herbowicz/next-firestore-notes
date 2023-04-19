import { useState, useRef } from 'react'
import Button from './Button'
import Form from 'react-bootstrap/Form'
import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css'

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false
})

const NoteForm = ({ mode, submit, content }) => {
    const [title, setTitle] = useState(content?.title || '')
    const [desc, setDesc] = useState(content?.desc || '')

    const editor = useRef()
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor
    }

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

                <SunEditor
                    name='content'

                    setContents={desc}
                    onChange={(text) => {
                        console.log('change', text)
                        setDesc(text)
                    }}
                    getSunEditorInstance={getSunEditorInstance}
                    height='50vh'
                    setOptions={{
                        buttonList: [
                            ['font', 'fontSize', 'formatBlock'],
                            [
                                'bold',
                                'underline',
                                'italic',
                                'strike',
                                'subscript',
                                'superscript',
                            ],
                            ['align', 'horizontalRule', 'list', 'table'],
                            ['fontColor', 'hiliteColor'],
                            ['outdent', 'indent'],
                            ['undo', 'redo'],
                            ['removeFormat'],
                            ['outdent', 'indent'],
                            ['link', 'image'],
                            ['preview', 'print'],
                            ['fullScreen', 'showBlocks', 'codeView'],
                        ],
                    }}
                />

                <Button variant='secondary' type='submit'>
                    {mode === 'update' ? 'Update' : 'Save'}
                </Button>
            </Form>
        </>
    )
}

export default NoteForm
