import { configureStore, createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        selectedCategory: '',
        products: [],
        searchQuery: '',
        allCategories: [],
        skip:0,
        limit:10
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setAllCategories: (state, action) => {
            state.allCategories = action.payload;
        },
        setSkip: (state, action) => {
            state.skip = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
    },
});

export const {
    setSelectedCategory,
    setProducts,
    setSearchQuery,
    setAllCategories,
    setSkip,
    setLimit
} = dataSlice.actions;

const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
    },
});

export default store;
