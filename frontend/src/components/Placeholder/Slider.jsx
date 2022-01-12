import React from "react";
import { RectShape } from "react-placeholder/lib/placeholders";

export default function SliderPlaceholder() {
	return (
		<div className="col-11 mx-auto placeholder-animated">
			<div className="text-center justify-content-center">
				<RectShape
					color="#E0E0E0"
					style={{
						display: "inline-block",
						height: "29px",
						margin: "53px 0"
					}}
				/>
			</div>
		</div>
	);
}
