import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [Search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('search', Search);
        const searchQuery = searchParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('search');
        if (searchTermFromUrl) {
            setSearch(searchTermFromUrl);
        }

        // eslint-disable-next-line
    }, [window.location.search]);

    return (
        <header
            className='bg-slate-200 
                shadow-md 
                w-full z-50
                fixed top-0 
                inset-x-0'
        >
            <div
                className='flex
                justify-between
                items-center 
                max-w-6xl 
                p-3 mx-auto'
            >
                <Link to='/'>
                    <h1
                        className='font-bold 
                        text-xl 
                        flex
                        flex-wrap'
                    >
                        <span className='text-slate-500 '> Felix </span>
                        <span className='text-slate-700 '> Estates </span>
                    </h1>
                </Link>

                <form
                    className='bg-slate-100
                    rounded-full flex
                    py-1 pr-3
                    items-center'
                    onSubmit={handleSearch}
                >
                    <input
                        type='text'
                        placeholder='Search'
                        className='bg-transparent
                        pl-4 px-1
                        focus:outline-none
                        w-24 sm:w-60'
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-400' />
                    </button>
                </form>

                <ul className='flex gap-6 font-semibold'>
                    <Link to='/'>
                        <li
                            className='
                            hidden
                            sm:inline
                            text-slate-600
                            hover:underline'
                        >
                            Home{' '}
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li
                            className='
                            hidden
                            sm:inline
                            text-slate-600
                            hover:underline'
                        >
                            About{' '}
                        </li>
                    </Link>

                    {currentUser && (
                        <Link to='/userListing'>
                            <li
                                className='
                                    hidden
                                    sm:inline
                                    text-slate-600
                                    hover:underline'
                            >
                                MyListing{' '}
                            </li>
                        </Link>
                    )}

                    <Link to='/profile'>
                        {currentUser ? (
                            <img
                                alt='Profile'
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.avatar}
                            />
                        ) : (
                            <li className='text-slate-600 hover:underline'>
                                {' '}
                                Sign In{' '}
                            </li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
};

export default Header;
