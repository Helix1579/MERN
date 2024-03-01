import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import axios from 'axios';
import ListingItem from '../Components/ListingItem';
import { RxDoubleArrowRight } from 'react-icons/rx';

const Home = () => {
    const [OfferListings, setOfferListings] = useState([]);
    const [SaleListings, setSaleListings] = useState([]);
    const [RentListings, setRentListings] = useState([]);
    SwiperCore.use([Navigation]);

    // console.log('Offer : ',OfferListings);
    // console.log('Sale : ',SaleListings);
    // console.log('Rent : ',RentListings);

    useEffect(() => {
        const OfferListingData = async () => {
            await axios
                .get(
                    `http://localhost:3000/api/listing/get?offer=true&limit=6`,
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    // console.log(res.data);
                    setOfferListings(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        const SaleListingData = async () => {
            await axios
                .get(
                    `http://localhost:3000/api/listing/get?type=sale&limit=6`,
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    // console.log(res.data);
                    setSaleListings(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        const RentListingData = async () => {
            await axios
                .get(
                    `http://localhost:3000/api/listing/get?type=rent&limit=6`,
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    // console.log(res.data);
                    setRentListings(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        OfferListingData();
        SaleListingData();
        RentListingData();
    }, []);
    return (
        <div className=''>
            {/* top */}
            <div
                className='flex
                flex-col
                gap-5 p-28
                px-3 max-w-6xl
                mx-auto'
            >
                <h1
                    className='text-slate-700
                    font-bold
                    text-3xl
                    lg:text-6xl'
                >
                    Find your next{' '}
                    <span className='text-slate-500'> perfect </span>
                    <br /> place with ease{' '}
                </h1>

                <div
                    className='text-gray-500
                    text-sm
                    sm:text-sm'
                >
                    Felix Estate is the best place to find your next perfect
                    place to live.
                    <br /> We have a wide range of properties for you to choose
                    from.
                </div>

                <Link
                    to={'/search'}
                    className='text-sm
                    sm:text-sm
                    text-blue-600
                    font-bold
                    hover:underline'
                >
                    Let's get started...
                </Link>
            </div>

            {/* swiper */}
            <Swiper navigation>
                {OfferListings &&
                    OfferListings.length > 0 &&
                    OfferListings.map((listing) => (
                        <SwiperSlide>
                            <div
                                style={{
                                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                                    backgroundSize: 'contain',
                                }}
                                className='h-[500px]'
                                key={listing._id}
                            ></div>
                        </SwiperSlide>
                    ))}
            </Swiper>

            {/* offer/ sale/ rent */}

            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
                {OfferListings && OfferListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2
                                className='text-2xl 
                            font-semibold 
                            text-slate-600  
                            flex flex-row 
                            justify-between 
                            items-center'
                            >
                                Recent Offers
                                <Link
                                    className='text-sm 
                                text-blue-800 
                                hover:underline
                                pr-12 flex flex-row
                                items-center gap-1'
                                    to={'/search?offer=true'}
                                >
                                    Show more{' '}
                                    <span>
                                        <RxDoubleArrowRight />
                                    </span>
                                </Link>
                            </h2>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {OfferListings.map((listing) => (
                                <ListingItem
                                    Listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {RentListings && RentListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2
                                className='text-2xl 
                            font-semibold 
                            text-slate-600  
                            flex flex-row 
                            justify-between 
                            items-center'
                            >
                                Recent places for rent
                                <Link
                                    className='text-sm 
                                text-blue-800 
                                hover:underline
                                pr-12 flex flex-row
                                items-center gap-1'
                                    to={'/search?type=rent'}
                                >
                                    Show more{' '}
                                    <span>
                                        <RxDoubleArrowRight />
                                    </span>
                                </Link>
                            </h2>
                        </div>
                        <div className='flex flex-wrap gap-5'>
                            {RentListings.map((listing) => (
                                <ListingItem
                                    Listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {SaleListings && SaleListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2
                                className='text-2xl 
                            font-semibold 
                            text-slate-600  
                            flex flex-row 
                            justify-between 
                            items-center'
                            >
                                Recent places for sale
                                <Link
                                    className='text-sm 
                                text-blue-800 
                                hover:underline
                                pr-12 flex flex-row
                                items-center gap-1'
                                    to={'/search?type=sale'}
                                >
                                    Show more{' '}
                                    <span>
                                        <RxDoubleArrowRight />
                                    </span>
                                </Link>
                            </h2>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {SaleListings.map((listing) => (
                                <ListingItem
                                    Listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
