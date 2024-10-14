import React from 'react'
import Image from "next/image";
import { Favorite, Delete } from '@mui/icons-material';

type Props = {
    cityName: string;
    temperature: string;
    image: string;
    time: string;
}

export const Card = ({ cityName, temperature, image, time }: Props) => {
    return (
        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mb-10 hover:scale-105">
            <Favorite className="absolute top-4 right-4 z-10" color="error" />
            <Delete className="absolute bottom-8 right-4 z-10" color="primary" />
            <Image
                width={300}
                height={300}
                src={image}
                alt={cityName}
                className="absolute inset-0 h-full w-full object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">{cityName}</h3>
            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-white">{temperature}</div>
            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-white">{time}</div>
        </article>
    )
}
