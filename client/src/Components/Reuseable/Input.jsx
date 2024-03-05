import React from 'react';

function Input({ placeholder, id, onChange, value }) {
    return (
        <input
            required
            type='text'
            placeholder={placeholder}
            className='border p-2
                rounded-lg
                outline-none'
            id={id}
            onChange={onChange}
            value={value}
        />
    );
}

export default Input;
