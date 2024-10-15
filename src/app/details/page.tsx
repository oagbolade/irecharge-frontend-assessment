'use client';
import { useContext, useState } from "react";
import { searchWeather } from "@/api/useSearchWeather";
import { DetailsCard } from "@/Components/DetailsCard";
import { Notes } from "@/Components/Notes";
import { Alert, Box, Button, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useGetParams } from "../../../utils/useGetParams";
import { getStoredNotes, INotes } from "../../../utils/offline-storage";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { FormSkeleton } from "@/Components/FormSkeleton";
import { AlertContext } from "../../../context/AlertContext";

export default function DetailsPage() {
  const { open, message, severity } = useContext(AlertContext);
  const cityName = useGetParams('city') || '';
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
    <div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16">
      {open &&
        <Alert severity={severity}>{message}</Alert>
      }
      <DetailsCard cityName={cityName} weatherData={weatherData} />
      <div className="container columns-2">
        <h2 className="font-bold text-xl">Notes</h2>
        <Button title="Add Note" />
      </div>
      {(allNotesFromCity[cityName]?.length === 0 || !allNotesFromCity[cityName]) && <p className="text-center text-md">No notes available for this city, please create a note</p>}
      {allNotesFromCity[cityName] &&
        allNotesFromCity[cityName]?.map((note, index) => <Notes key={index} note={note} noteId={index} setAllNotesFromCity={setAllNotesFromCity} />)
      }
      {[...Array(moreNotes)].map((note, index) => (
        <Notes isNewNote key={index} note={note} noteId={index} />
      ))}
      <div className="w-11/12 grid justify-items-end">
        <IconButton onClick={addMoreNotes}>
          <span className="text-sm">Add Note{' '}</span> <AddCircleOutlinedIcon sx={{ color: '#4F45E4', fontSize: 40 }} className='mr-3 font-bold' />
        </IconButton>
      </div>
    </div>
  );
}
