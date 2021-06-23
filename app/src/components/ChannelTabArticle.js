import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

const Wrapper = styled.div`
  .articles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  @media screen and (max-width: 830px) {
    .articles {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 540px) {
    .articles {
      grid-template-columns: 1fr;
    }
  }
`;

const ChannelTabArticle = () => {
  const { articles } = useSelector((state) => state.profile.data);

  if (!articles?.length) {
    return <p>This channel hasn't posted any articles yet</p>;
  }

  return (
    <Wrapper>
      <div className="articles">
        {articles?.map((article) => (
          <Link to={`/watch/${article.id}`} key={article.id}>
            <ArticleCard nousername={true} hideavatar={true} article={article} />
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default ChannelTabArticle;
