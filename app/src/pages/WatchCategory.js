import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Link, useParams } from "react-router-dom";

import NoResults from "../components/NoResults";

import Skeleton from "../skeletons/WatchCategorySkeleton";


import {
    clearCategory,
    getCategory,
} from "../reducers/category";



export const StyledCategory = styled.div`
  padding: 1rem 1.3rem;
  width: 85%;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 7rem;
  padding-bottom: ${(props) => (props.nopad ? "0.5rem" : "7rem")};

  @media screen and (max-width: 930px) {
    width: 95%;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const WatchCategory = () => {
    const { categoryId } = useParams();

    const dispatch = useDispatch();


    const { isFetching: categoryFetching, data: category } = useSelector(
        (state) => state.category
    );

    useEffect(() => {
        dispatch(getCategory(categoryId));

        return () => {
            dispatch(clearCategory());
        };
    }, [dispatch, categoryId]);

    if (categoryFetching ) {
        return <Skeleton />;
    }

    if (!categoryFetching && !category) {
        return (
            <NoResults
                title="Page not found"
                text="The page you are looking for is not found or it may have been removed"
            />
        );
    }

    return (
        <StyledCategory>
            <div className="article-container">


                <div className="channel-info-description">

                    <img
                        className=""
                        src={category.thumbnail}
                        alt="category thumbnail"
                    />
                    <h1>{category.title}</h1>
                </div>
                {category.articles.map((article, index) =>
                    <li><Link to={`/watch/${article.id}`} key={index}>{article.title}</Link></li>
                )}
                </div>
        </StyledCategory>
    );
};

export default WatchCategory;
