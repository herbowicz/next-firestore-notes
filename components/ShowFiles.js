import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getStorage, ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore'

import { auth, database } from '../firebase'
import { useAuth } from '../context/authContext'
import { useDbUser } from '../context/userContext'
import Button from './Button'

const storage = getStorage()

const ShowFiles = () => {
    const { user } = useAuth()
    const { dbUser, setDbUser } = useDbUser()
    const [data, setData] = useState([])
    const [url, setUrl] = useState()

    // useEffect(() => {
    //     const pathReference = ref(storage, `users/${user.email}/170.png`);

    //     getDownloadURL(pathReference)
    //         .then((path) =>  {
    //             setUrl(path)
    //             console.log(path)
    //         })
    // }, [user.email])

    useEffect(() => {
        const fetchImages = async () => {
            const storageRef = user && ref(storage, `users/${user?.email}`)
            const result = await listAll(storageRef);

            const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));

            return Promise.all(urlPromises);
        };

        const loadImages = async () => {
            const urls = await fetchImages();
            setData(urls);

            console.log(auth.currentUser)
        };

        loadImages()
    }, [user, user?.email])

    const selectImage = url => {
        setUrl(url)
    }

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

    const updateImage = (e, url) => {
        e.preventDefault()
        const collectionById = doc(database, 'users', user.email)

        console.log('nowy url to>>>>>', url, user, dbUser)

        // front
        setDbUser({...dbUser, photoURL: url})

        //back
        const data = {...user, photoURL: url}
        updateDoc(collectionById, data)
            .then(() => {
                alert('Profile pic updated!')
                //window.location.reload()
            })
            .catch(err => conosle.log(err))
    }

    return (
        <>
            <p>

                {(data[0] || dbUser?.photoURL) && <Image src={ url || dbUser?.photoURL } alt='' width='300' height='300' />} 
                <Button onClick={e => updateImage(e, url)}>
                    Set as profile pic
                </Button>                
            </p>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {data?.map((url, i) => {
                    return (
                        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginRight: 10 }}>
                            <Image onClick={() => selectImage(url)} key={i} src={url} alt='' width='100' height='100' />
                            <Button variant="close" onClick={() => deleteImage(url)}>
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