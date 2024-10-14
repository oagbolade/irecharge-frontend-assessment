'use client';
import { fetchLargestCities } from "@/api/useFetchLargestCities";
import { Card } from "../Components/Card";
import {
  useQuery,
} from '@tanstack/react-query'
import { Favorite, Delete } from '@mui/icons-material';
import { searchWeather } from "@/api/useSearchWeather";
import { fetchRandomImages } from "@/api/useFetchRandomImages";
import Image from "next/image";
import { SearchBar } from "@/Components/SearchBar";

export default function Home() {
  const { isLoading, error, data } = useQuery({ queryKey: ['fetchLargestCities'], queryFn: fetchLargestCities })
  const { isLoading: isWeatherLoading, data: weatherData } = useQuery({ queryKey: ['searchWeather'], queryFn: searchWeather })
  // const { isLoading: arePicturesLoading, data: picturesData } = useQuery({ queryKey: ['fetchRandomImages'], queryFn: fetchRandomImages })
  // console.log(data);
  console.log('weatherData', weatherData);
  // console.log('picturesData', picturesData);
  console.log('process.env.NEXT_GEO_NAME_USER', process.env.NEXT_PUBLIC_GEO_NAME_USER);

  if (isLoading) {
    return 'Fetching cities...'
  }

  if (isWeatherLoading) {
    return 'Cities fetched. Fetching city temeratures...'
  }

  return (
    <div>
      <SearchBar />
      <div className="container mx-auto columns-3 py-20">
        <Card cityName="London" temperature="London" image='https://images.unsplash.com/photo-1499856871958-5b9627545d1a' time='7:00am' />
        <Card cityName="London" temperature="London" image='https://images.unsplash.com/photo-1499856871958-5b9627545d1a' time='7:00am' />
        <Card cityName="London" temperature="London" image='https://images.unsplash.com/photo-1499856871958-5b9627545d1a' time='7:00am' />
        <Card cityName="London" temperature="London" image='https://images.unsplash.com/photo-1499856871958-5b9627545d1a' time='7:00am' />
        <Card cityName="London" temperature="London" image='https://images.unsplash.com/photo-1499856871958-5b9627545d1a' time='7:00am' />
        <Card cityName="London" temperature="London" image='https://images.unsplash.com/photo-1499856871958-5b9627545d1a' time='7:00am' />
        <Card cityName="London" temperature="London" image='https://images.unsplash.com/photo-1499856871958-5b9627545d1a' time='7:00am' />
      </div>
    </div>
  );
}
