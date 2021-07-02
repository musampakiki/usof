import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CategoryCard from "../components/CategoryCard";
import Skeleton from "../skeletons/TrendingSkeleton";
import { getCategories } from "../reducers/categories";

export const StyledCategories = styled.div`
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

const Categories = () => {
    const dispatch = useDispatch();
    const { isFetching, categories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    if (isFetching) {
        return <Skeleton />;
    }

    return (
        <StyledCategories>
            <h2>Categories</h2>

            <div className="trending">
                {!isFetching &&
                categories.map((category) => (
                    <Link to={`/categories/${category.id}`} key={category.id}>
                        <CategoryCard category={category} />
                    </Link>
                ))}
            </div>
        </StyledCategories>
    );
};

export default Categories;
