import { combineReducers } from "redux";


import user from "./user";
import feed from "./feed";
import article from "./article";
import category from "./category";
import categories from "./categories";
import profile from "./profile";
import sidebar from "./sidebar";
import recommendation from "./recommendation";
import channelRecommendation from "./channelRecommendation";
import searchResult from "./searchResult";
import trending from "./trending";
import likedArticle from "./likedArticle";
import history from "./history";

export default combineReducers({
  user,
  feed,
  article,
  categories,
  category,
  profile,
  sidebar,
  recommendation,
  channelRecommendation,
  searchResult,
  trending,
  likedArticle,
  history,
});
