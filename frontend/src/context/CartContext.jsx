import React, { createContext, useEffect } from "react";
import { useCart } from "../hooks";
export default CartContext = createContext();

export function CartContextProvider({ children }) {
  const oldCart = JSON.parse(
    window.localStorage.getItem("cart") || '{"products":[], "total":0}'
  );
  const [cart, setCart] = useCart(oldCart);
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}
