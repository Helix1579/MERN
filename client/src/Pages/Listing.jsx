import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import axios from 'axios';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import Contact from '../Components/Contact';

const Listing = () => {
    SwiperCore.use([Navigation]);
    const [Listing, setListing] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const params = useParams();

    // console.log(currentUser._id, Listing?.userRef);
    // console.log("Listing : ", Listing );

    useEffect(() => {
        const fetchListings = async () => {
            const listingId = params.listingId;

            setLoading(true);
            setError(false);

            await axios
                .get(`http://localhost:3000/api/listing/get/${listingId}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    // console.log(res.data);
                    setListing(res.data);
                    setLoading(false);
                    setError(false);
                })
                .catch((error) => {
                    setError(true);
                    setLoading(false);
                    console.log(error.response);
                });
        };
        fetchListings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <main>
            {Loading && (
                <p
                    className='text-center
                    text-2xl my-5'
                >
                    {Loading} Loading...
                </p>
            )}
            {Error && (
                <p
                    className='text-center
                    text-2xl my-5'
                >
                    {Error} Something went wrong...
                </p>
            )}
            {Listing && !Loading && !Error && (
                <div>
                    <Swiper navigation>
                        {Listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className='h-[550px]'
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: 'contain',
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        className='fixed 
                            top-[13%] right-[3%] 
                            z-10 border rounded-full
                            w-12 h-12 flex
                            justify-center 
                            items-center
                            bg-slate-100
                            cursor-pointer'
                    >
                        <FaShare
                            className='text-slate-500'
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    window.location.href
                                );
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}
                        />
                    </div>
                    {copied && (
                        <p
                            className='fixed 
                                top-[23%] 
                                right-[5%] 
                                z-10 p-2
                                rounded-md 
                                bg-slate-100 '
                        >
                            Link copied!
                        </p>
                    )}
                    <div
                        className='flex 
                            flex-col
                            max-w-4xl 
                            mx-auto 
                            p-3 my-7 
                            gap-4'
                    >
                        <p className='text-2xl font-semibold'>
                            {Listing.name} - ${' '}
                            {Listing.offer
                                ? Listing.discountPrice.toLocaleString('en-US')
                                : Listing.regularPrice.toLocaleString('en-US')}
                            {Listing.type === 'rent' && ' / month'}
                        </p>
                        <p
                            className='flex 
                                items-center 
                                mt-6 gap-2
                                text-slate-600  
                                text-sm'
                        >
                            <FaMapMarkedAlt
                                size='22px'
                                className='text-green-700'
                            />
                            {Listing.address}
                        </p>
                        <div className='flex gap-4'>
                            <p
                                className='bg-red-800 
                                    w-full p-1
                                    uppercase
                                    max-w-[200px] 
                                    text-white 
                                    text-center
                                    rounded-md'
                            >
                                {Listing.type === 'rent'
                                    ? 'For Rent'
                                    : 'For Sale'}
                            </p>
                            {Listing.offer && (
                                <p
                                    className='bg-green-900 
                                        w-full p-1
                                        max-w-[200px] 
                                        text-white 
                                        text-center 
                                        rounded-md'
                                >
                                    $
                                    {+Listing.regularPrice -
                                        +Listing.discountPrice}{' '}
                                    OFF
                                </p>
                            )}
                        </div>
                        <p className='text-slate-800'>
                            <span className='font-semibold text-black'>
                                Description -{' '}
                            </span>
                            {Listing.description}
                        </p>
                        <ul
                            className='
                                font-semibold 
                                text-sm 
                                flex flex-wrap 
                                items-center 
                                gap-4 sm:gap-6'
                        >
                            <li
                                className='flex 
                                    text-stone-600
                                    items-center gap-1
                                    whitespace-nowrap '
                            >
                                <FaBed className='text-lg' />
                                {Listing.bedrooms > 1
                                    ? `${Listing.bedrooms} beds `
                                    : `${Listing.bedrooms} bed `}
                            </li>
                            <li
                                className='flex 
                                    text-sky-600
                                    items-center gap-1 
                                    whitespace-nowrap '
                            >
                                <FaBath className='text-lg' />
                                {Listing.bathrooms > 1
                                    ? `${Listing.bathrooms} baths `
                                    : `${Listing.bathrooms} bath `}
                            </li>
                            {Listing.parking ? (
                                <li
                                    className='flex text-green-600
                                        items-center gap-1 
                                        whitespace-nowrap '
                                >
                                    <FaParking className='text-lg' />
                                    <div className=''>Parking spot</div>
                                </li>
                            ) : (
                                <li
                                    className='flex text-red-600
                                    items-center gap-1 
                                    whitespace-nowrap '
                                >
                                    <FaParking className='text-lg' />
                                    <div className=''>No Parking</div>
                                </li>
                            )}
                            {Listing.furnished ? (
                                <li
                                    className='flex text-green-600
                                        items-center gap-1 
                                        whitespace-nowrap '
                                >
                                    <FaChair className='text-lg' />
                                    Furnished
                                </li>
                            ) : (
                                <li
                                    className='flex text-red-600
                                    items-center gap-1 
                                    whitespace-nowrap '
                                >
                                    <FaChair className='text-lg' />
                                    Unfurnished
                                </li>
                            )}
                        </ul>
                        {currentUser &&
                            Listing.userRef === currentUser._id &&
                            !contact && (
                                <button
                                    onClick={() => setContact(true)}
                                    className='bg-slate-700 
                                    text-white 
                                    rounded-lg 
                                    uppercase 
                                    hover:opacity-95 
                                    p-2'
                                >
                                    Contact landlord
                                </button>
                            )}
                        {contact && <Contact Listing={Listing} />}
                    </div>
                </div>
            )}
        </main>
    );
};

export default Listing;
