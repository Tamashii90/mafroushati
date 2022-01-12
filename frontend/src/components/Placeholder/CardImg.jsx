import React from "react";
import { RectShape } from "react-placeholder/lib/placeholders";

function CardImgPlaceholder({ style }) {
	return (
		<div className="p-3 placeholder-animated" style={style}>
			<RectShape
				color="#E0E0E0"
				style={{
					width: "100%",
					height: "100%"
				}}
			/>
		</div>
	);
}

export default CardImgPlaceholder;
