import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { Home, User, Settings, BarChart, Package } from "lucide-react-native"; // ✅ Correct Icons Import
import useAuthStore from "../store/authStore";
import { ActivityIndicator, View } from "react-native";
import SettingsScreen from "../screens/SettingsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProductDetailsScreen from "../screens/ProductDetails";
import ProductScreen from "../screens/ProductScreen";
import OrderScreen from "../screens/OrderScreen";
import ProductUpdateScreen from "../screens/ProductUpdateScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🔹 Bottom Tab Navigator (Protected)
const BottomTabs = () => {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let Icon;
          switch (route.name) {
            case "Home":
              Icon = Home;
              break;
            case "Dashboard":
              Icon = BarChart;
              break;
            case "Product":
              Icon = Package;
              break;
            case "Settings":
              Icon = Settings;
              break;
            case "Profile":
              Icon = User;
              break;
            default:
              return null;
          }
          return <Icon color={color} size={size} />;
        },
        tabBarStyle: { backgroundColor: "#ffff" },
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// 🔹 Protected Navigation Wrapper
const ProtectedRoutes = () => {
  const { user, isLoading, checkLoginStatus } = useAuthStore();

  React.useEffect(() => {
    checkLoginStatus(); // ✅ App start hone par login status check karega
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return user ? <BottomTabs /> : <LoginScreen />;
};

// 🔹 Stack Navigation (Main Navigation)
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProtectedRoutes" component={ProtectedRoutes} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Order" component={OrderScreen} options={{
          headerShown: true,   // ✅ Header show hoga
          headerTitle: "🛒 Confirm Order", // ✅ Custom Title
          headerStyle: { backgroundColor: "#121212" },  // ✅ Header Background Color
          headerTitleStyle: { color: "#FFD700", fontSize: 20, fontWeight: "bold" },  // ✅ Title ka Color & Style
          headerTintColor: "#FFD700",  // ✅ Back Button (Arrow) ka Color
        }} />
        <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProductUpdate" component={ProductUpdateScreen} options={{ headerShown: false }} />

        
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
