import React from "react";
import styled from "styled-components";
import Avatar from "../styles/Avatar";
import { timeSince } from "../utils/index";
import category from "../reducers/category";

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

const CategoryCard = ({ nousername, hideavatar, category }) => {
    return (
        <Wrapper>
            <img className="thumb" src={category.thumbnail} alt="thumbnail" />
            <div className="Article-info-container">

                <div className="Article-info">


                    <h4>
                        {category.title.length > 40
                            ? category.title.substring(0, 40) + "..."
                            : category.title}
                    </h4>

                    {!nousername && (
                        <span className="secondary">{category.User.username}</span>
                    )}
                    <p className="secondary">
                        <span>{category.views || 0} views</span> <span>•</span>{" "}

                    </p>
                </div>
            </div>
        </Wrapper>
    );
};

export default CategoryCard;
