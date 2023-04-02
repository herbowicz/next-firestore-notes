// https://firebase.google.com/docs/storage/web/start
import { useRef, useState } from 'react'
import {
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useAuth } from '../context/authContext'

const storage = getStorage()

const UploadFile = () => {
    const { user } = useAuth()
    const inputEl = useRef(null)
    let [value, setValue] = useState(0)

    function uploadFile() {

        var file = inputEl.current.files[0]
        const storageRef = ref(storage, `users\//${user.uid}\//${file.name}`)
        const task = uploadBytesResumable(storageRef, file)
        
        task.on('state_change',
            function progress(snapshot) {
                setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            function error(err) {
                alert(err)
            },
            function complete() {
                alert('File uploaded successfully!')
                window.location.reload()
            }
        )
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <progress value={value} max="100" style={{ width: '100%' }}></progress>
            <br />
            <input
                type="file"
                onChange={uploadFile}
                ref={inputEl}
            />
        </div>
    )
}

export default UploadFile