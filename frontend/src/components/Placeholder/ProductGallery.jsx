import React from "react";
import CardPlaceholder from "./ProductCard";

export default function Placeholder() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, idx) => (
        <div key={idx} className="col-10 col-md-6 col-lg-4">
          <CardPlaceholder key={idx} />
        </div>
      ))}
    </>
  );
}
