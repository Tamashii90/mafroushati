import React from "react";
import { TextBlock, RectShape } from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";

export default function Placeholder() {
	return (
		<>
			<div className="row my-4 align-items-center">
				<div className="col-lg-8 col-12">
					<div className="col-12 text-center">
						<RectShape
							color="#E0E0E0"
							className="placeholder-animated"
							style={{
								display: "inline-block",
								width: "100%",
								height: "500px"
							}}
						/>
					</div>
				</div>
				<div className="col-lg-4 col-12 text-center text-lg-left">
					<div className="col-12 ml-lg-4 mt-3 ">
						<RectShape
							color="#E0E0E0"
							className="mb-4 placeholder-animated"
							style={{
								display: "inline-block",
								width: 100,
								height: 16
							}}
						/>
						<br />
						<RectShape
							color="#E0E0E0"
							className="mb-4 placeholder-animated"
							style={{
								display: "inline-block",
								width: 100,
								height: 16
							}}
						/>
						<br />
						<RectShape
							color="#E0E0E0"
							className="mb-4 placeholder-animated"
							style={{
								display: "inline-block",
								width: 135,
								height: 16
							}}
						/>
						<br />
						<RectShape
							color="#E0E0E0"
							className="mb-4 placeholder-animated"
							style={{
								display: "inline-block",
								width: 50,
								height: 16
							}}
						/>
						<br />
						<RectShape
							color="#E0E0E0"
							className="mb-4 placeholder-animated"
							style={{
								display: "inline-block",
								width: 110,
								height: 38
							}}
						/>
						<br />
					</div>
				</div>
			</div>
			<div className="mt-4">
				<TextBlock color="#E0E0E0" rows={4} className="mt-3 placeholder-animated" />
			</div>
		</>
	);
}
