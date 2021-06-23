import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Link, useParams } from "react-router-dom";

// UI elements
/*import Player from "../components/Player";*/
import Comments from "../components/Comments";
import ArticleCard from "../components/ArticleCard";
import NoResults from "../components/NoResults";
import { LikeIcon, DislikeIcon } from "../components/Icons";
import Skeleton from "../skeletons/WatchArticleSkeleton";
import Button from "../styles/Button";

// reducers and others
import {
  subscribeFromArticle,
  unsubscribeFromArticle,
  clearArticle,
  getArticle,
  like,
  dislike,
  cancelLike,
  cancelDislike,
} from "../reducers/article";
import { addChannel, removeChannel } from "../reducers/user";
import { getRecommendation } from "../reducers/recommendation";
import {
  addChannelLocalSt,
  removeChannelLocalSt,
  client,
  timeSince,
} from "../utils/index";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 2rem;
  padding: 1.3rem;
  padding-bottom: 7rem;

  .article-container .article-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .article-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .channel-info-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .article-info-stats {
    display: flex;
    align-items: center;
  }

  .article-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-flex button {
    font-size: 0.9rem;
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-articles img {
    height: 140px;
  }

  .related-articles div {
    margin-bottom: 1rem;
  }

  svg {
    fill: ${(props) => props.theme.darkGrey};
  }

  ${(props) =>
    props.filledLike &&
    css`
      .like svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

  ${(props) =>
    props.filledDislike &&
    css`
      .dislike svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

	@media screen and (max-width: 930px) {
    grid-template-columns: 90%;
    .related-articles {
      display: none;
    }
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .article-info-stats div {
      margin-left: 1rem;
    }
  }
`;

const WatchArticle = () => {
  const { articleId } = useParams();

  const dispatch = useDispatch();

  const { isFetching: articleFetching, data: article } = useSelector(
    (state) => state.article
  );
  const { isFetching: recommendationFetching, articles: next } = useSelector(
    (state) => state.recommendation
  );

  const handleLike = () => {
    if (article.isLiked) {
      dispatch(cancelLike());
    } else {
      dispatch(like());
    }

    if (article.isDisliked) {
      dispatch(cancelDislike());
    }

    client(`${process.env.REACT_APP_BE}articles/${articleId}/like`);
  };

  const handleDislike = () => {
    if (article.isDisliked) {
      dispatch(cancelDislike());
    } else {
      dispatch(dislike());
    }

    if (article.isLiked) {
      dispatch(cancelLike());
    }

    client(`${process.env.REACT_APP_BE}articles/${articleId}/dislike`);
  };

  const handleSubscribe = (channel) => {
    dispatch(subscribeFromArticle());
    dispatch(addChannel(channel));
    addChannelLocalSt(channel);
    client(`${process.env.REACT_APP_BE}users/${channel.id}/togglesubscribe`);
  };

  const handleUnsubscribe = (channelId) => {
    dispatch(unsubscribeFromArticle());
    dispatch(removeChannel(channelId));
    removeChannelLocalSt(channelId);
    client(`${process.env.REACT_APP_BE}users/${channelId}/togglesubscribe`);
  };

  useEffect(() => {
    dispatch(getArticle(articleId));
    dispatch(getRecommendation());

    return () => {
      dispatch(clearArticle());
    };
  }, [dispatch, articleId]);

  if (articleFetching || recommendationFetching) {
    return <Skeleton />;
  }

  if (!articleFetching && !article) {
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );
  }

  return (
    <Wrapper
      filledLike={article && article.isLiked}
      filledDislike={article && article.isDisliked}
    >
      <div className="article-container">
        <div className="article-info">
          <div className="article-info-stats">
            <p>
              <span>{article.views} views</span> <span>•</span>{" "}
              <span>{timeSince(article.createdAt)} ago</span>
            </p>

            <div className="likes-dislikes flex-row">
              <p className="flex-row like">
                <LikeIcon onClick={handleLike} />{" "}
                <span>{article.likesCount}</span>
              </p>
              <p className="flex-row dislike" style={{ marginLeft: "1rem" }}>
                <DislikeIcon onClick={handleDislike} />{" "}
                <span>{article.dislikesCount}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="channel-info-description">
          <div className="channel-info-flex">
            <div className="channel-info flex-row">
              <img
                className="avatar md"
                src={article.User?.avatar}
                alt="channel avatar"
              />
              <div className="channel-info-meta">
                <h4>
                  <Link to={`/channel/${article.userId}`}>
                    {article.User?.username}
                  </Link>
                </h4>
                <span className="secondary small">
                  {article.subscribersCount} subscribers
                </span>
              </div>
            </div>

            {!article.isArticleMine && !article.isSubscribed && (
              <Button onClick={() => handleSubscribe({ ...article.User })}>
                Subscribe
              </Button>
            )}
            {!article.isArticleMine && article.isSubscribed && (
              <Button grey onClick={() => handleUnsubscribe(article.User.id)}>
                Subscribed
              </Button>
            )}
          </div>
          <img
              className=""
              src={article.thumbnail}
              alt="article thumbnail"
          />
          <h1>{article.title}</h1>
          <p>{article.text}</p>
        </div>
        <Comments />
      </div>

      <div className="related-articles">
        <h3 style={{ marginBottom: "1rem" }}>Up Next</h3>
        {next
          .filter((vid) => vid.id !== article.id)
          .slice(0, 3)
          .map((article) => (
            <Link key={article.id} to={`/watch/${article.id}`}>
              <ArticleCard key={article.id} hideavatar={true} article={article} />
            </Link>
          ))}
      </div>
    </Wrapper>
  );
};

export default WatchArticle;
