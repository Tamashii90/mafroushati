import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import InfoContext from "../context/InfoContext";
import { fetcher } from "../utils";
import CartItemBig from "../components/Cart/CartItemBig";
import CheckoutModal from "../components/CheckoutModal";
import Placeholder from "../components/Placeholder/CartBody";

export default function CartBody() {
  const history = useHistory();
  const [, setInfo] = useContext(InfoContext);
  const [cart] = useContext(CartContext);
  const [auth] = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);
  const listOfProds = cart.products.map(product => ({
    _id: product._id,
    quantityInCart: product.quantityInCart
  }));
  const handleCheckout = async () => {
    await getProds();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function getProds() {
    try {
      const res = await fetcher("/api/cart", {
        method: "POST",
        body: JSON.stringify({ listOfProds }),
        headers: { "Content-Type": "application/json" }
      });
      const partialProducts = res.body;
      setProducts(partialProducts);
      const totalsArr = partialProducts.map(prod => {
        const matchingQty = cart.products.find(
          product => String(prod._id) === String(product._id)
        ).quantityInCart;
        return matchingQty * prod.price_per_piece;
      });
      setTotal(
        totalsArr.reduce((total, totalPerProd) => total + totalPerProd, 0)
      );
    } catch (err) {
      setInfo({
        message: err.message,
        severity: "error"
      });
    }
  }

  useEffect(() => {
    if (!auth) {
      setInfo({
        message: "Please Log In Or Register First.",
        severity: "info"
      });
      return history.replace("/login");
    }
    getProds();
  }, []);

  if (!auth) {
    // Don't render anything and instead redirect to /login (check useEffect)
    return null;
  }

  if (!cart.products.length) {
    return (
      <div className="container">
        <h4 className="text-center">Your Cart is Empty.</h4>
      </div>
    );
  }

  if (!products) return <Placeholder />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row my-3">
            <div className="col-4 text-center">Product</div>
            <div className="col text-center">Price Per Piece</div>
            <div className="col text-center">Quantity</div>
            <div className="col text-center">Total Price</div>
          </div>
        </div>
        <div className="col-12">
          {products.map(product => (
            <CartItemBig
              key={product._id}
              product={product}
              setProducts={setProducts}
              setTotal={setTotal}
            />
          ))}
          <div className="col-12 my-3">
            <h3>Total: {"$" + total.toLocaleString("en-US")}</h3>
          </div>
          <div className="col-12 my-4">
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      <CheckoutModal
        listOfProds={listOfProds}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}
