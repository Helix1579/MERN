import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = ({ Listing }) => {
    const [Landlord, setLandlord] = useState(null);
    const [Message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            await axios
                .get(`http://localhost:3000/api/user/${Listing.userRef}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log('res : ', res);
                    setLandlord(res.data);
                })
                .catch((error) => {
                    console.log('Error : ', error.response);
                });
        };
        // console.log("Landlord : ", Landlord);
        fetchLandlord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Listing.userRef]);

    return (
        <>
            {Landlord && (
                <div className='flex flex-col gap-2'>
                    <p>
                        Contact{' '}
                        <span className='font-semibold'>
                            {Landlord.username}
                        </span>{' '}
                        for{' '}
                        <span className='font-semibold'>
                            {Listing.name.toLowerCase()}
                        </span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='7'
                        value={Message}
                        onChange={onChange}
                        placeholder='Enter your message here...'
                        className='w-full 
                        border p-2 pl-3 
                        rounded-xl'
                    ></textarea>

                    <Link
                        to={`mailto:${Landlord.email}?subject=Regarding ${Listing.name}&body=${Message}`}
                        className='bg-slate-700 
                            text-white 
                            text-center p-3 
                            uppercase rounded-lg 
                            hover:opacity-95'
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    );
};

export default Contact;
