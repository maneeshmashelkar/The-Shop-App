import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken;

      let createOrUpdateCartItem;

      if (state.items[addedProduct.id]) {
        createOrUpdateCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          pushToken,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        createOrUpdateCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          pushToken,
          prodPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: createOrUpdateCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currenQTY = selectedCartItem.quantity;
      let updatedCartItems;
      if (currenQTY > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.prodPrice,
          selectedCartItem.prodTitle,
          selectedCartItem.sum - selectedCartItem.prodPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItem[action.pid];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.prodPrice,
      };

    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItem = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItem[action.pid];
      return {
        ...state,
        items: updatedItem,
        totalAmount: state.totalAmount - itemTotal,
      };

    case ADD_ORDER:
      return initialState;

    default:
      return state;
  }
};
