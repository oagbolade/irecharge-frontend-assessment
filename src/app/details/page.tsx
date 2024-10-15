'use client';
import { searchWeather } from "@/api/useSearchWeather";
import { DetailsCard } from "@/Components/DetailsCard";
import { Notes } from "@/Components/Notes";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useGetParams } from "../../../utils/useGetParams";

export default function DetailsPage() {
  const cityName = useGetParams('city') || '';

  const { isLoading: isWeatherLoading, data: weatherData } = useQuery({
    queryKey: ['searchWeather', cityName],
    queryFn: () => searchWeather(cityName),
    enabled: Boolean((cityName || '').length > 0),
  });

  if (isWeatherLoading) {
    return 'Cities fetched. Fetching city temeratures...'
  }

  return (
    <div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16">
      <DetailsCard cityName={cityName} weatherData={weatherData} />
      <div className="container columns-2">
        <h2 className="font-bold text-xl">Notes</h2>
        <Button title="Add Note" />
      </div>
      <Notes />
      <Notes />
      <Notes />
      <Notes />
    </div>
  );
}
