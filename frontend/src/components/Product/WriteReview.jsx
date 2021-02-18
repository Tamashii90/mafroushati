import React from "react";
import { fetcher } from "../../utils";
import { mutate } from "swr";

const WriteReview = ({ prodId }) => {
  const submitReview = async e => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("prodId", prodId);
    try {
      await fetcher("/review/test", {
        method: "POST",
        body: new URLSearchParams(form)
      });
      mutate(`/products/${prodId}`);
      e.target.reset();
    } catch (err) {
      if (err.body) {
        if (
          err.body.prodId?.properties.type === "unique" &&
          err.body.user?.properties.type === "unique"
        ) {
          return console.log("You already have a review for this product.");
        }
      }
      console.log(err.message);
    }
  };
  return (
    <form className="mt-4" onSubmit={submitReview}>
      <textarea
        className="form-control col-7"
        name="content"
        placeholder="Write a review.."
      />
      <button type="submit" className="btn btn-primary mt-3">
        Submit Review
      </button>
    </form>
  );
};

export default WriteReview;
