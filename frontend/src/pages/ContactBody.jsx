import React from "react";
import { toast } from "react-toastify";
import { fetcher } from "../utils";

export default function ContactBody() {
	const submitForm = async e => {
		const form = new FormData(e.target);
		e.preventDefault();

		try {
			await fetcher("/api/feedback", { method: "POST", body: new URLSearchParams(form) });
			toast.success("Thanks for Your Feedback.");
		} catch (err) {
			toast.error(err.message);
		}
	};
	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-6 align-self-center">
					<div className="mb-3">
						<u>Al-Najmah Square (main):</u>
						<br />
						<span className="mr-2">{"\u{1F4DE}"}</span>
						<span>+963-11-0000000</span>
					</div>
					<div className="mb-3">
						<u>Al-Baramkeh:</u>
						<br />
						<span className="mr-2">{"\u{1F4DE}"}</span>
						<span>+963-11-9999999</span>
					</div>
					<div className="mb-3">
						<u>Al-Bahsa:</u>
						<br />
						<span className="mr-2">{"\u{1F4DE}"}</span>
						<span>+963-11-8888888</span>
					</div>
				</div>
				<div className="col-12 col-md-6">
					<h4 className="mb-4">Contact Us</h4>
					<form onSubmit={submitForm}>
						<div className="form-group">
							<label htmlFor="user">E-mail</label>
							<input
								type="email"
								minLength="3"
								maxLength="255"
								className="form-control"
								id="user"
								name="user"
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="form-control" id="title" name="title" required />
						</div>
						<div className="form-group">
							<label htmlFor="message">Message</label>
							<textarea
								className="form-control"
								name="message"
								id="message"
								minLength="2"
								maxLength="255"
								cols="30"
								rows="5"
								required
							></textarea>
							<button className="btn btn-primary mt-3" type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
