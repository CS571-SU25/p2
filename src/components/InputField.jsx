import React from 'react';

export default function InputField({ value, onChange }) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="border border-gray-300 p-1 rounded"
            placeholder="Fill in"
        />
    );
}
