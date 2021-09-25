import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: actions.products,
        userProducts: actions.userProduct,
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        actions.productData.id,
        actions.productData.ownerId,
        actions.productData.pushToken,
        actions.productData.title,
        actions.productData.imageUrl,
        actions.productData.description,
        actions.productData.price
      );

      return {
        state,
        userProducts: state.userProducts.concat(newProduct),
        availableProducts: state.availableProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === actions.pid
      );

      const updateProduct = new Product(
        actions.pid,
        state.userProducts[productIndex].ownerId,
        state.userProducts[productIndex].pushToken,
        actions.productData.title,
        actions.productData.imageUrl,
        actions.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productIndex] = updateProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === actions.pid
      );

      const updatedAvailableProduct = [...state.availableProducts];
      updatedAvailableProduct[availableProductIndex] = updateProduct;

      return {
        ...state,
        userProducts: updatedUserProduct,
        availableProducts: updatedAvailableProduct,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== actions.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== actions.pid
        ),
      };

    default:
      return state;
  }
};
