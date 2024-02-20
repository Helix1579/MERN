import React from 'react'

const CreateListing = () => {
    return (
        <main className='p-3
            max-w-4xl
            mx-auto'>
            <h1 
                className='text-3xl 
                font-semibold 
                text-center my-8'>
                    Create Listing
            </h1>

            <form className='flex flex-col sm:flex-row gap-4'>
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
                        minLength='10'/>
                    <textarea required
                        type='text' 
                        placeholder='Description'
                        className='border p-2
                            rounded-lg
                            outline-none'
                        id='description'/>
                    <input required
                        type='text' 
                        placeholder='Address'
                        className='border p-2
                            rounded-lg
                            outline-none'
                        id='address'/>

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-1'>
                            <input type='checkbox' id='sell' className='w-4'/>
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox' id='rent' className='w-4'/>
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox' id='parking' className='w-4'/>
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox' id='furnished' className='w-4'/>
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox' id='offer' className='w-4'/>
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex gap-6 flex-wrap text-sm'>
                        <div className='flex gap-1 items-center'>
                            <input required
                                type='number' 
                                min='1'
                                max='10'
                                className='p-1 w-12
                                    rounded-xl
                                    outline-none
                                    text-center'
                                id='bedrooms'/>
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
                                id='bath'/>
                            <p>Baths</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <input required
                                type='number'
                                className='p-1 w-28
                                    rounded-xl
                                    outline-none
                                    text-center'
                                id='regularPrice'/>
                            <div className='text-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / Month)</span>
                            </div>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <input required
                                type='number'
                                className='p-1 w-28
                                    rounded-xl
                                    outline-none
                                    text-center'
                                id='discountPrice'/>
                            <div className='text-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / Month)</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images : 
                        <span className='font-normal text-gray-500 ml-2'>
                            The First image will be the cover image (Max. 6 Images)
                        </span>
                    </p>
                    <div className="flex gap-4">
                        <input type="file" id="image" accept='image/*' multiple max='6'
                            className='p-2 rounded-lg border border-gray-600 w-full'/>
                        <button 
                            className='p-2 
                                text-green-500
                                rounded-lg
                                border 
                                border-green-600
                                uppercase
                                hover:shadow-lg
                                disabled:opacity-80'>
                            Upload
                        </button>
                    </div>
                    <button 
                        className='bg-slate-600 
                        text-white
                        uppercase
                        rounded-lg p-1
                        hover:opacity-95
                        disabled:opacity-80'>
                        Create Listing
                    </button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing