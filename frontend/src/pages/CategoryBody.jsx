import React, { useEffect, useState, useRef } from "react";
import ProductGallery from "../components/ProdsGallery";
import { useParams, useLocation } from "react-router-dom";
import { fetcher } from "../utils";
import Helmet from "react-helmet";
import useSWR from "swr";
import MySnackbar from "../components/MySnackbar";
import Placeholder from "../components/Placeholder/ProductGallery";
import Slider from "../components/Slider";
import Pager from "../components/Pager";

export default function CategoryPage() {
  const { pathname } = useLocation();
  const [filter, setFilter] = useState({ min: 0, max: Infinity });
  const [price, setPrice] = useState({ min: null, max: null });
  const [skip, setSkip] = useState(0);
  const prodPerPage = 9;
  const [count, setCount] = useState();
  const { category } = useParams();
  const [info, setInfo] = useState({ message: "", severity: "info" });

  const { data, error } = useSWR(
    `/category/${category}?min=${filter.min}&max=${filter.max}&skip=${skip}`,
    fetcher
  );
  useEffect(() => {
    setSkip(0);
    setCount();
    setFilter({ min: 0, max: Infinity });
    setPrice({ min: null, max: null });
  }, [pathname]);
  const products = data?.products;
  if (products?.length && !price.min) {
    // only update the price and count once (when initial value is null)
    const sortedProds = [...products].sort(
      (a, b) => a.price_per_piece - b.price_per_piece
    );
    const minPrice = sortedProds[0].price_per_piece;
    const maxPrice = sortedProds[sortedProds.length - 1].price_per_piece;
    setCount(data.count);
    setPrice({ min: minPrice, max: maxPrice });
  }
  const filterByPrice = (e, value) => {
    setFilter({ min: value[0], max: value[1] });
  };
  const categoryName = category
    .split("+")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Tv", "TV");
  if (error) setInfo({ message: error.message, severity: "error" });
  return (
    <div className="container">
      <Helmet>
        <title>{categoryName}</title>
      </Helmet>
      <h1 className="text-center">{categoryName}</h1>
      <div className="row justify-content-center justify-content-md-start">
        <Slider
          className="col-10 mx-auto"
          onChangeCommitted={filterByPrice}
          minPrice={price.min}
          maxPrice={price.max}
          valueLabelDisplay="auto"
        />
        {!products && <Placeholder />}
        {products && <ProductGallery products={products} setInfo={setInfo} />}
        {!!products?.length && (
          <Pager
            pages={Math.ceil(count / prodPerPage)}
            setSkip={setSkip}
            className="d-flex col-12 justify-content-center"
          />
        )}
      </div>
      {info.message && <MySnackbar setInfo={setInfo} info={info} />}
    </div>
  );
}
