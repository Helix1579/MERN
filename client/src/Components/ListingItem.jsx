import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapLocationDot, FaBath, FaBed  } from "react-icons/fa6";

const ListingItem = ({Listing}) => {
    // console.log(Listing);
    return (
        <div className='bg-white
            shadow-xl w-full
            sm:w-[350px]
            hover:shadow-2xl
            transition-shadow
            overflow-hidden
            rounded-xl'>
            <Link to={`/listing/${Listing._id}`}>
                <img src={Listing.imageUrls[0]} 
                    alt={Listing.name} 
                    className='h-[320px]
                        sm:h-[220px]
                        w-full
                        object-cover
                        hover:scale-95
                        duration-300'/>
                <div className="p-1 pl-3 flex
                    flex-col gap-2 w-full">
                    <p className=' text-lg
                        font-semibold
                        truncate
                        text-slate-700'>
                        {Listing.name}
                    </p>
                    <div className='flex gap-2 items-center'>
                        <FaMapLocationDot className='text-green-600' size='17px'/>
                        <p className='text-sm
                            turncate w-full
                            text-slate-600'>
                            {Listing.address}
                        </p>
                    </div>
                    <p className='text-sm
                        text-slate-600
                        line-clamp-2'>
                        {Listing.description}
                    </p>
                    <p className='text-slate-500
                        mt-1 font-semibold'>
                        $
                        { Listing.offer ? Listing.discountPrice.toLocaleString('en-US')
                            : Listing.regularPrice.toLocaleString('en-US')
                        }
                        { Listing.type === 'rent' && ' / Month' }
                    </p>
                    <div className="flex gap-4 items-center">
                        <div className="text-xs flex gap-1">
                            <FaBed/>
                            {Listing.bedrooms > 1 ? `${Listing.bedrooms} Beds` : `${Listing.bedrooms} Bed`}
                        </div>
                        <div className="text-xs flex gap-1">
                            <FaBath/>
                            {Listing.bathrooms > 1 ? `${Listing.bathrooms} Baths` : `${Listing.bathrooms} Bath`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ListingItem