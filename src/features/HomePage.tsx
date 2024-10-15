'use client';
import React from "react";
import dynamic from "next/dynamic";
import { fetchLargestCities } from "@/api/useFetchLargestCities";
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
import { Box } from "@mui/material";
import { FormSkeleton } from "@/Components/FormSkeleton";

const Card = dynamic(() => import("@/Components/Card").then((mod) => mod.Card), {
    ssr: false,
});

const Favourites = dynamic(() => import("@/Components/Favourites").then((mod) => mod.Favourites), {
    ssr: false,
});

export interface ICity {
    name: string;
    population: number;
    country: string;
    geonameId: number;
}

export default function HomePage() {
    const [largesCitiesData, setLargestCitiesData] = React.useState<any | ICity>(getStoredCities() || []);
    const [cityPictures, setCityPictures] = React.useState<any | ICity>(getStoredCityPictures() || []);
    const { isLoading: isCurrentCityLoading, userCurrentCity } = useGetUserCurrentCity();
    const { location, error } = useGetLocationPermission();
    const { isLoading, data } = useQuery({ queryKey: ['fetchLargestCities'], queryFn: fetchLargestCities, enabled: Boolean(getStoredCities()) === false });
    const { isLoading: arePicturesLoading, data: picturesData } = useQuery({ queryKey: ['fetchRandomImages'], queryFn: fetchRandomImages, enabled: Boolean(getStoredCityPictures()) === false })

    React.useEffect(() => {
        if (Boolean(getStoredCities()) === false) {
            const sortedCities = data?.geonames?.sort((a: ICity, b: ICity) => a.name.localeCompare(b.name));
            localStorage.setItem(LARGEST_CITIES_KEY, JSON.stringify(sortedCities));
            setLargestCitiesData(sortedCities);
        }
    }, [data, isLoading, arePicturesLoading]);

    React.useEffect(() => {
        if (Boolean(getStoredCityPictures()) === false) {
            localStorage.setItem(LARGEST_CITIES_IMAGES_KEY, JSON.stringify(picturesData));
            setCityPictures(picturesData);
        }
    }, [data, isLoading, arePicturesLoading]);

    if (Boolean(getStoredCities()) === false && (isLoading || arePicturesLoading)) {
        return (
            <Box m={16}>
                <FormSkeleton noOfLoaders={5} />
            </Box>
        );
    }

    return (
        <div>
            <SearchBar />
            <LocalWeatherCard userCurrentCity={userCurrentCity} isCurrentCityLoading={isCurrentCityLoading} location={location} error={error} />
            <Favourites />
            <div className="container mx-auto grid grid-cols-3 gap-10 py-20 w-full">
                {(largesCitiesData || [])?.map((city: ICity, index: number) => (
                    <Card setLargestCitiesData={setLargestCitiesData} largesCitiesData={largesCitiesData} key={city.geonameId} geonameId={city.geonameId} cityName={city.name} population={formatPopulation(String(city.population))} image={cityPictures && cityPictures[index]?.urls?.small || []} detailsImage={cityPictures && cityPictures[index]?.urls?.raw || []} />
                ))}
            </div>
        </div>
    );
}
