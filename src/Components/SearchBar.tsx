import React, { useState } from 'react'
import { Button } from './Button';

export const SearchBar = () => {
    const [city, setCity] = useState('');

    const handleSearch = (e: { preventDefault: () => void; }) => {
        if (city.trim().length > 0) {
            window.location.href = `/details?city=${city}`;
        }
    }

    return (
        <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-lg">
                <div className="mt-5 sm:flex sm:items-center">
                    <input onChange={(e) => setCity(e.target.value)} id="q" name="city" className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="City Name" type="text" />
                    <Button onClick={handleSearch} title="Search" />
                </div>
            </div>
        </div>
    )
}
