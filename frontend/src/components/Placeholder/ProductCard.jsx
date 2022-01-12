import React from "react";
import { RectShape } from "react-placeholder/lib/placeholders";

export default function Placeholder() {
	return (
		<div className="col-12 my-3 placeholder-animated">
			<div className="text-center justify-content-center">
				<RectShape
					color="#E0E0E0"
					className="col-12"
					style={{
						display: "inline-block",
						height: "300px",
						marginRight: 0
					}}
				/>
			</div>
		</div>
	);
}
