import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { fetcher } from "../../utils";
import CartContext from "../../context/CartContext";
import ModifyCartBtn from "../ModifyCartBtn";

const ViewingMode = ({ product, admin, setEdit, setInfo }) => {
  const history = useHistory();
  const [cart, dispatch] = useContext(CartContext);
  const alrdyInCart = () => {
    return cart.products.some(existingProd => existingProd._id === product._id);
  };
  const deleteProduct = async () => {
    if (confirm("Are you sure ?")) {
      try {
        await fetcher(`/products/${product._id}`, {
          method: "DELETE"
        });
        history.replace("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const editProduct = async () => {
    setEdit(true);
  };
  return (
    <div className="row mt-4 align-items-center">
      <div className="col-lg-6 col-12">
        <div className="col-12 text-center">
          <img
            className="img-fluid"
            src={product.img_url}
            alt={`${product.name}_img`}
          />
        </div>
      </div>
      <div className="col-lg-6 col-12 text-center text-lg-left">
        <div className="col-12 ml-lg-4 mt-lg-0 mt-3 ">
          <h3 className="mb-4">{product.name}</h3>
          <p>
            Price:
            {` $${product.price_per_piece.toLocaleString("en-US")}`}
          </p>
          <p>
            Added
            {" " + new Date(product.createdAt).toISOString().slice(0, 10)}
          </p>
          <p>
            {product.quantity_in_stock > 0 ? (
              <span style={{ color: "green" }}>In Stock</span>
            ) : (
              <span style={{ color: "red" }}>Out of Stock</span>
            )}
          </p>
          {alrdyInCart() ? (
            <ModifyCartBtn
              product={product}
              dispatch={dispatch}
              add={false}
              setInfo={setInfo}
            />
          ) : (
            <ModifyCartBtn
              product={product}
              dispatch={dispatch}
              add={true}
              setInfo={setInfo}
            />
          )}
          {admin && (
            <div className="mt-3">
              <button
                type="button"
                className="btn-warning btn mr-1"
                onClick={editProduct}
              >
                Edit Product
              </button>
              <button
                type="button"
                className="btn-danger btn"
                onClick={deleteProduct}
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewingMode;
