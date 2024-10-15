import React from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Save as SaveIcon } from '@mui/icons-material';

type Props = {
    title: string;
    isDelete?: boolean;
    onClick?: () => void; // Updated to ensure onClick works properly
};

export const DeleteButton = ({ title, isDelete = false, onClick }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`mt-3 inline-flex items-center justify-center rounded-md border border-transparent ${isDelete ? 'bg-red-600' : 'bg-indigo-600'} p-1 font-bold text-white shadow-sm ${isDelete ? 'hover:bg-red-700' : 'hover:bg-indigo-700'} focus:outline-none focus:ring-2 ${isDelete ? 'focus:ring-red-500' : 'focus:ring-indigo-500'} focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs`}
        >
            <DeleteIcon className="mr-2" fontSize='small' />
            {title}
        </button>
    );
};
