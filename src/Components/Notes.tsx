import { Check, Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { useGetParams } from '../../utils/useGetParams';
import { getStoredNotes, INotes } from '../../utils/offline-storage';
import { AlertContext } from '../../context/AlertContext';

type Props = {
    note: string;
    noteId: number;
    isNewNote?: boolean;
    setAllNotesFromCity?: Dispatch<SetStateAction<INotes>>;
}

export const Notes = ({ note, noteId, setAllNotesFromCity, isNewNote }: Props) => {
    const { toggleAlert, setMessage } = useContext(AlertContext);
    const cityName = useGetParams('city') || '';
    const notesStorage = getStoredNotes(cityName) || {};
    const [notes, setNotes] = useState(note || '');

    const saveNote = () => {
        if (notes.trim().length === 0) {
            return;
        }

        if (isNewNote) {
            const updatedNotes = !notesStorage[cityName] ? { [cityName]: [notes] } : { [cityName]: [...notesStorage[cityName], notes] };
            console.log('newNotes', updatedNotes);
            localStorage.setItem(cityName, JSON.stringify(updatedNotes));
            setAllNotesFromCity?.({ [cityName]: updatedNotes } as unknown as INotes);

            setMessage('Note saved successfully');
            toggleAlert();
            return;
        }

        const isEditing = notesStorage[cityName]?.includes(note);

        if (isEditing) {
            const findNoteIndex = notesStorage[cityName].indexOf(note);
            notesStorage[cityName][findNoteIndex] = notes;
            localStorage.setItem(cityName, JSON.stringify({ [cityName]: notesStorage[cityName] }));
            setAllNotesFromCity?.({ [cityName]: notesStorage[cityName] } as unknown as INotes);

            setMessage('Note saved successfully');
            toggleAlert();
            return;
        }
    }

    const removeNote = () => {
        const findNoteIndex = notesStorage[cityName].indexOf(notes);
        notesStorage[cityName].splice(findNoteIndex, 1);
        localStorage.setItem(cityName, JSON.stringify({ [cityName]: notesStorage[cityName] }));
        setAllNotesFromCity?.({ [cityName]: notesStorage[cityName] } as unknown as INotes);

        setMessage('Note deleted successfully');
        toggleAlert();
    }

    return (
        <div className="flex flex-1 items-center justify-center mb-4">
            <div className="w-full">
                <form className="mt-5 sm:flex sm:items-center">
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} id="q" name="notes" className="h-20 inline w-11/12 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="City Name" />
                    <IconButton onClick={removeNote}>
                        <Delete className='ml-3' color='error' />
                    </IconButton>
                    <IconButton onClick={saveNote}>
                        <Check className='ml-3' color='success' />
                    </IconButton>
                </form>
            </div>
        </div>
    )
}
