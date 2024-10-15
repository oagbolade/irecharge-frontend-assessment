import axios from 'axios';

export const searchWeather = async (city: string) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_ACCESS_KEY}&q=${city}&aqi=no`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
