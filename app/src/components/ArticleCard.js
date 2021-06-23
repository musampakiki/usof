import React from "react";
import styled from "styled-components";
import Avatar from "../styles/Avatar";
import { timeSince } from "../utils/index";

const Wrapper = styled.div`
  .thumb {
    width: 100%;
    height: 380px;
    object-fit: cover;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .Article-info-container {
    display: flex;
    margin-top: 0.3rem;
  }

  .channel-avatar img {
    position: relative;
    top: 5px;
  }

  .Article-info span {
    font-size: 0.9rem;
    padding-right: 0.1rem;
  }

  @media screen and (max-width: 600px) {
    .thumb {
      height: 250px;
    }
  }

  @media screen and (max-width: 420px) {
    .thumb {
      height: 200px;
    }
  }
`;

const ArticleCard = ({ nousername, hideavatar, article }) => {
  return (
    <Wrapper>
      <img className="thumb" src={article.thumbnail} alt="thumbnail" />
      <div className="Article-info-container">
        <div className="channel-avatar">
          {!hideavatar && (
            <Avatar
              style={{ marginRight: "0.8rem" }}
              src={article.User.avatar}
              alt="channel avatar"
            />
          )}
        </div>
        <div className="Article-info">
          <h4>
            {article.title.length > 40
              ? article.title.substring(0, 40) + "..."
              : article.title}
          </h4>
          <p className="secondary">
            {article.description}
          </p>
          {!nousername && (
            <span className="secondary">{article.User.username}</span>
          )}
          <p className="secondary">
            <span>{article.views || 0} views</span> <span>•</span>{" "}
            <span>{timeSince(article.createdAt)} ago</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default ArticleCard;
