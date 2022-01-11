import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Helmet from "react-helmet";
import { fetcher } from "../utils";
import AuthContext from "../context/AuthContext";
import EditingMode from "../components/Product/EditingMode";
import ViewingMode from "../components/Product/ViewingMode";
import Reviews from "../components/Product/Reviews";
import Placeholder from "../components/Placeholder/ProductBody";
import { toast } from "react-toastify";

export default function ProductPage() {
	const { _id } = useParams();
	const [edit, setEdit] = useState(false);

	const { data: product, error } = useSWR(`/api/products/${_id}`, fetcher);
	const [auth] = useContext(AuthContext);
	const admin = auth?.admin;
	useEffect(() => {
		if (error) toast.error(error.message, { autoClose: 5000 });
	}, [error]);
	if (error)
		return (
			<div className="container">
				<Helmet>
					<title>Error</title>
				</Helmet>
				<Placeholder />
			</div>
		);

	if (!product)
		return (
			<div className="container">
				<Placeholder />
			</div>
		);
	return (
		<div className="container">
			<Helmet>
				<title>{product.name}</title>
			</Helmet>
			{edit ? (
				<EditingMode product={product} setEdit={setEdit} />
			) : (
				<ViewingMode product={product} admin={admin} setEdit={setEdit} />
			)}
			<Reviews product={product} auth={auth} />
		</div>
	);
}
