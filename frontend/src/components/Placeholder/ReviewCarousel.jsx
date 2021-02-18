import React from "react";
import ReviewPlaceholder from "./ReviewCard";

export default function Placeholder() {
  return (
    <>
      <div className="col-10 col-md-6 col-lg-4">
        <ReviewPlaceholder key={133323} />
      </div>
      <div className="col-md-6 col-lg-4 d-none d-md-block">
        <ReviewPlaceholder key={411112} className="d-none d-md-block" />
      </div>
      <div className="col-lg-4 d-none d-lg-block">
        <ReviewPlaceholder key={85633} className="d-none d-lg-block" />
      </div>
    </>
  );
}
