import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}> {props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        {props.deletable && <TouchableOpacity onPress={props.onDelete} style={styles.deleteButton}>
          <Ionicons
            size={23}
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            color="red"
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginBottom: 2,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "black",
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
