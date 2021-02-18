import React, { useState } from "react";
import ProductGallery from "../components/ProdsGallery";
import { useParams } from "react-router-dom";
import { fetcher } from "../utils";
import Helmet from "react-helmet";
import useSWR from "swr";
import MySnackbar from "../components/MySnackbar";
import Placeholder from "../components/Placeholder/ProductGallery";

export default function CategoryPage() {
  const { category } = useParams();
  const [info, setInfo] = useState({ message: "", severity: "info" });
  const categoryName = category
    .split("_")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Tv", "TV");
  const { data: products, error } = useSWR(`/category/${category}`, fetcher);
  if (error) setInfo({ message: error.message, severity: "error" });
  return (
    <div className="container-lg">
      <Helmet>
        <title>{categoryName}</title>
      </Helmet>
      <h1 className="text-center">{categoryName}</h1>
      <div className="row justify-content-center justify-content-md-start">
        {!products && <Placeholder />}
        {products && (
          <>
            {!products.length && <div className="col-12">No products.</div>}
            <ProductGallery products={products} setInfo={setInfo} />
          </>
        )}
      </div>
      {info.message && <MySnackbar setInfo={setInfo} info={info} />}
    </div>
  );
}
