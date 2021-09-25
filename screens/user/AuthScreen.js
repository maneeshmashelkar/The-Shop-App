import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, actions) => {
  if (actions.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [actions.input]: actions.value,
    };

    const updatedValidites = {
      ...state.inputValidites,
      [actions.input]: actions.isValid,
    };

    let updatedIsFormValid = true;
    for (const key in updatedValidites) {
      updatedIsFormValid = updatedIsFormValid && updatedValidites[key];
    }
    return {
      isFormValid: updatedIsFormValid,
      inputValues: updatedValues,
      inputValidites: updatedValidites,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidites: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

  const authHandler = async () => {
    
    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      // props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputType, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        isValid: inputValidity,
        value: inputValue,
        input: inputType,
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.screen}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter the valid Email address"
              initialValue=""
              onInputChange={inputChangeHandler}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              secureTextEntry
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter the valid password"
              initialValue=""
              onInputChange={inputChangeHandler}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </View>
  );
};

export const authOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: { flex: 1, justifyContent: "center", alignItems: "center" },
  authContainer: {
    width: "80%",
    padding: 20,
    maxHeight: 400,
    maxWidth: 400,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
