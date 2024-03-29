import React, { useContext, useState } from "react";
import { mutate } from "swr";
import { fetcher } from "../../utils";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function EditingMode({ setEditMode, review, prodId }) {
	const [loading, setLoading] = useState(false);

	const [auth] = useContext(AuthContext);
	const submitReview = async e => {
		e.preventDefault();
		setLoading(true);
		const form = new FormData(e.target);
		try {
			await fetcher(`/api/review/${review._id}`, {
				method: "PATCH",
				body: new URLSearchParams(form)
			});
			setLoading(false);
			setEditMode(false);
			mutate(`/api/products/${prodId}`);
		} catch (err) {
			setLoading(false);
			toast.error(err.message);
		}
	};
	return (
		<form className="my-4 pb-4" onSubmit={submitReview} style={{ borderBottom: "2px solid gray" }}>
			<div className="form-group">
				<textarea className="form-control col-7" name="content" defaultValue={review.content} />
			</div>
			{auth?.admin && (
				<div className="form-group row">
					<label htmlFor="featured" className="col-sm-2 col-form-label py-0">
						Featured
						<select
							className="form-control col-sm-10"
							name="featured"
							id="featured"
							defaultValue={review.featured}
						>
							<option value="false">False</option>
							<option value="true">True</option>
						</select>
					</label>
				</div>
			)}
			<button type="submit" className="btn btn-warning">
				Submit Changes
				{loading && <span className="ml-2 spinner-grow spinner-grow-sm"></span>}
			</button>
			<button type="button" className="btn btn-info ml-2" onClick={() => setEditMode(false)}>
				Go Back
			</button>
		</form>
	);
}
