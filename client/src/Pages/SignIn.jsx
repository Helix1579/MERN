import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from '../Redux/User/UserSlice';
import axios from 'axios';
import OAuth from '../Components/OAuth';

const SignIn = () => {
    const [FormData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChanges = (e) => {
        setFormData({
            ...FormData,
            [e.target.id]: e.target.value,
        });
    };
    // console.log(FormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(FormData);

        dispatch(signInStart());

        await axios
            .post('http://localhost:4000/api/auth/signin', FormData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                dispatch(signInSuccess(res.data));
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response);
                dispatch(signInFailure(err.response.data.message));
            });
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-5'>Sign Up</h1>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='E-Mail'
                    id='email'
                    onChange={handleChanges}
                    className='border 
                        p-2 
                        rounded-lg
                        outline-none'
                />
                <input
                    type='Password'
                    placeholder='Password'
                    id='password'
                    onChange={handleChanges}
                    className='border 
                    p-2 
                    rounded-lg
                    outline-none'
                />
                <button
                    disabled={loading}
                    className='bg-slate-600
                    text-white 
                    p-2
                    rounded-lg 
                    uppercase
                    hover:scale-105 duration-300'
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
                <OAuth />
            </form>
            <div
                className='flex 
                gap-1
                mt-2'
            >
                <p>Don't Have an Account?</p>
                <Link to={'/sign-up'}>
                    <span className='text-blue-500'>Sign Up</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
};

export default SignIn;
