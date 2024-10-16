import React from 'react'

type Props = {
    title: string;
    onClick?: Function;
}
export const Button = ({ title, onClick }: Props) => {
    return (
        <button onClick={() => onClick?.()} type="button" className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">{title}</button>
    )
}
