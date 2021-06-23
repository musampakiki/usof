import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/index";

export const getArticle = createAsyncThunk(
    "article/getArticle",
    async (articleId) => {
  const { data: article } = await client(
    `${process.env.REACT_APP_BE}/articles/${articleId}`
);
return article;
});

const articleSlice = createSlice({
  name: "slice",
  initialState: {
    isFetching: true,
    data: {},
  },
  reducers: {
    addArticle(state, action) {
      state.data = {
        ...state.data,
        /*articles: [action.payload, ...state.data.articles],*/
        ...action.payload,
      };
    },
    /*updateArticle(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },*/

    clearArticle(state, action) {
      state.isFetching = true;
      state.data = {};
    },
    addComment(state, action) {
      state.data = {
        ...state.data,
        comments: [action.payload, ...state.data.comments],
      };
    },
    like(state, action) {
      state.data = {
        ...state.data,
        isLiked: !state.data.isLiked,
        likesCount: state.data.likesCount + 1,
      };
    },
    dislike(state, action) {
      state.data = {
        ...state.data,
        isDisliked: !state.data.isDisliked,
        dislikesCount: state.data.dislikesCount + 1,
      };
    },
    cancelLike(state, action) {
      state.data = {
        ...state.data,
        isLiked: !state.data.isLiked,
        likesCount: state.data.likesCount - 1,
      };
    },
    cancelDislike(state, action) {
      state.data = {
        ...state.data,
        isDisliked: !state.data.isDisliked,
        dislikesCount: state.data.dislikesCount - 1,
      };
    },
    subscribeFromArticle(state, action) {
      state.data = {
        ...state.data,
        isSubscribed: !state.data.isSubscribed,
      };
    },
    unsubscribeFromArticle(state, action) {
      state.data = {
        ...state.data,
        isSubscribed: !state.data.isSubscribed,
      };
    },
  },
  extraReducers: {
    [getArticle.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
  },
});

export const {
  addArticle,
  /*updateArticle,*/
  clearArticle,
  addComment,
  like,
  dislike,
  cancelLike,
  cancelDislike,
  subscribeFromArticle,
  unsubscribeFromArticle,
} = articleSlice.actions;

export default articleSlice.reducer;
