import axios from 'axios';

export const fetchLargestCities = async () => {
    const url = `http://api.geonames.org/citiesJSON?north=90&south=-90&east=180&west=-180&maxRows=15&lang=en&username=${process.env.NEXT_PUBLIC_GEO_NAME_USER}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
