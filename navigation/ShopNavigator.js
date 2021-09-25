import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import CartScreen, { cartOptions } from "../screens/shop/CartScreen";
import OrderScreen, { orderOptions } from "../screens/shop/OrderScreen";
import ProductDetailScreen, {
  productDetailOptions,
} from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen, {
  productsOverviewOptions,
} from "../screens/shop/ProductsOverviewScreen";
import StartupScreen from "../screens/StartupScreen";
import AuthScreen, { authOptions } from "../screens/user/AuthScreen";
import EditProductScreen, {
  editProductOptions,
} from "../screens/user/EditProductScreen";
import UserProductsScreen, {
  userProductsOptions,
} from "../screens/user/UserProductsScreen";
import * as authActions from "../store/actions/auth";
import { Button, SafeAreaView, View } from "react-native";

const defaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductStackNavigator = createStackNavigator();

export const ProductNavigation = () => {
  return (
    <ProductStackNavigator.Navigator screenOptions={defaultNavOption}>
      <ProductStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewOptions}
      />
      <ProductStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailOptions}
      />
      <ProductStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartOptions}
      />
    </ProductStackNavigator.Navigator>
  );
};

// const ProductNavigation = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOption,
//   }
// );

const AdminStackNavigator = createStackNavigator();

export const AdminNavigation = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOption}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigation = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOption,
//   }
// );

const OrderStackNavigator = createStackNavigator();

export const OrderNavigation = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultNavOption}>
      <OrderStackNavigator.Screen
        name="Orders"
        component={OrderScreen}
        options={orderOptions}
      />
    </OrderStackNavigator.Navigator>
  );
};

// const OrderNavigation = createStackNavigator(
//   {
//     Orders: OrderScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOption,
//   }
// );

export const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        itemsContainerStyle: {
          marginVertical: 25,
        },
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate("Auth");
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductNavigation}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrderNavigation}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigation}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductNavigation,
//     Orders: OrderNavigation,
//     Admin: AdminNavigation,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,
//       // itemsContainerStyle: {
//       //   marginVertical: 25,
//       // },
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView>
//             <DrawerItems {...props} />
//             <Button
//               title="Logout"
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(authActions.logout());
//                 props.navigation.navigate("Auth");
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOption}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOption,
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
