/* eslint-disable react-hooks/rules-of-hooks */
import { searchWeather } from '../api/useSearchWeather';
import { Cloud } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react'
import { FormSkeleton } from './FormSkeleton';
import { Box } from '@mui/material';

type Props = {
    userCurrentCity: string;
    isCurrentCityLoading: boolean;
    location: string | null;
    error: string | null;
}

export const LocalWeatherCard = ({ userCurrentCity, isCurrentCityLoading, location, error }: Props) => {
    if (isCurrentCityLoading) {
        return (
            <Box m={16}>
                <FormSkeleton noOfLoaders={5} />
            </Box>
        );
    }

    const { isLoading: isWeatherLoading, data: weatherData } = useQuery({
        queryKey: ['searchWeather', userCurrentCity],
        queryFn: () => searchWeather(userCurrentCity),
        enabled: Boolean((userCurrentCity || '').length > 0),
    });

    if (isWeatherLoading) {
        return (
            <Box m={16}>
                <FormSkeleton noOfLoaders={5} />
            </Box>
        );
    }

    return (
        <section className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 p-4">
            <div className="h-full">
                <div className="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg">
                    <div className="px-6 py-5">
                        <div className="flex items-start">
                            <svg className="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                                <path className="text-indigo-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                                <path className="text-indigo-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                                <path className="text-indigo-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                            </svg>
                            <div className="flex-grow truncate">
                                <div className="w-full sm:flex justify-between items-center mb-3">
                                    <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">Local Weather</h2>
                                </div>
                                {error && <p className="text-red-300 font-bold">{error}</p>}
                                {!location && <p className="text-red-300 font-bold">Cannot get location information</p>}
                                {(!error && location) && <div className="flex items-end justify-between whitespace-normal">
                                    <div className="max-w-md text-indigo-100">
                                        <p className="mb-0 font-bold">{userCurrentCity}</p>
                                        {weatherData && <p className="mb-0 font-bold">{weatherData?.current?.condition?.text}{' '}
                                            <Image className='inline' width={30} height={30}
                                                src={`https:${weatherData?.current?.condition?.icon}`}
                                                alt="Sunset in the mountains" />
                                        </p>}
                                        <p className="mb-0 font-bold">{isWeatherLoading ? 'Fetching temperatures...' : `${weatherData?.current?.temp_c || 'N/A'}°C`}</p>
                                        <p className="mb-0 font-bold">{isWeatherLoading ? 'Fetching city current time...' : weatherData?.location?.localtime.split(' ')[1]}</p>
                                        <p className="mb-0 font-bold">Feels like {isWeatherLoading ? 'N/A' : `${weatherData?.current?.feelslike_c || 'N/A'}°C`} here 😱</p>
                                    </div>
                                    <a className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#">
                                        <span className="block font-bold"><span className="sr-only">Read more</span> <Cloud /></span>
                                    </a>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
