import React, { useState } from "react";
import ProdsGallery from "./ProdsGallery";
import useSWR from "swr";
import Placeholder from "./Placeholder/ProductGallery";
import MySnackBar from "./MySnackbar";
import { fetcher } from "../utils";

export default function RecentProds() {
  console.log("render recent");
  const [info, setInfo] = useState({ message: "", severity: "info" });
  const { data: prods, error } = useSWR("/products/recent", fetcher);
  if (error) setInfo({ message: error.message, severity: "error" });
  return (
    <>
      {info.message && <MySnackBar info={info} setInfo={setInfo} />}
      <div className="container-lg">
        <h1>Recently Added</h1>
        <div className="row justify-content-center justify-content-md-start">
          {!prods && <Placeholder />}
          {prods && <ProdsGallery products={prods} setInfo={setInfo} />}
        </div>
      </div>
    </>
  );
}
