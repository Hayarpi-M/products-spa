import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '../types';
import { nanoid } from 'nanoid';


interface ProductsState {
    items: TProduct[];
}

const initialState: ProductsState = {
    items: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<TProduct[]>) {
            state.items = action.payload;
        },
        addProduct(state, action: PayloadAction<Omit<TProduct, 'id' | 'liked' | 'createdAt'>>) {
            const payload = action.payload;
            const newProduct: TProduct = {
                id: nanoid(),
                liked: false,
                createdAt: new Date().toISOString(),
                ...payload,
            };
            state.items.unshift(newProduct);
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.items = state.items.filter((p) => p.id !== action.payload);
        },
        toggleLike(state, action: PayloadAction<string>) {
            const p = state.items.find((it) => it.id === action.payload);
            if (p) p.liked = !p.liked;
        },
    },
});

export const { setProducts, addProduct, removeProduct, toggleLike } = productsSlice.actions;
export default productsSlice.reducer;