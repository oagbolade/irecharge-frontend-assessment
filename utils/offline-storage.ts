import { ICity } from "@/features/HomePage";

export const LARGEST_CITIES_KEY = 'stored-cities';
export const LARGEST_CITIES_IMAGES_KEY = 'stored-city-images';

export interface INotes {
    [key: string]: string[];
}

export function getStoredCities(): ICity[] | null {
    if (typeof window !== 'undefined') {
        const storedCities = localStorage.getItem(LARGEST_CITIES_KEY);
        return storedCities !== 'undefined' ? JSON.parse(storedCities as string) : null;
    }

    return null;
}

export function getStoredCityPictures(): ICity | null {
    if (typeof window !== 'undefined') {
        const storedPictures = localStorage.getItem(LARGEST_CITIES_IMAGES_KEY);
        return storedPictures !== 'undefined' ? JSON.parse(storedPictures as string) : null;
    }

    return null;
}

export function getStoredNotes(key: string): INotes | null {
    if (typeof window !== 'undefined') {
        const storedNotes = localStorage.getItem(key);
        return storedNotes !== 'undefined' ? JSON.parse(storedNotes as string) : null;
    }

    return null;
}