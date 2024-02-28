import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { MdDeleteForever, MdOutlineUploadFile } from "react-icons/md";
import axios from 'axios';
import {useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateListing = () => {

    const [Files, setFiles] = useState([]);
    const [FormData, setFormData] = useState({ 
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type:'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 0,
        discountPrice: 0,
        parking: false,
        furnished: false,
        offer: false
    });
    const { currentUser } = useSelector((state) => state.user);
    const [ImageUploadError, setImageUploadError] = useState(false);
    const [Uploading, setUploading] = useState(false);
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const params = useParams();

    // console.log(FormData);

    // Getting Listing Details
    useEffect(() => {
        const fetchListings = async() => {
            const listingId = params.listingId;

            await axios
                .get(`http://localhost:3000/api/listing/get/${listingId}`,
                {
                    withCredentials: true
                })
                .then((res) => {
                    console.log(res.data);
                    setFormData(res.data);
                })
                .catch((error) => {
                    console.log(error.response);
                    setError(error.response.data.message);
                })
    }
        fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUpload = async (e) => {
        
        if (Files.length > 0 && Files.length + FormData.imageUrls.length < 7) 
        {
            const promise = [];
            setUploading(true);
            setImageUploadError(false);

            for (let i = 0; i < Files.length; i++)
            {
                await promise.push(storeImage(Files[i]));
            }
            
            Promise.all(promise).then((urls) => {
                setFormData({ ...FormData, imageUrls: FormData.imageUrls.concat(urls) });
                setUploading(false);
                setImageUploadError(false);
            }).catch((error) => {
                setUploading(false);
                setImageUploadError('Error Uploading Images! Please try again!');
            });
        } else if (Files.length === 0) {
            setImageUploadError('No Images Selected!');
            setUploading(false);
        }
        else {
            setImageUploadError('Max 6 Images are allowed!');
            setUploading(false);
        }
    }

    const storeImage = async (file) => {

        return new Promise((resolve, reject) => {

            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on(
                'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            });
        });
    }

    const handleRemoveImage = (index) => {
        setFormData({ ...FormData,
            imageUrls: FormData.imageUrls.filter((_, i) => i !== index)
        })
    }

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
          setFormData({
            ...FormData,
            type: e.target.id,
          });
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
          setFormData({
            ...FormData,
            [e.target.id]: e.target.checked,
          });
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
          setFormData({
            ...FormData,
            [e.target.id]: e.target.value,
          });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(FormData);

        setLoading(true);

        if (FormData.imageUrls.length === 0) {
            setError('Please Upload Images!');
            setLoading(false);
            return;
        }
        if (FormData.regularPrice < FormData.discountPrice) {
            setError('Discount Price cannot be greater than Regular Price!');
            setLoading(false);
            return;
        }

        await axios
            .patch('http://localhost:3000/api/listing/update/' + params.listingId,
            {
                ...FormData,
                userRef: currentUser._id
            },
            {
                withCredentials: true

            })
            .then((response) => {
                console.log(response);
                setLoading(false);
                setError(false);
                navigate(`/listing/${response.data._id}`);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
                setLoading(false);
            })
    }

    return (
        <main className='p-3
            max-w-4xl
            mx-auto'>
            <h1 
                className='text-3xl 
                font-semibold 
                text-center my-8'>
                    Update Details
            </h1>

            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                {/* Form Data */}
                <div className='flex flex-col
                    gap-3 flex-1'>
                    <input required
                        type='text' 
                        placeholder='Name'
                        className='border p-2
                            rounded-lg
                            outline-none'
                        id='name'
                        maxLength='62'
                        minLength='10'
                        onChange={handleChange}
                        value={FormData.name}/>
                    <textarea required
                        type='text' 
                        placeholder='Description'
                        className='border p-2 h-32
                            rounded-lg
                            outline-none'
                        id='description'
                        onChange={handleChange}
                        value={FormData.description}/>
                    <input required
                        type='text' 
                        placeholder='Address'
                        className='border p-2
                            rounded-lg
                            outline-none'
                        id='address'
                        onChange={handleChange}
                        value={FormData.address}/>

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-1'>
                            <input type='checkbox' 
                                id='sale' 
                                className='w-4'
                                onChange={handleChange}
                                checked={FormData.type === 'sale'}/>
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox' 
                                id='rent' 
                                className='w-4'
                                onChange={handleChange} 
                                checked={FormData.type === 'rent'}/>
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox' 
                                id='parking' 
                                className='w-4'
                                onChange={handleChange}
                                checked={FormData.parking}/>
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox' 
                                id='furnished' 
                                className='w-4'
                                onChange={handleChange}
                                checked={FormData.furnished}/>
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox' 
                                id='offer' 
                                className='w-4'
                                onChange={handleChange}
                                checked={FormData.offer}/>
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex gap-6 flex-wrap text-sm mt-2'>
                        <div className='flex gap-1 items-center'>
                            <input required
                                type='number' 
                                min='1'
                                max='10'
                                className='p-1 w-12
                                    rounded-xl
                                    outline-none
                                    text-center'
                                id='bedrooms'
                                onChange={handleChange}
                                value={FormData.bedrooms}/>
                            <p>Beds</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <input required
                                type='number' 
                                min='1'
                                max='10'
                                className='p-1 w-12
                                    rounded-xl
                                    outline-none
                                    text-center'
                                id='bathrooms'
                                onChange={handleChange}
                                value={FormData.bathrooms}/>
                            <p>Baths</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <input required
                                type='number'
                                className='p-1 w-24
                                    rounded-xl
                                    outline-none
                                    text-center'
                                id='regularPrice'
                                onChange={handleChange}
                                value={FormData.regularPrice}/>
                            <div className='text-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / Month)</span>
                            </div>
                        </div>

                        {FormData.offer && (
                            <div className='flex gap-1 items-center'>
                                <input required
                                    type='number'
                                    className='p-1 w-24
                                        rounded-xl
                                        outline-none
                                        text-center'
                                    id='discountPrice'
                                    onChange={handleChange}
                                    value={FormData.discountPrice}/>
                                <div className='text-center'>
                                    <p>Discount Price</p>
                                    <span className='text-xs'>($ / Month)</span>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
                {/* Image Upload */}    
                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images : 
                        <span className='font-normal text-gray-500 ml-2'>
                            The First image will be the cover image (Max. 6 Images)
                        </span>
                    </p>
                    <div className="gap-4 items-center">
                        <input multiple 
                            type="file"
                            id="image" 
                            accept='image/*' 
                            onChange={(e) => { setFiles(e.target.files) }}
                            className='p-2 
                                rounded-lg 
                                border 
                                border-gray-600 
                                w-full'/>
                        <button type='button'
                            onClick={handleUpload}
                            disabled={Uploading}
                            className='p-2 mt-4
                                w-full
                                text-green-500
                                rounded-lg
                                border 
                                border-green-600
                                uppercase
                                hover:shadow-lg
                                disabled:opacity-80'>
                            { Uploading ? 'Uploading...' :
                                <MdOutlineUploadFile size='24px' className='w-full'/>}
                        </button>
                    </div>
                    <p className='text-red-600'>
                        { ImageUploadError && ImageUploadError}
                    </p>
                    {
                        FormData.imageUrls.length > 0 && FormData.imageUrls.map((url, index) => (
                            <div 
                                className="flex p-2
                                justify-between
                                items-center
                                border
                                border-black
                                rounded-xl">
                                <img 
                                    src={url} 
                                    alt='uploaded' 
                                    className='w-40 h-32
                                    rounded-lg'/>
                                <button 
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}>
                                    {/* Delete Icon */}
                                    <MdDeleteForever size='30px'/> 
                                </button>
                            </div>
                        ))
                    }
                    <button 
                        disabled={Loading || Uploading}
                        className='bg-slate-600 
                        text-white
                        uppercase
                        rounded-lg p-1
                        hover:opacity-95
                        disabled:opacity-80'>
                        {Loading ? 'Loading...' : 'Update Details'}
                    </button>
                    {Error && <p className='text-red-600'>{Error}</p>}
                </div>
            </form>
        </main>
    )
}

export default UpdateListing