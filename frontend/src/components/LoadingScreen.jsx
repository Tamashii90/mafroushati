import React from "react";

function LoadingScreen() {
	const imageUrl = new URL("/assets/loading.svg", import.meta.url);
	return (
		<div className="fixed-top vw-100 vh-100 bg-primary" id="loading-screen">
			<div>
				<img src={imageUrl} alt="Loading.." />
			</div>
		</div>
	);
}

export default LoadingScreen;
