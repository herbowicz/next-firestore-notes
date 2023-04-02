import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { useAuth } from '../context/authContext'

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

    const selectImage = e => console.log (e.target.srcset)

    return (
        <>
            {data?.map((url, i) => <Image onClick={selectImage} key={i} src={url} alt='' width='200' height='200' />)}
        </>
    )

}

export default ShowFiles