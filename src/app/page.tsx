'use client';
import React, { useEffect, useState } from "react";
import { fetchLargestCities } from "@/api/useFetchLargestCities";
import { Card } from "../Components/Card";
import {
  useQuery,
} from '@tanstack/react-query'
import { fetchRandomImages } from "@/api/useFetchRandomImages";
import { SearchBar } from "@/Components/SearchBar";
import { formatPopulation } from "../../utils/formatPopulation";
import { getStoredCities, getStoredCityPictures, LARGEST_CITIES_IMAGES_KEY, LARGEST_CITIES_KEY } from "../../utils/offline-storage";
import { useGetUserCurrentCity } from "../../utils/hooks/useGetUserCurrentCity";
import { useGetLocationPermission } from "../../utils/hooks/useGetLocationPermission";
import { LocalWeatherCard } from "@/Components/LocalWeatherCard";

export interface ICity {
  name: string;
  population: number;
  country: string;
  geonameId: number;
}

export default function Home() {
  const [largesCitiesData, setLargestCitiesData] = React.useState<any | ICity>(getStoredCities() || []);
  const [cityPictures, setCityPictures] = React.useState<any | ICity>(getStoredCityPictures() || []);
  const { userCurrentCity } = useGetUserCurrentCity();
  const { location } = useGetLocationPermission();
  const { isLoading, data } = useQuery({ queryKey: ['fetchLargestCities'], queryFn: fetchLargestCities, enabled: Boolean(getStoredCities()) === false });
  const { isLoading: arePicturesLoading, data: picturesData } = useQuery({ queryKey: ['fetchRandomImages'], queryFn: fetchRandomImages, enabled: Boolean(getStoredCityPictures()) === false })

  // console.log(userCurrentCity)
  console.log(location)

  React.useEffect(() => {
    if (Boolean(getStoredCities()) === false) {
      const sortedCities = data?.geonames?.sort((a: ICity, b: ICity) => a.name.localeCompare(b.name));
      localStorage.setItem(LARGEST_CITIES_KEY, JSON.stringify(sortedCities));
      // localStorage.setItem(LARGEST_CITIES_IMAGES_KEY, JSON.stringify(picturesData));
      console.log('sortedCities', sortedCities)
      setLargestCitiesData(sortedCities);      // setCityPictures(picturesData);
    }
  }, [data, isLoading, arePicturesLoading]);

  React.useEffect(() => {
    if (Boolean(getStoredCityPictures()) === false) {
      // localStorage.setItem(LARGEST_CITIES_KEY, JSON.stringify(data?.geonames));
      localStorage.setItem(LARGEST_CITIES_IMAGES_KEY, JSON.stringify(picturesData));
      // setLargestCitiesData(data?.geonames);
      setCityPictures(picturesData);
    }
  }, [data, isLoading, arePicturesLoading]);

  if (Boolean(getStoredCities()) === false && (isLoading || arePicturesLoading)) {
    return 'Fetching cities...'
  }

  return (
    <div>
      {/* <div>
        <h1>Get Current Location</h1>
        <button onClick={getLocation}>Get Location</button>
        {location && <p>Your Location: {location}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div> */}
      <SearchBar />
      {/* <LocalWeatherCard /> */}
      <div className="columns-3 mx-auto py-20">
        {(largesCitiesData || [])?.map((city: ICity, index: number) => (
          <Card setLargestCitiesData={setLargestCitiesData} largesCitiesData={largesCitiesData} key={city.geonameId} geonameId={city.geonameId} cityName={city.name} population={formatPopulation(String(city.population))} image={cityPictures && cityPictures[index]?.urls?.small || []} detailsImage={cityPictures && cityPictures[index]?.urls?.raw || []} />
        ))}
      </div>
    </div>
  );
}
