import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils/index";

export const getLikedArticles = createAsyncThunk(
  "likedArticle/getLikedArticles",
  async () => {
    const { data } = await client(
      `${process.env.REACT_APP_BE}/users/likedArticles`
    );
    return data;
  }
);

const likedArticleSlice = createSlice({
  name: "likedArticle",
  initialState: {
    isFetching: true,
    articles: [],
  },
  extraReducers: {
    [getLikedArticles.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.articles = action.payload;
    },
  },
});

export const {
  addToLikedArticles,
  removeFromLikedArticles,
} = likedArticleSlice.actions;

export default likedArticleSlice.reducer;
