import React from 'react';
import Image from 'next/image'
import { useGetParams } from '../../utils/useGetParams';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface IWeatherData {
    current: {
        temp_c: number;
        feelslike_c: number;
        weather_descriptions: string[];
        weather_icons: string[];
        condition: {
            text: string
            icon: string
        }
        wind_kph: number
    }
    request: {
        query: string
    }
    location: {
        localtime: string;
        name: string;
        country: string;
    }
}

type Props = {
    cityName: string;
    weatherData: IWeatherData
}

export const DetailsCard = ({ weatherData }: Props) => {
    const currentCityImage = useGetParams('image') || '';

    const cityName = weatherData?.location?.country;

    const fetchRandomImages = async () => {
        const url = `https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH}&count=15&query=${cityName}&orientation=landscape`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const { isLoading, data } = useQuery({
        queryKey: ['fetchRandomImagesLocal', cityName],
        queryFn: () => fetchRandomImages(),
        enabled: Boolean((currentCityImage || '').length === 0)
    });

    return (
        <div className="mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
            <a href="#"
                className="max-w-3xl mx-auto text-xl sm:text-4xl font-semibold inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
                data-testid="city-name">
                {weatherData?.location?.name}, {weatherData?.location?.country}
            </a>
            <a href="#" data-testid="city-image">
                {
                    isLoading ? 'Fetching City Image...' :
                        <Image className='inline my-4 rounded-lg' width={300} height={300}
                            src={currentCityImage || data?.[0]?.urls?.small}
                            alt={weatherData?.location?.name}
                        />
                }
            </a>
            <p className="text-gray-700 text-base leading-8 max-w-2xl mx-auto" data-testid="weather-condition">
                Weather is {weatherData?.current?.condition?.text}{' '}
                <Image className='inline' width={30} height={30}
                    src={`https:${weatherData?.current?.condition?.icon}`}
                    alt="Weather Icon" />
            </p>
            <p className="text-gray-700 text-base leading-8 max-w-2xl mx-auto" data-testid="wind-speed">
                Wind Speed: {weatherData?.current.wind_kph} km/h
            </p>
            <div className="py-5 text-sm font-regular text-gray-900 flex items-center justify-center" data-testid="temperature">
                <span className="mr-3 flex flex-row items-center">
                    <svg className="text-indigo-600" fill="currentColor" height="13px" width="13px" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 512 512">
                        <g>
                            <g>
                                <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
              c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
              c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                            </g>
                        </g>
                    </svg>
                    <span className="ml-1" data-testid="local-time">
                        {weatherData?.location.localtime.split(' ')[1]}
                    </span>
                </span>
                <a href="#" className="flex flex-row items-center hover:text-indigo-600 mr-3">
                    <span className="ml-1">Temperature is {weatherData?.current.temp_c} °C, feels like {weatherData?.current.feelslike_c} °C</span>
                </a>
            </div>
            <hr />
        </div>
    )
}
