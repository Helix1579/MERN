import { useSelector } from 'react-redux'

const Profile = () => {

    const { currentUser } = useSelector((state) => state.user)

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className=' text-3xl 
                font-semibold 
                text-center
                my-7'>
                Profile</h1>

            <form className='flex flex-col text-center gap-4'>
                <img src={currentUser.avatar} alt="Profile" 
                    className='rounded-full
                    h-40 w-40
                    object-cover
                    cursor-pointer
                    self-center
                    mt-2'/>
                
                <input type="text" placeholder='Username' id='username'
                    className='border p-2 pl-3 rounded-lg outline-none'/>
                <input type="text" placeholder='E-Mail' id='email'
                    className='border p-2 pl-3 rounded-lg outline-none'/>
                <input type="text" placeholder='Password' id='password'
                    className='border p-2 pl-3 rounded-lg outline-none'/>

                <button className='bg-slate-600 
                    text-white
                    uppercase
                    rounded-lg p-1
                    hover:opacity-95
                    disabled:opacity-80'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-600
                    cursor-pointer'>Delete Account?</span>
                <span className='text-red-600
                    cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default Profile