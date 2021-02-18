import React from "react";
import CardPlaceholder from "./ProductCard";

export default function Placeholder() {
  return (
    <>
      <div className="col-10 col-md-6 col-lg-4">
        <CardPlaceholder key={31233} />
      </div>
      <div className="col-md-6 col-lg-4 d-none d-md-block">
        <CardPlaceholder key={11123} />
      </div>
      <div className="col-lg-4 d-none d-lg-block">
        <CardPlaceholder key={22222} />
      </div>
    </>
  );
}
