import React from "react";
import RecentProds from "../components/RecentProds";
import FeaturedProds from "../components/FeaturedProds";
import ReviewCarousel from "../components/ReviewCarousel";
import Filler1 from "../components/Filler1";
import { useState } from "react";

export default function MainPage() {
	const [isImgLoading, setIsImgLoading] = useState(true);
	return (
		<>
			{isImgLoading && <div style={{ aspectRatio: "2560/1440", background: "#5ea3cc" }}></div>}
			<img
				src="https://i.imgur.com/OgG8O0a.jpg"
				style={{
					width: "calc(100vw - 17px)",
					display: isImgLoading ? "none" : "block",
					margin: "0 auto"
				}}
				onLoad={() => setIsImgLoading(false)}
			/>
			<Filler1 />
			<FeaturedProds />
			<RecentProds />
			<ReviewCarousel />
		</>
	);
}
