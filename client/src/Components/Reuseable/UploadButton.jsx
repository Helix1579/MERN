import React from 'react';
import { MdOutlineUploadFile } from 'react-icons/md';

export default function UploadButton({ onClick, disabled }) {
    return (
        <button
            type='button'
            onClick={onClick}
            disabled={disabled}
            className='p-2 mt-4
                w-full
                text-green-500
                rounded-lg
                border
                
                border-green-600
                uppercase
                hover:shadow-lg
                disabled:opacity-80'
        >
            {disabled ? (
                'Uploading...'
            ) : (
                <MdOutlineUploadFile size='24px' className='w-full' />
            )}
        </button>
    );
}
