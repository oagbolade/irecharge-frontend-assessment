import React, { useEffect, useState } from 'react'

export const useGetUserCurrentCity = () => {
    const [userCurrentCity, setUserCurrentCity] = React.useState<string>('');

    const getUserCurrentCity = () => {
        fetch('https://extreme-ip-lookup.com/json/?key=demo2')
            .then(res => res.json())
            .then(response => {
                setUserCurrentCity(response.region);
            })
            .catch((err) => {
                console.log('Request failed:', err);
            });
    }

    useEffect(() => {
        getUserCurrentCity();
    }, [])

    return { userCurrentCity };
}
