import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { signInSuccess } from '../Redux/User/UserSlice';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const OAuth = () => {

    const dispatch = useDispatch();

    const handleGoogleClick = async() => {

        console.log('google clicked');
        
        try 
        {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await axios.post(
                'http://localhost:3000/api/auth/google',
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }
            )

            console.log(res);

            dispatch(signInSuccess(res));

        } catch (error) {
            console.log("Could not log in with Google account.", error);
        }
    }


    return (
        <button type='button' onClick={handleGoogleClick} className='bg-red-700
            text-white
            p-2
            rounded-lg
            uppercase
            hover:opacity-85'> Continue with google </button>
    )
}

export default OAuth