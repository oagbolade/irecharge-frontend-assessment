import { Check, Delete } from '@mui/icons-material'
import React from 'react'

export const Notes = () => {
    return (
        <div className="flex flex-1 items-center justify-center mb-4">
            <div className="w-full">
                <form className="mt-5 sm:flex sm:items-center">
                    <textarea id="q" name="notes" className="h-20 inline w-11/12 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="City Name" />
                    <Delete className='ml-3' color='error' />
                    <Check className='ml-3' color='success' />
                </form>
            </div>
        </div>
    )
}
