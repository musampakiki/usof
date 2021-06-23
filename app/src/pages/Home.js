import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Skeleton from "../skeletons/HomeSkeleton";
import ArticleGrid from "../styles/ArticleGrid";
import { getRecommendation } from "../reducers/recommendation";

export const StyledHome = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 7rem;

  h2 {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1093px) {
    width: 95%;
  }

  @media screen and (max-width: 1090px) {
    width: 99%;
  }

  @media screen and (max-width: 870px) {
    width: 90%;
  }

  @media screen and (max-width: 670px) {
    width: 99%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { isFetching, articles } = useSelector((state) => state.recommendation);

  useEffect(() => {
    dispatch(getRecommendation());
  }, [dispatch]);

  if (isFetching) {
    return <Skeleton title={true} />;
  }

  return (
    <StyledHome>
      <h2>Recommended</h2>

      <ArticleGrid>
        {!isFetching &&
        articles.map((article) => (
            <Link key={article.id} to={`/watch/${article.id}`}>
              <ArticleCard article={article} />
            </Link>
          ))}
      </ArticleGrid>
    </StyledHome>
  );
};

export default Home;
