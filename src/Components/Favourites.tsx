import React, { useState } from 'react';
import { Favorite } from '@mui/icons-material';
import { localStorage } from 'reactive-localstorage';
import { Card } from './Card';
import { formatPopulation } from '../../utils/formatPopulation';
import { getStoredCities, getStoredCityPictures } from '../../utils/offline-storage';
import { ICity } from '@/features/HomePage';

export const Favourites = () => {
    const [largesCitiesData, setLargestCitiesData] = React.useState<any | ICity>(getStoredCities() || []);
    const favoritesStorage = JSON.parse(localStorage.getItem('favorites') as string);
    const [favorites, setFavorites] = useState(favoritesStorage || []);
    const [cityPictures, setCityPictures] = React.useState<any | ICity>(getStoredCityPictures() || []);
    const [openFavorite, setOpenFavorite] = useState<boolean>(false);

    localStorage.on('change', (key, value) => {
        if (key === 'favorites') {
            setFavorites(value);
        }
    });

    const handleOpenFavorite = () => {
        setOpenFavorite(!openFavorite)
    };

    console.log(openFavorite)
    return (
        <section className="py-2">
            <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                <div
                    className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
                    <button onClick={handleOpenFavorite} type="button" id="question1" data-state="closed" className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                        <span className="flex text-lg font-semibold text-black">Favorites <Favorite className='ml-2 mt-1' sx={{ color: 'red' }} /></span>
                        <svg id="arrow1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="w-6 h-6 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    {favorites?.length === 0 ? <p className="text-center text-gray-600 pb-2">No favorites yet</p> : null}
                    {openFavorite && <div>
                        <div className="grid grid-cols-2 gap-4 px-4 pb-5 sm:px-6 sm:pb-6">
                            {largesCitiesData?.length > 0 && largesCitiesData.filter((city: ICity) => favorites?.includes(city.geonameId)).map((city: ICity, index: number) => (
                                <Card isFavorite key={city.geonameId} geonameId={city.geonameId} cityName={city.name} population={formatPopulation(String(city.population))} image={cityPictures && cityPictures[index]?.urls?.small || []} detailsImage={cityPictures && cityPictures[index]?.urls?.raw || []} />
                            ))}
                        </div>
                    </div>}
                </div>
            </div>
        </section>
    );
};
