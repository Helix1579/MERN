import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-5'>Sign Up</h1>
            <form className='flex flex-col gap-3'>
                <input type='text' placeholder='Username' 
                    className='border 
                    p-2 
                    rounded-lg
                    outline-none'/>
                <input type='Password' placeholder='Password' 
                    className='border 
                    p-2 
                    rounded-lg
                    outline-none'/>
                <input type='email' placeholder='E-Mail' 
                    className='border 
                    p-2 
                    rounded-lg
                    outline-none'/>
                <button className='bg-slate-600
                    text-white 
                    p-2
                    rounded-lg 
                    uppercase
                    hover:scale-105 duration-300'> Sign Up </button>
            </form>
            <div className='flex 
                gap-1
                mt-2'>

                <p>Have an Account?</p>
                <Link to={"/sign-in"}>
                    <span className='text-blue-500'>Sign In</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUp