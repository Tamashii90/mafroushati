import React from "react";
import { Link } from "react-router-dom";
import WriteReview from "./WriteReview";
import Review from "../Review";
import { useLocation } from "react-router-dom";

export default function Reviews({ product, auth }) {
	const { pathname } = useLocation();

	const reviewExists = () => {
		return product.reviews.some(review => review.user === auth.username);
	};
	return (
		<div className="container">
			<h3>Customer Reviews</h3>
			{!product.reviews.length ? (
				<h6 className="mt-4">This product has no reviews.</h6>
			) : (
				product.reviews.map(review => (
					<Review prodId={product._id} review={review} key={review._id} />
				))
			)}
			<div className="mt-5">
				{!auth ? (
					<span>
						<Link to={`/login?redr=${pathname}`}>Log in</Link> to write a review.
					</span>
				) : reviewExists() ? null : (
					<WriteReview prodId={product._id} />
				)}
			</div>
		</div>
	);
}
