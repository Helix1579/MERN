import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { get } from 'mongoose'

const Profile = () => {

    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef(null)
    const [File, setFile] = useState(undefined)
    const [FilePercent, setFilePercent] = useState(0)
    const [FileUpladError, setFileUpladError] = useState(false)
    const [FormData, setFormData] = useState({})

    console.log(FormData);
    console.log(FilePercent);
    console.log(FileUpladError);
    // console.log(File);

    useEffect(() => {
        if (File) {
            handleFileUpload(File);
        } 
    }, [File])

    const handleFileUpload = (file) => {
        const storage = getStorage(app); 
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePercent(Math.round(progress));
        },
        (error) => {
            setFileUpladError(true);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setFormData({...FormData, avatar: downloadURL});
            });
        }
    )}
        
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className=' text-3xl 
                font-semibold 
                text-center
                my-7'>
                Profile</h1>

            <form className='flex flex-col text-center gap-4'>

                <input type='file' 
                    ref={fileRef} hidden 
                    accept='image/*'
                    onChange={(e) => setFile(e.target.files[0])}/>

                <img src={FormData.avatar || currentUser.avatar} alt="Profile" 
                    className='rounded-full
                    h-40 w-40
                    object-cover
                    cursor-pointer
                    self-center
                    mt-2'
                    onClick={() => fileRef.current.click()}/>

                <p>
                    { FileUpladError ? (
                        <span className='text-red-600'> Error Uploading Image (Image must be less then 2MB) </span>
                        ) :  FilePercent > 0 && FilePercent < 100 ? (
                            <span className='text-green-600'>{`Uploading... ${FilePercent}%`}</span>
                        ) : FilePercent === 100 ? (
                            <span className='text-green-600'>Uploaded</span>
                        ) : ( 
                            "" 
                        )
                    }
                </p>
                
                <input type="text" placeholder='Username' id='username'
                    className='border p-2 pl-3 rounded-lg outline-none'/>
                <input type="text" placeholder='E-Mail' id='email'
                    className='border p-2 pl-3 rounded-lg outline-none'/>
                <input type="text" placeholder='Password' id='password'
                    className='border p-2 pl-3 rounded-lg outline-none'/>

                <button className='bg-slate-600 
                    text-white
                    uppercase
                    rounded-lg p-1
                    hover:opacity-95
                    disabled:opacity-80'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-600
                    cursor-pointer'>Delete Account?</span>
                <span className='text-red-600
                    cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default Profile