import React from 'react';

export default function CheckBox({ onChange, name, checked, id }) {
    return (
        <div className='flex gap-1'>
            <input
                type='checkbox'
                id={id}
                className='w-4'
                onChange={onChange}
                checked={checked}
            />
            <span>{name}</span>
        </div>
    );
}
