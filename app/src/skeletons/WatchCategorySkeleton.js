import React from "react";
import styled from "styled-components";
import { SkeletonLine, CategoryCardSkeleton } from "../styles/Skeleton";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 70% 1fr;
	grid-gap: 2rem;
	padding: 1.3rem;

	.avatar-card {
		display: flex;
		align-items: center;
		margin-top: 2rem;
	}

	.avatar {
		height: 100px;
		width: 100px;
		border-radius: 50px;
	}

	.article {
		height: 340px;
	}

	.related-articles img {
		height: 140px;
	}

	.related-articles div {
		margin-bottom: 1rem;
	}

	@media screen and (max-width: 930px) {
		grid-template-columns: 1fr;
		.related-articles {
			display: none;
		}
	}

	@media screen and (max-width: 500px) {
		.article {
			height: 250px;
		}
	}

	@media screen and (max-width: 400px) {
		.avatar-card {
			margin-top: 3rem;
	}

		.avatar {
	    height: 70px;
			width: 70px;
			border-radius: 35px;
			position: relative;
			top: -5px;
    }
	}
 	}
`;

const CategorySkeleton = () => {
    return (
        <Wrapper>
            <div className="article-container">
                <SkeletonLine className="article" mb="30px" />
                <SkeletonLine width="300px" height="25px" mb="20px" />
                <SkeletonLine width="200px" height="20px" mb="20px" />
                <div className="avatar-card">
                    <SkeletonLine className="avatar" mr="20px" />
                    <div className="avatar-card-info">
                        <SkeletonLine width="240px" height="20px" mb="20px" />
                        <SkeletonLine width="160px" height="20px" mb="20px" />
                    </div>
                </div>
            </div>
            <div className="related-articles">
                <SkeletonLine width="180px" height="20px" mb="20px" />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
            </div>
        </Wrapper>
    );
};

export default CategorySkeleton;
