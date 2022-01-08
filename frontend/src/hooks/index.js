import { useReducer } from "react";

const ACTIONS = {
	ADD_PRODUCT: "addProduct",
	REMOVE_PRODUCT: "removeProduct",
	INC_QTY: "incQty",
	DEC_QTY: "decQty",
	CLEAR_CART: "clearCart"
};

const reducer = (cart, action) => {
	const newCart = { ...cart };
	switch (action.type) {
		case ACTIONS.ADD_PRODUCT: {
			newCart.products.push({
				_id: action.payload._id,
				name: action.payload.name,
				price_per_piece: action.payload.price_per_piece,
				img_url: action.payload.img_url,
				quantity_in_stock: action.payload.quantity_in_stock,
				quantityInCart: 1,
				totalPrice: action.payload.price_per_piece
			});
			newCart.total += action.payload.price_per_piece;
			return newCart;
		}

		case ACTIONS.REMOVE_PRODUCT: {
			newCart.products = newCart.products.filter(
				product => product._id !== action.payload._id
			);
			newCart.total -= action.payload.price_per_piece;
			return newCart;
		}

		case ACTIONS.INC_QTY: {
			const index = newCart.products.findIndex(
				product => product._id === action.payload._id
			);
			const foundProduct = newCart.products[index];
			foundProduct.quantityInCart++;
			foundProduct.totalPrice += action.payload.price_per_piece;
			newCart.total += action.payload.price_per_piece;
			return newCart;
		}

		case ACTIONS.DEC_QTY: {
			const index = newCart.products.findIndex(
				product => product._id === action.payload._id
			);
			const foundProduct = newCart.products[index];
			foundProduct.quantityInCart--;
			foundProduct.totalPrice -= action.payload.price_per_piece;
			newCart.total -= action.payload.price_per_piece;
			return newCart;
		}

		case ACTIONS.CLEAR_CART: {
			return { "products": [], "total": 0 };
		}
	}
};

export function useCart(initialValue) {
	const [cart, dispatch] = useReducer(reducer, initialValue);
	return [cart, dispatch];
}

// export function useCart(initialValue) {
//   const [cart, setValue] = useState(initialValue);
//   const addToCart = (newProd) => {
//     setValue((prev) => {
//       const newCart = { ...prev };
//       const foundIdx = newCart.products.findIndex(
//         (currentProd) => currentProd._id === newProd._id
//       );
//       if (foundIdx !== -1) {
//         newCart.products[foundIdx].qty += 1;
//         newCart.products[foundIdx].price_per_piece += newProd.price_per_piece;
//       } else {
//         newCart.products.push({ ...newProd, qty: 1 });
//       }
//       return newCart;
//     });
//   };
//   return [cart, addToCart];
// }

// export function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       if (initialValue) {
//         console.log("found initial, adding it to localStorage");
//         window.localStorage.setItem(key, JSON.stringify(initialValue));
//       }
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });
//   const setValue = (value) => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(value));
//       setStoredValue(value);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue];
// }
