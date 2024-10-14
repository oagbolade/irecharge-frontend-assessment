import axios from 'axios';

export const searchWeather = async () => {
    const url = `https://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_WEATHER_ACCESS_KEY}&query=Lagos`;

    try {
        const response = await axios.get(url);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
