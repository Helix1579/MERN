import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MdModeEdit, MdDelete } from "react-icons/md";

const ShowListing = () => {

    const { currentUser } = useSelector((state) => state.user)
    const [UserListing, setUserListing] = useState([])
    const [ListingError, setListingError] = useState(false)

    const handleShowListing = async () => {
        console.log('Show Listing')

        try {
            await axios
                .get(`http://localhost:3000/api/user/listing/${currentUser._id}`,
                {
                    withCredentials: true
                })
                .then((res) => {
                    console.log(res.data);
                    setUserListing(res.data);
                })
                .catch((error) => {
                    console.log(error.response);
                    setListingError(error.response.data);
                })
            
        } catch (error) {
            setListingError(true);
        }
    }

    const handleEditListing = async (listingId) => {
        console.log('Edit Listing')
    }

    const handleDeleteListing = async (listingId) => {
        console.log('Delete Listing')
        
        try
        {
            await axios
                .delete(`http://localhost:3000/api/listing/delete/${listingId}`,
                {
                    withCredentials: true
                })
                .then((res) => {
                    console.log(res.data);
                    setUserListing((prev) => prev.filter((listing) => listing._id !== listingId));
                })
                .catch((error) => {
                    console.log(error.response);
                    setListingError(error.response.data);
                })
        }
        catch (error) {
            console.log(error.response);
            setListingError(true);
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className=' text-3xl 
                font-semibold 
                text-center
                uppercase
                my-7'>
                All Listings
            </h1>
               
            <div className="flex flex-col
                justify-between">
                <button className='bg-blue-500 
                    hover:bg-blue-700 
                    text-white 
                    font-bold 
                    py-2 px-4 mb-4
                    rounded' 
                    onClick={handleShowListing}> 
                    Show Listing
                </button>
                {ListingError && <p className='text-red-500 text-xs mt-2'>{ListingError}</p>}

                {UserListing && UserListing.length > 0 && 
                UserListing.map((listing) => (
                    <div key={listing._id} 
                        className='border 
                        border-red-500
                        rounded-xl
                        p-2 flex flex-row
                        my-1
                        justify-between
                        items-center
                        gap-4'>
                        <Link to={`/listing/${listing.userRef}`}>
                            <img src={listing.imageUrls[0]} 
                                alt={listing.title} 
                                className='w-36 h-32
                                rounded-xl border border-gray-800
                                object-contain' />
                        </Link>
                        <Link className='flex-1 
                            font-semibold
                            hover:underline
                            turncate'
                            to={`/listing/${listing._id}`}>
                            <p>{listing.name}</p>
                        </Link>
                        <div className="flex flex-col
                            items-center">
                                
                            <button onClick={() => handleEditListing(listing._id)}
                                className="uppercase
                                w-11 h-11 flex 
                                items-center 
                                justify-center">
                                    <MdModeEdit size='24px'/>
                            </button>
                                
                            <button onClick={() => handleDeleteListing(listing._id)}
                                className="uppercase 
                                w-11 h-11 flex 
                                items-center 
                                justify-center">
                                    <MdDelete size='24px'/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowListing