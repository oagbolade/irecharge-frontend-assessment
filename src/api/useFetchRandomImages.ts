import axios from 'axios';

export const fetchRandomImages = async () => {
    const url = `https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH}&count=15&query=city&orientation=landscape`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
