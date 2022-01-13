import React from "react";

function LoadingScreen() {
	return (
		<div className="fixed-top vw-100 vh-100 bg-primary" id="loading-screen">
			<div>
				<img src="/images/loading.svg" alt="Loading.." />
			</div>
		</div>
	);
}

export default LoadingScreen;
