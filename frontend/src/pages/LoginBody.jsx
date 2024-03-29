import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { fetcher } from "../utils";
import { toast } from "react-toastify";

export default function LoginPage() {
	const { search } = useLocation();
	const redirect = new URLSearchParams(search).get("redr");
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const [auth, setAuth] = useContext(AuthContext);
	const login = async e => {
		e.preventDefault();
		setLoading(true);
		const form = new FormData(e.target);
		try {
			const response = await fetcher("/api/login", {
				method: "POST",
				body: new URLSearchParams(form) // otherwise enctype would be multipart/formdata
			});
			setAuth(response.body);
			history.replace(redirect || "/");
		} catch (err) {
			setLoading(false);
			toast.error(err.message);
		}
	};
	return (
		<>
			{auth ? (
				<Redirect to="/" />
			) : (
				<div className="form-container container mb-5">
					<h2 className="text-center">Log in to Your Account</h2>
					<form onSubmit={login}>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<input
								className="form-control"
								type="text"
								id="username"
								name="username"
								placeholder="Username"
								defaultValue="test"
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								className="form-control"
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								defaultValue="1234567"
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Login
							{loading && <span className="ml-2 spinner-grow spinner-grow-sm"></span>}
						</button>
					</form>
					<Link to="/register">Don't have an account ?</Link>
				</div>
			)}
		</>
	);
}
