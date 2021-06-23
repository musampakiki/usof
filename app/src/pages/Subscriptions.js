import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Suggestions from "../components/Suggestions";
import ArticleCard from "../components/ArticleCard";
import { StyledHome } from "./Home";
import ArticleGrid from "../styles/ArticleGrid";
import Skeleton from "../skeletons/HomeSkeleton";
import { getFeed } from "../reducers/feed";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { isFetching, articles } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (isFetching) {
    return <Skeleton />;
  }

  if (!isFetching && !articles.length) {
    return <Suggestions />;
  }

  return (
    <StyledHome>
      <div style={{ marginTop: "1.5rem" }}></div>

      <ArticleGrid>
        {!isFetching &&
          articles.map((article) => (
            <Link key={article.id} to={`/watch/${article.id}`}>
              <ArticleCard hideavatar={true} article={article} />
            </Link>
          ))}
      </ArticleGrid>
    </StyledHome>
  );
};

export default Subscriptions;
