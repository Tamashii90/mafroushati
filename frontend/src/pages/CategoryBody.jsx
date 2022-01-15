import React, { useEffect, useState } from "react";
import ProductGallery from "../components/ProdsGallery";
import { useParams, useLocation } from "react-router-dom";
import { fetcher } from "../utils";
import Helmet from "react-helmet";
import useSWR from "swr";
import Placeholder from "../components/Placeholder/ProductGallery";
import Slider from "../components/Slider";
import SliderPlaceholder from "../components/Placeholder/Slider";
import Pager from "../components/Pager";
import { toast } from "react-toastify";

export default function CategoryPage() {
	const { pathname } = useLocation();
	const [filter, setFilter] = useState({ min: 0, max: Infinity });
	const [skip, setSkip] = useState(0);
	const [count, setCount] = useState();
	const [price, setPrice] = useState();
	const prodPerPage = 9;
	const { category } = useParams();
	const categoryName = category
		.split("+")
		.map(word => word[0].toUpperCase() + word.slice(1))
		.join(" ")
		.replace("Tv", "TV");
	const filterByPrice = (e, value) => setFilter({ min: value[0], max: value[1] });

	useEffect(() => {
		setCount();
		setPrice();
		setSkip(0);
		setFilter({ min: 0, max: Infinity });
	}, [pathname]);

	const { data, error } = useSWR(
		`/api/category/${category}?min=${filter.min}&max=${filter.max}&skip=${skip}`,
		fetcher
	);
	if (error) toast.error(error.message);
	if (data && !count) {
		// only update the price and count once (when they are still undefined)
		setCount(data.count);
		setPrice({ min: data.min, max: data.max });
	}

	const products = data?.products;

	return (
		<div className="container">
			<Helmet>
				<title>{categoryName}</title>
			</Helmet>
			<h1 className="text-center">{categoryName}</h1>
			<div className="row justify-content-center justify-content-md-start">
				{price ? (
					<Slider
						className="col-10 mx-auto"
						onChangeCommitted={filterByPrice}
						minPrice={price.min}
						maxPrice={price.max}
						valueLabelDisplay="auto"
					/>
				) : (
					<SliderPlaceholder />
				)}
				{products ? <ProductGallery products={products} /> : <Placeholder />}
				{products?.length > 0 && (
					<Pager
						pages={Math.ceil(count / prodPerPage)}
						setSkip={setSkip}
						className="d-flex col-12 justify-content-center"
					/>
				)}
			</div>
		</div>
	);
}
