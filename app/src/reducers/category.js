import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/index";

export const getCategory = createAsyncThunk(
    "category/getCategory",
    async (categoryId) => {
        const { data: category } = await client(
            `${process.env.REACT_APP_BE}/categories/${categoryId}`
        );
        return category;
    });

const categorySlice = createSlice({
    name: "slice",
    initialState: {
        isFetching: true,
        data: {},
    },
    reducers: {
        addCategory(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },

        clearCategory(state, action) {
            state.isFetching = true;
            state.data = {};
        },

    },
    extraReducers: {
        [getCategory.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.data = action.payload;
        },
    },
});

export const {
    addCategory,
    clearCategory,


} = categorySlice.actions;

export default categorySlice.reducer;
