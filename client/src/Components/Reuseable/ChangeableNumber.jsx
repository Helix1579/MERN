import React from 'react';

export default function ChangeableNumber({
    id,
    onChange,
    value,
    min = false,
    max = false,
    name,
    price = false,
}) {
    return (
        <div className='flex gap-1 items-center'>
            <input
                required
                type='number'
                className={
                    price
                        ? 'p-1 w-28 rounded-xl outline-none text-center'
                        : 'p-1 w-12 rounded-xl outline-none text-center'
                }
                min={min ? 1 : null}
                max={max ? 10 : null}
                id={id}
                onChange={onChange}
                value={value}
            />
            {price ? (
                <div className='text-center'>
                    <p>{name}</p>
                    <span className='text-xs'>($ / Month)</span>
                </div>
            ) : (
                <p>{name}</p>
            )}
        </div>
    );
}
