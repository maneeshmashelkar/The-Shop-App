import Product from "../../models/product";
import * as Notifications from "expo-notifications";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    //any async code
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://rn-the-shop-app-c6728-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong in setproducts!");
      }

      const resData = await response.json();
      const loadedProduct = [];
      for (const key in resData) {
        loadedProduct.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].ownerpushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProduct,
        userProduct: loadedProduct.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      //send to custome analytic server
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-the-shop-app-c6728-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Some Thing went wrong in deleteProduct");
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    //any async code
    let pushToken;
    let statusObj = await Notifications.getPermissionsAsync();
    if (statusObj.status !== "granted") {
      statusObj = await Notifications.getPermissionsAsync();
    }

    if (statusObj.status !== "granted") {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }

    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-the-shop-app-c6728-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          imageUrl,
          ownerId: userId,
          ownerpushToken: pushToken,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        price,
        imageUrl,
        ownerId: userId,
        pushToken: pushToken,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-the-shop-app-c6728-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Some Thing went wrong in updateProduct");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
