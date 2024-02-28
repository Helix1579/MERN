import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { 
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} from '../Redux/User/UserSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {

    const { currentUser, loading, error } = useSelector((state) => state.user)
    const fileRef = useRef(null)
    const [File, setFile] = useState(undefined)
    const [FilePercent, setFilePercent] = useState(0)
    const [FileUpladError, setFileUpladError] = useState(false)
    const [FormData, setFormData] = useState({})
    const [UpdateSuccess, setUpdateSuccess] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (File) {
            handleFileUpload(File);
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        )
    }

    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.id]: e.target.value
        });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(FormData);
        dispatch(updateUserStart());

        await axios
            .patch(`http://localhost:3000/api/user/update/${currentUser._id}`,
            FormData, {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                dispatch(updateUserSuccess(res.data));
                setUpdateSuccess(true);
            })
            .catch((error) => {
                console.log(error.response);
                setUpdateSuccess(false);
                dispatch(updateUserFailure(error.response));
            })
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deleteUserStart());

        await axios
            .delete(`http://localhost:3000/api/user/delete/${currentUser._id}`,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res);
                dispatch(deleteUserSuccess());
            })
            .catch((error) => {
                console.log(error);
                dispatch(deleteUserFailure(error.response));
            })
    }

    const handleSignOut = async() => {
        
        dispatch(signOutUserStart());

        await axios
            .get(`http://localhost:3000/api/auth/signout`, {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                dispatch(signOutUserSuccess());
            })
            .catch((error) => {
                console.log(error);
                dispatch(signOutUserFailure(error.response));
            })
    }


    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className=' text-3xl 
                font-semibold 
                text-center
                uppercase
                my-7'>
                Profile</h1>

            <form onSubmit={handleUpdate}
                className='flex flex-col text-center gap-4'>

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
                
                <input type="text"
                    placeholder='Username'
                    id='username'
                    defaultValue={currentUser.username} 
                    onChange={handleChange}
                    className='border p-2 pl-3 rounded-lg outline-none'/>

                <input type="text"
                    placeholder='E-Mail'
                    id='email'
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    className='border p-2 pl-3 rounded-lg outline-none'/>

                <input type="password"
                    placeholder='Password'
                    id='password'
                    onChange={handleChange}
                    className='border p-2 pl-3 rounded-lg outline-none'/>

                <button 
                    disabled={loading} 
                    className='bg-slate-600 
                    text-white
                    uppercase
                    rounded-lg p-1
                    hover:opacity-95
                    disabled:opacity-80'>
                        {loading ? "Loading..." : "Update"}
                </button>
                <Link to={'/createListing'}
                    className='bg-green-600 
                    text-white
                    uppercase
                    rounded-lg p-1
                    hover:opacity-95
                    disabled:opacity-80'>
                        Create Listing
                </Link>
                <Link to={'/userListing'}
                    className='bg-green-600 
                    text-white
                    uppercase
                    rounded-lg p-1
                    hover:opacity-95
                    disabled:opacity-80'>
                        Show Listings
            </Link>
            </form>

            <div className='flex justify-between mt-5'>
                <span onClick={handleDelete} className='text-red-600
                    cursor-pointer'>Delete Account?</span>
                <span onClick={handleSignOut} className='text-red-600
                    cursor-pointer'>Sign Out</span>
            </div>

            {UpdateSuccess && <p className='text-center mt-5 text-green-600'>Profile Updated</p>}

            {error && <p className='text-center mt-5 text-red-600'>{error}</p>}
            

        </div>
    )
}

export default Profile