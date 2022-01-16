import React, { useContext, useState } from "react";
import { fetcher } from "../../utils";
import { mutate } from "swr";
import { toast } from "react-toastify";

export default function WriteReview({ prodId }) {
	const [loading, setLoading] = useState(false);

	const submitReview = async e => {
		e.preventDefault();
		setLoading(true);
		const form = new FormData(e.target);
		form.append("prodId", prodId);
		try {
			await fetcher("/api/review", {
				method: "POST",
				body: new URLSearchParams(form)
			});
			setLoading(false);
			mutate(`/api/products/${prodId}`);
			e.target.reset();
		} catch (err) {
			setLoading(false);
			toast.error(err.message);
		}
	};
	return (
		<form className="mt-4" onSubmit={submitReview}>
			<textarea
				className="form-control col-7"
				name="content"
				placeholder="Write a review.."
				required
			/>
			<button type="submit" className="btn btn-primary mt-3">
				Submit Review
				{loading && <span className="ml-2 spinner-grow spinner-grow-sm"></span>}
			</button>
		</form>
	);
}
