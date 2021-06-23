import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getRecommendation = createAsyncThunk(
  "recommendation/getRecommendation",
  async () => {
    const { data } = await client(`${process.env.REACT_APP_BE}/articles`);
    return data;
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    isFetching: true,
    articles: [],
  },
  reducers: {
    addToRecommendation(state, action) {
      state.articles = [action.payload, ...state.articles];
    },
  },
  extraReducers: {
    [getRecommendation.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.articles = action.payload;
    },
  },
});

export const { addToRecommendation } = recommendationSlice.actions;

export default recommendationSlice.reducer;
