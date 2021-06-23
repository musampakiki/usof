import React from "react";
import LikedArticles from "./LikedArticles";
import History from "./History";

const Library = () => (
  <>
    <History nopad={true} />
    <LikedArticles />
  </>
);

export default Library;
