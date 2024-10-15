import React, { useState, Dispatch, SetStateAction } from 'react';
import Image from "next/image";
import {
    Favorite
} from '@mui/icons-material';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { searchWeather } from '@/api/useSearchWeather';
import { IconButton } from '@mui/material';
import { Button } from './Button';
import { localStorage } from 'reactive-localstorage';
import { LARGEST_CITIES_KEY } from '../../utils/offline-storage';
import { ICity } from '@/app/page';
import { DeleteButton } from './DeleteButton';

type Props = {
    isFavorite?: boolean;
    geonameId: number;
    cityName: string;
    image: string;
    detailsImage: string;
    population: string;
    largesCitiesData?: ICity[];
    setLargestCitiesData?: Dispatch<SetStateAction<ICity[] | undefined>>;
}

export const Card = ({ cityName, image, detailsImage, population, geonameId, setLargestCitiesData, largesCitiesData, isFavorite }: Props) => {
    const favoritesStorage = JSON.parse(localStorage.getItem('favorites') as string);
    const [favorites, setFavorites] = useState(favoritesStorage || []);

    const { isLoading: isWeatherLoading, data: weatherData } = useQuery({
        queryKey: ['searchWeather', cityName],
        queryFn: () => searchWeather(cityName),
        enabled: Boolean(cityName),
    });

    localStorage.on('change', (key, value) => {
        console.log(`key ${key} changed to value ${value}`);

        if (key === 'favorites') {
            setFavorites(value);
        }
    });

    const handleFavorite = () => {
        if (favorites?.includes(geonameId)) {
            const updatedFavorites = favoritesStorage?.filter((id: number) => id !== geonameId);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } else {
            const updatedFavorites = favoritesStorage === null ? [geonameId] : [...favoritesStorage, geonameId];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        }
    };

    const handleDelete = () => {
        const filteredCities = largesCitiesData?.filter((city: ICity) => city.geonameId !== geonameId);
        localStorage.setItem(LARGEST_CITIES_KEY, JSON.stringify(filteredCities));
        setLargestCitiesData?.(filteredCities);
    };

    return (
        <article className={`relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full mx-auto mb-2 ${isFavorite ? 'hover:scale-100' : 'hover:scale-105'} hover:scale-105`}>
            <div className='mx-6 absolute top-6 right-12 z-10'>
                <Link href={`/details?city=${cityName}&image=${detailsImage}`}>
                    <Button title="View City" />
                </Link>
            </div>
            <div className='absolute top-6 right-4 z-10'>
                <IconButton onClick={handleFavorite} aria-label="favorite">
                    <Favorite sx={{ color: `${favorites?.includes(geonameId) ? 'red' : 'white'}` }} />
                </IconButton>
            </div>
            <Image
                width={300}
                height={300}
                src={image}
                alt={cityName}
                className="absolute inset-0 h-full w-full object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40"></div>
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">{cityName}</h3>
            <div className="z-10 gap-y-1 font-bold overflow-hidden text-md leading-6 text-white">{population}</div>
            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-white">
                {isWeatherLoading ? 'Fetching temperatures...' : `${weatherData?.current?.temp_c || 'N/A'}°C`}
            </div>
            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-white">
                {isWeatherLoading ? 'Fetching city current time...' : weatherData?.location?.localtime.split(' ')[1]}
            </div>
            {!isFavorite &&
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-white absolute right-4">
                    <IconButton onClick={handleDelete} aria-label="delete">
                        <DeleteButton title="Trash" isDelete />
                    </IconButton>
                </div>
            }
        </article>
    );
};
