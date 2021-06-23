import React from "react";
import styled from "styled-components";
import { SkeletonLine, ArticleCardSkeleton } from "../styles/Skeleton";

const Wrapper = styled.div`
  min-height: 100vh;

  .channel-avatar-info {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 1rem auto;
  }

  .avatar {
    margin-right: 1rem;
    width: 120px;
    height: 120px;
    border-radius: 60px;
  }

  .articles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    margin: 0 auto;
    margin-top: 2rem;
    width: 80%;
  }

  @media screen and (max-width: 860px) {
    .articles {
      width: 90%;
    }
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

  @media screen and (max-width: 500px) {
    .channel-avatar-info {
      width: 100%;
      padding: 1rem;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
  }

  @media screen and (max-width: 420px) {
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 35px;
      position: relative;
      top: -3px;
    }

    .channel-info {
      width: 80%;
    }
  }

  @media screen and (max-width: 390px) {
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      position: relative;
      top: -20px;
    }

    .channel-info {
      width: 80%;
    }
  }
`;

const ChannelSkeleton = () => {
  return (
    <Wrapper>
      <SkeletonLine width="100%" height="170px" />
      <div className="channel-avatar-info">
        <SkeletonLine className="avatar" />
        <div className="channel-info">
          <SkeletonLine width="250px" height="20px" mb="20px" />
          <SkeletonLine width="200px" height="20px" mb="20px" />
        </div>
      </div>
      <div className="articles">
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    </Wrapper>
  );
};

export default ChannelSkeleton;
