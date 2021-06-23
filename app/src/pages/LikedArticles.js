import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TrendingCard from "../components/TrendingCard";
import { StyledTrending } from "./Trending";
import Skeleton from "../skeletons/TrendingSkeleton";
import { getLikedArticles } from "../reducers/likedArticle";

const LikedArticles = () => {
  const dispatch = useDispatch();
  const { isFetching, articles } = useSelector((state) => state.likedArticle);

  useEffect(() => {
    dispatch(getLikedArticles());
  }, [dispatch]);

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <StyledTrending>
      <h2>Liked Articles</h2>

      {articles?.length === 0 && (
        <p className="secondary">
          Articles that you have liked will show up here
        </p>
      )}

      {articles.map((article) => (
        <Link key={article.id} to={`/watch/${article.id}`}>
          <TrendingCard article={article} />
        </Link>
      ))}
    </StyledTrending>
  );
};

export default LikedArticles;
