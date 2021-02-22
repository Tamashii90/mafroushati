import React, { useContext, useState } from "react";
import { fetcher } from "../../utils";
import { mutate } from "swr";
import InfoContext from "../../context/InfoContext";

const WriteReview = ({ prodId }) => {
  const [loading, setLoading] = useState(false);
  const [, setInfo] = useContext(InfoContext);
  const submitReview = async e => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    form.append("prodId", prodId);
    try {
      await fetcher("/review/test", {
        method: "POST",
        body: new URLSearchParams(form)
      });
      setLoading(false);
      mutate(`/products/${prodId}`);
      e.target.reset();
    } catch (err) {
      setLoading(false);
      setInfo({ message: err.message, severity: "error" });
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
        {loading && <span className="ml-2 spinner-grow spinner-grow-sm"></span>}
      </button>
    </form>
  );
};

export default WriteReview;
