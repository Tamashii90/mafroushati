import React, { useContext, useState } from "react";
import "../scss/product-body.scss";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Helmet from "react-helmet";
import { fetcher } from "../utils";
import AuthContext from "../context/AuthContext";
import EditingMode from "../components/Product/EditingMode";
import ViewingMode from "../components/Product/ViewingMode";
import Reviews from "../components/Product/Reviews";
import Placeholder from "../components/Placeholder/ProductBody";
import MySnackbar from "../components/MySnackbar";

export default function ProductPage() {
  const { _id } = useParams();
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState({ message: "", severity: "info" });
  const { data: product, error } = useSWR(`/products/${_id}`, fetcher);
  const [auth] = useContext(AuthContext);
  const admin = auth?.admin;
  if (error)
    return (
      <div className="container-lg">
        <Helmet>
          <title>Error</title>
        </Helmet>
        <Placeholder />
        <MySnackbar
          setInfo={setInfo}
          info={{ message: error.message, severity: "error", delay: 10000 }}
        />
      </div>
    );
  if (!product)
    return (
      <div className="container-lg">
        <Placeholder />
      </div>
    );
  return (
    <div className="container-lg">
      {info.message && <MySnackbar info={info} setInfo={setInfo} />}
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      {edit ? (
        <EditingMode product={product} setEdit={setEdit} setInfo={setInfo} />
      ) : (
        <ViewingMode
          product={product}
          admin={admin}
          setEdit={setEdit}
          setInfo={setInfo}
        />
      )}
      <Reviews product={product} auth={auth} />
    </div>
  );
}
