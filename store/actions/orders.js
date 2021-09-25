import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    //any async code
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-the-shop-app-c6728-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong in setOrder!");
      }

      const resData = await response.json();
      const loadedOrder = [];
      for (const key in resData) {
        loadedOrder.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: SET_ORDER,
        orders: loadedOrder,
      });
    } catch (err) {
      //send to custome analytic server
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    const response = await fetch(
      `https://rn-the-shop-app-c6728-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Some Thing went wrong in addOrder");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });

    for (const cartItem of cartItems) {
      const pushToken = cartItem.productPushToken;
      
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: pushToken,
          title: "Order was Placed",
          body: cartItem.productTitle,
        }),
      });
    }
  };
};
