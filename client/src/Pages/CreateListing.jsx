import React, { useState } from 'react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { MdDeleteForever, MdOutlineUploadFile } from 'react-icons/md';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../Components/Reuseable/Input';
import CheckBox from '../Components/Reuseable/CheckBox';
import ChangeableNumber from '../Components/Reuseable/ChangeableNumber';
import UploadButton from '../Components/Reuseable/UploadButton';

const CreateListing = () => {
    const [Files, setFiles] = useState([]);
    const [FormData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 0,
        discountPrice: 0,
        parking: false,
        furnished: false,
        offer: false,
    });
    const { currentUser } = useSelector((state) => state.user);
    const [ImageUploadError, setImageUploadError] = useState(false);
    const [Uploading, setUploading] = useState(false);
    const [Error, setError] = useState(false);
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log(FormData);

    const handleUpload = async (e) => {
        if (Files.length > 0 && Files.length + FormData.imageUrls.length < 7) {
            const promise = [];
            setUploading(true);
            setImageUploadError(false);

            for (let i = 0; i < Files.length; i++) {
                await promise.push(storeImage(Files[i]));
            }

            Promise.all(promise)
                .then((urls) => {
                    setFormData({
                        ...FormData,
                        imageUrls: FormData.imageUrls.concat(urls),
                    });
                    setUploading(false);
                    setImageUploadError(false);
                })
                .catch((error) => {
                    setUploading(false);
                    setImageUploadError(
                        'Error Uploading Images! Please try again!'
                    );
                });
        } else if (Files.length === 0) {
            setImageUploadError('No Images Selected!');
            setUploading(false);
        } else {
            setImageUploadError('Max 6 Images are allowed!');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...FormData,
            imageUrls: FormData.imageUrls.filter((_, i) => i !== index),
        });
    };

    // console.log(FormData);

    const handleTypeChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...FormData,
                type: e.target.id,
            });
        }
    };

    const handleAmenitiesChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.id]: e.target.checked,
        });
    };

    const handleNumberChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.id]: e.target.value,
        });
    };

    const handleDataChange = (e) =>
    {
        setFormData({
            ...FormData,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(FormData);

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
            .post(
                'http://localhost:3000/api/listing/create',
                {
                    ...FormData,
                    userRef: currentUser._id,
                },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                setLoading(false);
                setError(false);
                navigate(`/listing/${response.data._id}`);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
                setLoading(false);
            });
    };

    return (
        <main
            className='p-3
            max-w-4xl
            mx-auto'
        >
            <h1
                className='text-3xl 
                font-semibold 
                text-center my-8'
            >
                Create Listing
            </h1>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col sm:flex-row gap-4'
            >
                {/* Form Data */}
                <div
                    className='flex flex-col
                    gap-3 flex-1'
                >
                    <Input
                        placeholder='Name'
                        id='name'
                        maxLength='62'
                        minLength='10'
                        onChange={handleDataChange}
                        value={FormData.name}
                    />
                    <textarea
                        required
                        type='text'
                        placeholder='Description'
                        className='border p-2 h-32
                            rounded-lg
                            outline-none
                            items-start'
                        id='description'
                        onChange={handleDataChange}
                        value={FormData.description}
                    />
                    <Input
                        placeholder='Address'
                        id='address'
                        onChange={handleDataChange}
                        value={FormData.address}
                    />

                    <div className='flex gap-6 flex-wrap'>
                        <CheckBox
                            id='sale'
                            name='Sell'
                            onChange={handleTypeChange}
                            checked={FormData.type === 'sale'}
                        />

                        <CheckBox
                            id='rent'
                            name='Rent'
                            onChange={handleTypeChange}
                            checked={FormData.type === 'rent'}
                        />

                        <CheckBox
                            id='parking'
                            name='Parking'
                            onChange={handleAmenitiesChange}
                            checked={FormData.parking}
                        />

                        <CheckBox
                            id='furnished'
                            name='Furnished'
                            onChange={handleAmenitiesChange}
                            checked={FormData.furnished}
                        />

                        <CheckBox
                            id='offer'
                            name='Offer'
                            onChange={handleAmenitiesChange}
                            checked={FormData.offer}
                        />
                    </div>

                    <div className='flex gap-6 flex-wrap text-sm'>
                        <ChangeableNumber
                            name='Bedrooms'
                            min
                            max
                            id='bedrooms'
                            onChange={handleNumberChange}
                            value={FormData.bedrooms}
                        />
                        <ChangeableNumber
                            name='Bathrooms'
                            min
                            max
                            id='bathrooms'
                            onChange={handleNumberChange}
                            value={FormData.bathrooms}
                        />

                        <ChangeableNumber
                            price
                            min
                            name='Regular Price'
                            id='regularPrice'
                            onChange={handleNumberChange}
                            value={FormData.regularPrice}
                        />

                        {FormData.offer && (
                            <ChangeableNumber
                                price
                                min
                                name='Discount Price'
                                id='discountPrice'
                                onChange={handleNumberChange}
                                value={FormData.discountPrice}
                            />
                        )}
                    </div>
                </div>

                {/* Image Upload */}
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        Images :
                        <span className='font-normal text-gray-500 ml-2'>
                            The First image will be the cover image (Max. 6
                            Images)
                        </span>
                    </p>
                    <div className='gap-4 items-center'>
                        <input
                            multiple
                            type='file'
                            id='image'
                            accept='image/*'
                            onChange={(e) => {
                                setFiles(e.target.files);
                            }}
                            className='p-2 
                                rounded-lg 
                                border 
                                border-gray-600 
                                w-full'
                        />

                        <UploadButton
                            onClick={handleUpload}
                            disabled={Uploading}
                        />
                    </div>
                    <p className='text-red-600'>
                        {ImageUploadError && ImageUploadError}
                    </p>
                    {FormData.imageUrls.length > 0 &&
                        FormData.imageUrls.map((url, index) => (
                            <div
                                className='flex p-2
                                justify-between
                                items-center
                                border
                                border-black
                                rounded-xl'
                            >
                                <img
                                    src={url}
                                    alt='uploaded'
                                    className='w-40 h-32
                                    rounded-lg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    {/* Delete Icon */}
                                    <MdDeleteForever size='30px' />
                                </button>
                            </div>
                        ))}
                    <button
                        disabled={Loading || Uploading}
                        className='bg-slate-600 
                        text-white
                        uppercase
                        rounded-lg p-1
                        hover:opacity-95
                        disabled:opacity-80'
                    >
                        {Loading ? 'Loading...' : 'Create Listing'}
                    </button>
                    {Error && <p className='text-red-600'>{Error}</p>}
                </div>
            </form>
        </main>
    );
};

export default CreateListing;
