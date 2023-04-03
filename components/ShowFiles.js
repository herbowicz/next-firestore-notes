import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getStorage, ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { useAuth } from '../context/authContext'
import { Button } from 'react-bootstrap'

const storage = getStorage();

const ShowFiles = () => {
    const { user } = useAuth()
    const [url, setUrl] = useState()
    const [data, setData] = useState([])

    // useEffect(() => {
    //     const pathReference = ref(storage, `users/${user.uid}/170.png`);

    //     getDownloadURL(pathReference)
    //         .then((path) =>  {
    //             setUrl(path)
    //             console.log(path)
    //         })
    // }, [user.uid])

    useEffect(() => {
        const fetchImages = async () => {
            const storageRef = ref(storage, `users/${user.uid}`)
            const result = await listAll(storageRef);

            const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));

            return Promise.all(urlPromises);
        };

        const loadImages = async () => {
            const urls = await fetchImages();
            console.log(urls)
            setData(urls);
        };

        loadImages()
    }, [user.uid])

    const selectImage = url => setUrl(url)

    const deleteImage = (url) => {
        console.log(url)

        const delRef = ref(storage, url)
        deleteObject(delRef).then(() => {
            alert('File deleted successfully')
            window.location.reload()
        }).catch((error) => {
            alert(error)
        });
    }

    return (
        <>
            <p>
                {url && <Image src={url} alt='' width='300' height='300' />}
            </p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {data?.map((url, i) => {
                    return (
                        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginRight: 10}}>
                            <Image onClick={() => selectImage(url)} key={i} src={url} alt='' width='100' height='100' />
                            <Button style={{ marginLeft: -34, zIndex: 5 }} onClick={() => deleteImage(url)} variant="danger">
                                x
                            </Button>
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default ShowFiles