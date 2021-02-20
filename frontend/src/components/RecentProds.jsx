import React, { useState } from "react";
import ProdsGallery from "./ProdsGallery";
import useSWR from "swr";
import Placeholder from "./Placeholder/ProductGallery";
import { fetcher } from "../utils";

export default function RecentProds() {
  const { data: prods, error } = useSWR("/products/recent", fetcher);
  return (
    <>
      <div className="container-lg">
        <h1>Recently Added</h1>
        <div className="row justify-content-center justify-content-md-start">
          {!prods && <Placeholder />}
          {prods && <ProdsGallery products={prods} />}
        </div>
      </div>
    </>
  );
}
