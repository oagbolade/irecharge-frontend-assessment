import React, { useEffect, useState } from 'react'

export const useGetLocationPermission = () => {
    const [location, setLocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    setError(null);
                },
                (err) => {
                    setError('Oops!. User denied location permission or another error occurred');
                    setLocation(null);
                }
            );
        } else {
            setError('Oops!. Geolocation is not supported by your browser');
        }
    };

    useEffect(() => {
        getLocation();
    }, [location]);

    return { location, error };
}
