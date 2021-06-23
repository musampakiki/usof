import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TrendingCard from "../components/TrendingCard";
import { StyledTrending } from "./Trending";
import Skeleton from "../skeletons/TrendingSkeleton";
import { getHistory } from "../reducers/history";

const History = ({ nopad }) => {
  const dispatch = useDispatch();
  const { isFetching, articles } = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <StyledTrending nopad={nopad}>
      <h2>History</h2>

      {!isFetching && !articles.length && (
        <p className="secondary">
          articles that you have watched will show up here
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

export default History;
