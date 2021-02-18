import React from "react";
import { Link } from "react-router-dom";
import WriteReview from "./WriteReview";
import Review from "../Review";

const Reviews = ({ product, auth }) => {
  return (
    <div className="mt-4">
      <h3>Customer Reviews</h3>
      {!product.reviews.length ? (
        <h6 className="mt-4">This product has no reviews.</h6>
      ) : (
        product.reviews.map(review => (
          <Review prodId={product._id} review={review} key={review._id} />
        ))
      )}
      <div className="mt-4">
        {!auth ? (
          <span>
            <Link to="/login">Log in</Link> to write a review.
          </span>
        ) : (
          <WriteReview prodId={product._id} />
        )}
      </div>
    </div>
  );
};

export default Reviews;
