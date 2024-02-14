import React, { useState, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {

    const [FormData, setFormData] = useState({});
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setFormData({
            ...FormData,
            [e.target.id]: e.target.value
        })
    }
    // console.log(FormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(FormData);

        setLoading(true);

        await axios
            .post('http://localhost:3000/api/auth/signin', FormData)
            .then((res) => {
                console.log(res.data);
                setLoading(false);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })

    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-5'>Sign Up</h1>
            <form  className='flex flex-col gap-3'onSubmit={handleSubmit} >
                    <input type='email' placeholder='E-Mail' id='email'
                        onChange={handleChanges}
                        className='border 
                        p-2 
                        rounded-lg
                        outline-none'/>
                <input type='Password' placeholder='Password' id='password'
                    onChange={handleChanges}
                    className='border 
                    p-2 
                    rounded-lg
                    outline-none'/>
                <button className='bg-slate-600
                    text-white 
                    p-2
                    rounded-lg 
                    uppercase
                    hover:scale-105 duration-300'> 
                    {
                        Loading ? 'Loading...' : 'Sign In'
                    } 
                </button>
            </form>
            <div className='flex 
                gap-1
                mt-2'>
                <p>Don't Have an Account?</p>
                <Link to={"/sign-up"}>
                    <span className='text-blue-500'>Sign Up</span>
                </Link>
            </div>
        </div>
    )
}

export default SignIn