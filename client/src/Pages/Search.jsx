import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListingItem from '../Components/ListingItem';

const Search = () => {
    const [FilterData, setFilterData] = useState({
        search: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_At',
        order: 'desc',
    });
    const [Loading, setLoading] = useState(false);
    const [Listings, setListings] = useState([]);
    const [ShowMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    // console.log(Listings);

    const handleType = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
        ) {
            setFilterData({ ...FilterData, type: e.target.id });
        }

    };
    const handleSearch = (e) => {

        if (e.target.id === 'search') {
            setFilterData({ ...FilterData, search: e.target.value });
        }
    }

    const handleAmenities = (e) => {
        setFilterData({
            ...FilterData,
            [e.target.id]:
                e.target.checked || e.target.checked === 'true' ? true : false,
        });
    };

    const handleSort = (e) => {
        const sort = e.target.value.split('_')[0] || 'created_At';
        const order = e.target.value.split('_')[1] || 'desc';
        setFilterData({ ...FilterData, sort, order });
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const searchURL = searchParams.get('search');
        const typeURL = searchParams.get('type');
        const parkingURL = searchParams.get('parking');
        const furnishedURL = searchParams.get('furnished');
        const offerURL = searchParams.get('offer');
        const sortURL = searchParams.get('sort');
        const orderURL = searchParams.get('order');

        if (
            searchURL ||
            typeURL ||
            parkingURL ||
            furnishedURL ||
            offerURL ||
            sortURL ||
            orderURL
        ) {
            setFilterData({
                search: searchURL || '',
                type: typeURL || 'all',
                parking: parkingURL === 'true' ? true : false,
                furnished: furnishedURL === 'true' ? true : false,
                offer: offerURL === 'true' ? true : false,
                sort: sortURL || 'created_At',
                order: orderURL || 'desc',
            });
        }

        const fetchData = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = searchParams.toString();

            await axios
                .get(`http://localhost:4000/api/listing/get?${searchQuery}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    setListings(res.data);
                    // console.log(res.data.length);

                    if (res.data.length > 8) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }

                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(FilterData);

        const searchParams = new URLSearchParams();
        searchParams.set('search', FilterData.search);
        searchParams.set('type', FilterData.type);
        searchParams.set('parking', FilterData.parking);
        searchParams.set('furnished', FilterData.furnished);
        searchParams.set('offer', FilterData.offer);
        searchParams.set('sort', FilterData.sort);
        searchParams.set('order', FilterData.order);
        const searchQuery = searchParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMore = async () => {
        const totalListings = Listings.length;
        const startIndex = totalListings;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('startIndex', startIndex);
        const searchQuery = searchParams.toString();

        await axios
            .get(`http://localhost:4000/api/listing/get?${searchQuery}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.length < 9) {
                    setShowMore(false);
                }
                setListings([...Listings, ...res.data]);
            });
    };

    return (
        <div
            className='flex
            flex-col 
            sm:flex-row'
        >
            {/* Left Div */}
            <div
                className='p-5
                border-r-2
                border-b-2
                border-white
                md:border-r-1'
            >
                <form
                    className='flex gap-6
                    flex-col sticky top-20'
                    onSubmit={handleSubmit}
                >
                    <div
                        className='flex gap-2
                        items-center'
                    >
                        <label
                            className='whitespace-nowrap
                            font-semibold'
                        >
                            {' '}
                            Search :{' '}
                        </label>
                        <input
                            type='text'
                            id='search'
                            placeholder='Search'
                            className=' pl-3
                                rounded-full
                                p-1 w-full
                                outline-none'
                            value={FilterData.search}
                            onChange={handleSearch}
                        />
                    </div>
                    <div
                        className='flex gap-2
                        flex-wrap 
                        items-center'
                    >
                        <label className='font-semibold'> Type : </label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='all'
                                className='w-5'
                                onChange={handleType}
                                checked={FilterData.type === 'all'}
                            />
                            <span> Rent & Sale </span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                                onChange={handleType}
                                checked={FilterData.type === 'rent'}
                            />
                            <span> Rent </span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleType}
                                checked={FilterData.type === 'sale'}
                            />
                            <span> Sale </span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                                onChange={handleAmenities}
                                checked={FilterData.offer}
                            />
                            <span> Offer </span>
                        </div>
                    </div>

                    <div
                        className='flex gap-2
                        flex-wrap 
                        items-center'
                    >
                        <label className='font-semibold'> Amenities : </label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                                onChange={handleAmenities}
                                checked={FilterData.furnished}
                            />
                            <span> Furnished </span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleAmenities}
                                checked={FilterData.parking}
                            />
                            <span> Parking </span>
                        </div>
                    </div>

                    <div
                        className='flex
                        items-center
                        gap-2'
                    >
                        <label className='font-semibold'> Sort: </label>
                        <select
                            id='sort'
                            className='rounded-lg 
                            outline-none p-1'
                            onChange={handleSort}
                        >
                            defaultValue={'created_At_desc'}
                            <option value='regularPrice_desc'>
                                {' '}
                                Price High to Low{' '}
                            </option>
                            <option value='regularPrice_asc'>
                                {' '}
                                Price Low to High{' '}
                            </option>
                            <option value='createdAt_desc'> Latest </option>
                            <option value='createdAt_asc'> Oldest </option>
                        </select>
                    </div>

                    <button
                        className='bg-slate-600
                        text-white
                        uppercase p-1
                        rounded-lg
                        hover:opacity-95'
                    >
                        {' '}
                        Search
                    </button>
                </form>
            </div>

            {/* Right Div */}

            <div className='flex-1'>
                <h1
                    className='text-3xl
                    font-semibold
                    p-2 my-5 mx-5
                    text-slate-700'
                >
                    Search Results :
                </h1>
                <div
                    className='p-7 flex
                    flex-wrap gap-4'
                >
                    {!Loading && Listings.length === 0 && (
                        <p
                            className='text-xl
                            text-slate-700'
                        >
                            No Listings Found !
                        </p>
                    )}
                    {Loading && (
                        <p
                            className='text-xl
                            text-center
                            text-slate-700
                            w-full'
                        >
                            Loading...
                        </p>
                    )}

                    {!Loading &&
                        Listings &&
                        Listings.map((listing) => (
                            <ListingItem key={listing._id} Listing={listing} />
                        ))}

                    {ShowMore && (
                        <button
                            className='text-slate-600
                            hover:underline
                            p-2 w-full
                            text-center'
                            onClick={onShowMore}
                        >
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
