import React from 'react'

const Search = () => {
    return (
        <div className="flex 
            flex-col 
            md:flex-row">
            <div className='p-5 
                border-b-2
                border-white
                md:border-r-1
                md:min-h-screen'>
                <form className='flex gap-6
                    flex-col'>
                    <div className="flex gap-2
                        items-center">
                        <label className='whitespace-nowrap
                            font-semibold'> Search : </label>
                        <input type="text" 
                            id='search'
                            placeholder='Search'
                            className=' pl-3
                                rounded-full
                                p-1 w-full
                                outline-none'/>
                    </div>
                    <div className="flex gap-2
                        flex-wrap 
                        items-center">
                        <label className='font-semibold'> Type : </label>
                        <div className="flex gap-2">
                            <input type="checkbox" 
                                id='all'
                                className='w-5'/>
                                <span> Rent & Sale </span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" 
                                id='rent'
                                className='w-5'/>
                                <span> Rent </span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" 
                                id='sale'
                                className='w-5'/>
                                <span> Sale </span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" 
                                id='offer'
                                className='w-5'/>
                                <span> Offer </span>
                        </div>
                    </div>
                    <div className="flex gap-2
                        flex-wrap 
                        items-center">
                        <label className='font-semibold'> Amenities : </label>
                        <div className="flex gap-2">
                            <input type="checkbox" 
                                id='furnished'
                                className='w-5'/>
                                <span> Furnished </span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" 
                                id='parking'
                                className='w-5'/>
                                <span> Parking </span>
                        </div>
                    </div>
                    <div className="flex
                        items-center
                        gap-2">
                        <label className='font-semibold'> Sort: </label>
                        <select id='sort'
                            className='rounded-lg 
                            outline-none p-1'>
                            <option> Price High to Low </option>
                            <option> Price Low to High </option>
                            <option> Latest </option>
                            <option> Oldest </option>
                            </select>
                    </div>

                    <button className='bg-slate-600
                        text-white
                        uppercase p-1
                        rounded-lg
                        hover:opacity-95'> Search </button>
                </form>
            </div>
            <div className="">
                <h1 className='text-3xl
                    font-semibold
                    p-2 my-5 mx-5
                    text-slate-700'>Search Results : </h1>
            </div>
        </div>
    )
}

export default Search