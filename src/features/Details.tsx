'use client';
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { searchWeather } from "../api/useSearchWeather";
import { Alert, AlertColor, Box, Button, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getStoredNotes, INotes } from "../../utils/offline-storage";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { FormSkeleton } from "../Components/FormSkeleton";
import { AlertContext } from "../../context/AlertContext";

const DetailsCard = dynamic(() => import("@/Components/DetailsCard").then((mod) => mod.DetailsCard), {
    ssr: false,
});

const Notes = dynamic(() => import("@/Components/Notes").then((mod) => mod.Notes), {
    ssr: false,
});

export default function Details() {
    const { open, message, severity } = useContext(AlertContext);
    let cityName = '';

    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        cityName = searchParams.get('city') || '';
    }

    const storedNotes = getStoredNotes(cityName);
    const [moreNotes, setMoreNotes] = useState<number>(0);
    const [allNotesFromCity, setAllNotesFromCity] = useState<INotes>(storedNotes || {});

    const { isLoading: isWeatherLoading, data: weatherData } = useQuery({
        queryKey: ['searchWeather', cityName],
        queryFn: () => searchWeather(cityName),
        enabled: Boolean((cityName || '').length > 0),
    });

    if (isWeatherLoading) {
        return (
            <Box m={16}>
                <FormSkeleton noOfLoaders={5} />
            </Box>
        );
    }

    const addMoreNotes = () => {
        setMoreNotes(moreNotes + 1);
    };

    return (
        <div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16" data-testid="details-card">
            {open &&
                <Alert severity={severity as AlertColor}>{message}</Alert>
            }
            <DetailsCard cityName={cityName} weatherData={weatherData} />
            <div className="container columns-2">
                <h2 className="font-bold text-xl">Notes</h2>
            </div>
            {(allNotesFromCity[cityName]?.length === 0 || !allNotesFromCity[cityName]) && <p className="text-center text-md">No notes available for this city, please create a note</p>}
            {allNotesFromCity[cityName] &&
                allNotesFromCity[cityName]?.map((note, index) => <Notes key={index} note={note} noteId={index} setAllNotesFromCity={setAllNotesFromCity} />)
            }
            <div data-testid="notes-card">
                {[...Array(moreNotes)].map((note, index) => (
                    <Notes isNewNote key={index} note={note} noteId={index} />
                ))}
            </div>
            <div className="w-11/12 grid justify-items-end">
                <IconButton onClick={addMoreNotes}>
                    <span className="text-sm">Add Note{' '}</span> <AddCircleOutlinedIcon sx={{ color: '#4F45E4', fontSize: 40 }} className='mr-3 font-bold' />
                </IconButton>
            </div>
        </div>
    );
}
