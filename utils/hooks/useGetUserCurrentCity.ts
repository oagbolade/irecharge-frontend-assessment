import React, { useEffect, useState } from 'react'

export const useGetUserCurrentCity = () => {
    const [userCurrentCity, setUserCurrentCity] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const getUserCurrentCity = () => {
        setIsLoading(true);
        fetch('https://extreme-ip-lookup.com/json/?key=demo2')
            .then(res => res.json())
            .then(response => {
                setUserCurrentCity(response.region);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('Request failed:', err);
            });
    }

    useEffect(() => {
        getUserCurrentCity();
    }, [])

    return { userCurrentCity, isLoading };
}
