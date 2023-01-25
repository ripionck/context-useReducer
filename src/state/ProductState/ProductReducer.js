import { actionTypes } from "./actionTypes";

export const initialState = {
  loading: false,
  products: [],
  error: false,
  cart: [],
  wishlist: [],
};

export const productReducer = (state, action) => {
  const selectedProduct = state.cart.find(
    (product) => product._id === action.payload._id
  );

  //console.log(selectedProduct);
  switch (action.type) {
    case actionTypes.FETCHING_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.FETCHING_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: false,
      };
    case actionTypes.FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    //ADD_TO_CART
    case actionTypes.ADD_TO_CART:
      if (selectedProduct) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectedProduct._id
        );
        selectedProduct.quantity = selectedProduct.quantity + 1;
        return {
          ...state,
          cart: [...newCart, selectedProduct],
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    //ADD_TO_WISHLIST
    case actionTypes.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    //REMOVE_FROM_CART
    case actionTypes.REMOVE_FROM_CART:
      if (selectedProduct.quantity > 1) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectedProduct._id
        );
        selectedProduct.quantity = selectedProduct.quantity - 1;
        return {
          ...state,
          cart: [...newCart, selectedProduct],
        };
      }
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
