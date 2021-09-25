import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetail ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => setShowDetail((prevState) => !prevState)}
      />
      {showDetail && (
        <View style={styles.showDetail}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              amount={cartItem.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  showDetail: {
    width: "100%",
  },
});

export default OrderItem;
