import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const data = await AsyncStorage.getItem("userData");

      if (!data) {
        // props.navigation.navigate("Auth");
        dispatch(authActions.didtryAutoLogin());
        return;
      }

      const transformedData = JSON.parse(data);
      const { userId, token, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate("Auth");
        dispatch(authActions.didtryAutoLogin());

        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
