import React from "react";
import Helmet from "react-helmet";

function PageNotFound() {
	return (
		<>
			<Helmet>
				<title>404 | Page Not Found</title>
			</Helmet>
			<div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
				<h2 className="text-center">You've reached a dead end :(</h2>
			</div>
		</>
	);
}

export default PageNotFound;
