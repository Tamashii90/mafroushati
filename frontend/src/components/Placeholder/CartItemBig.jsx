import React from "react";
import { TextRow, RectShape } from "react-placeholder/lib/placeholders";

export default function Placeholder() {
  return (
    <div className="row py-4 py-lg-2">
      <div className="col-3 text-center d-none d-lg-block">
        <RectShape
          color="#E0E0E0"
          className="placeholder-animated mx-4"
          style={{ width: 75, height: 75, display: "inline-block" }}
        />
      </div>
      <TextRow
        color="#E0E0E0"
        className="col text-center align-self-center placeholder-animated mr-4 ml-4 ml-lg-0"
      />
    </div>
  );
}
