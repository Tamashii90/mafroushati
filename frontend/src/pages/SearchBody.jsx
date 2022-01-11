import React, { useState, useEffect, useContext } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { fetcher } from "../utils";
import ProdsGallery from "../components/ProdsGallery";
import { toast } from "react-toastify";
import Placeholder from "../components/Placeholder/ProductGallery";

export default function SearchBody() {
	const history = useHistory();
	const { search } = history.location;
	const { data: products, error } = useSWR(`/api/search${search}`, fetcher);
	if (error) toast.error(error.message);
	return (
		<div className="container">
			<h1 className="text-center">Search Result</h1>
			<div className="row justify-content-center justify-content-md-start">
				{products ? <ProdsGallery products={products} /> : <Placeholder />}
			</div>
		</div>
	);
}
