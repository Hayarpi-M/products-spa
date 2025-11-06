import axios from 'axios';
import { TProduct } from '../types';


export const fetchInitialProducts = async (): Promise<TProduct[]> => {
    try {
        const res = await axios.get('https://fakestoreapi.com/products');
        return (res.data as any[]).map((d) => ({
            id: String(d.id),
            title: d.title,
            description: d.description,
            image: d.image,
            price: d.price,
            liked: false,
            createdAt: new Date().toISOString(),
        }));
    } catch (err) {
        // fallback mock
        return [
            {
                id: 'mock-1',
                title: 'Mock product',
                description: 'Fallback product because API failed.',
                image: '',
                price: 9.99,
                liked: false,
                createdAt: new Date().toISOString(),
            },
        ];
    }
};