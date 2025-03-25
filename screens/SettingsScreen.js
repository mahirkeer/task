import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Button, ButtonText, Switch } from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../store/authStore";

const SettingScreen = () => {
  const { user, isLoading, checkLoginStatus, logout } = useAuthStore();
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    checkLoginStatus(); // ✅ App start hone par login status check karega
  }, []);

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#FFD700" />
      </Box>
    );
  }

  // 🔹 User agar login nahi hai, toh Login Screen pe bhejo
  if (!user) {
    navigation.replace("Login");
    return null;
  }

  return (
    <Box flex={1} bg="#D7F9FA" justifyContent="center" alignItems="center">
      <VStack w="90%" p="$4" bg="$white" borderRadius="$lg" alignItems="center" shadow="2">
        <Text fontSize={24} fontWeight="bold" color="$black">⚙️ Settings</Text>

        {/* 🔹 Notifications Toggle */}
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" w="100%" mt="$4">
          <Text fontSize={18} color="$black">🔔 Enable Notifications</Text>
          <Switch
            isChecked={notificationsEnabled}
            onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </Box>

        {/* 🔹 Edit Profile Button */}
        <Button mt="$4" bg="$blue500" borderRadius="$lg" onPress={() => navigation.navigate("Profile")}>
          <ButtonText color="$white" fontSize={18}>📝 Edit Profile</ButtonText>
        </Button>

        {/* 🔹 Change Password Button */}
        <Button mt="$4" bg="$yellow500" borderRadius="$lg" onPress={() => alert("Change Password Clicked!")}>
          <ButtonText color="$black" fontSize={18}>🔑 Change Password</ButtonText>
        </Button>

        {/* 🔹 Logout Button */}
        <Button mt="$6" bg="$red500" borderRadius="$lg" onPress={() => logout(navigation)}>
          <ButtonText color="$white" fontSize={18}>🚪 Logout</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default SettingScreen;
