import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async () => {
        const { data } = await client(`${process.env.REACT_APP_BE}/categories`);
        return data;
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        isFetching: true,
        categories: [],
    },
    reducers: {
        addToCategories(state, action) {
            state.categories = [action.payload, ...state.categories];
        },
    },
    extraReducers: {
        [getCategories.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.categories = action.payload;
        },
    },
});

export const { addToCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
