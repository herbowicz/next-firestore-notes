import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css'

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false
})

const Editor = ({ desc, setDesc }) => {
    const [] = useState(desc || '')

    const editor = useRef()
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor
    }

    return (
        <>
            <SunEditor
                name='content'
                setContents={desc}
                onChange={(text) => setDesc(text)}
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
        </>
    )
}

export default Editor
