import axios from 'axios';

export const searchWeather = async () => {
    const url = 'https://api.weatherstack.com/current?access_key=2ed8652859169f82c0bd9f003186d744&query=Lagos';

    try {
        const response = await axios.get(url);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
