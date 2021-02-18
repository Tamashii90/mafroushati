import React, { useState } from "react";
import { fetcher } from "../../utils";
import { mutate } from "swr";

const EditingMode = ({ setEdit, product }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const cancelEdits = async () => {
    setEdit(false);
  };
  const submitEdit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    try {
      const res = await fetcher(`/products/${product._id}`, {
        method: "PATCH",
        body: form
      });
      setLoading(false);
      setEdit(false);
      mutate(`/products/${product._id}`);
    } catch (err) {
      setLoading(false);
      err.body ? setErrors(err.body) : setErrors({ general: err.message });
    }
  };
  return (
    <>
      <h2 className="mb-4">Editing product: {product.name}</h2>
      <form onSubmit={submitEdit}>
        {errors.general}
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Product Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              defaultValue={product.name}
            />
            <small className="form-text text-danger">
              {errors.name?.message}
            </small>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="price_per_piece" className="col-sm-2 col-form-label">
            Price
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="price_per_piece"
              min="1"
              className="form-control"
              id="price_per_piece"
              defaultValue={product.price_per_piece}
            />
            <small className="form-text text-danger">
              {errors.price_per_piece?.message}
            </small>
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="quantity_in_stock"
            className="col-sm-2 col-form-label"
          >
            Quantity
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="quantity_in_stock"
              className="form-control"
              id="quantity_in_stock"
              defaultValue={product.quantity_in_stock}
            />
            <small className="form-text text-danger">
              {errors.quantity_in_stock?.message}
            </small>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="category" className="col-sm-2 col-form-label">
            Category
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              name="category"
              id="category"
              defaultValue={product.category}
            >
              <option value="bookshelves">Bookshelves</option>
              <option value="coffee_tables">Coffe Tables</option>
              <option value="cupboards">Cupboards</option>
              <option value="dining_chairs">Dining Chairs</option>
              <option value="dining_tables">Dining Tables</option>
              <option value="beds">Beds</option>
              <option value="kitchen_cabinets">Kitchen Cabinets</option>
              <option value="lounge_chairs">Lounge Chairs</option>
              <option value="mattresses">Mattresses</option>
              <option value="shoe_racks">Shoe Racks</option>
              <option value="sofa_sets">Sofa Sets</option>
              <option value="tv_units">TV Units</option>
            </select>
            <small className="form-text text-danger">
              {errors.category?.message}
            </small>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="featured" className="col-sm-2 col-form-label">
            Featured
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              name="featured"
              id="featured"
              defaultValue={product.featured}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
            <small className="form-text text-danger">
              {errors.featured?.message}
            </small>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="img_url" className="col-sm-2 col-form-label">
            Product Image
          </label>
          <div className="col-sm-10">
            <input className="mt-2" type="file" name="img_url" id="img_url" />
            <small className="form-text text-danger">
              {errors.img_url?.message}
            </small>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            {!loading ? (
              <button type="submit" className="btn btn-primary">
                Submit Changes
              </button>
            ) : (
              <button type="button" className="btn btn-primary" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  aria-hidden="true"
                ></span>
                <span className="ml-2">Submitting..</span>
              </button>
            )}
          </div>
        </div>
      </form>
      <button className="btn btn-info mt-4" onClick={cancelEdits}>
        Go Back
      </button>
    </>
  );
};

export default EditingMode;
