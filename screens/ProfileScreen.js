import React, { useEffect } from "react";
import { Box, Text, VStack, Button, ButtonText } from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../store/authStore";

const ProfileScreen = () => {
  const { user, isLoading, checkLoginStatus, logout } = useAuthStore();
  const navigation = useNavigation();

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
        <Text fontSize={24} fontWeight="bold" color="$black">👤 {user.name}</Text>
        <Text fontSize={18} color="$gray500">📧 {user.email}</Text>
        <Text fontSize={18} color="$gray500">📞 {user.mobile}</Text>

        {/* 🔹 Logout Button */}
        <Button mt="$6" bg="$red500" borderRadius="$lg" onPress={() => logout(navigation)}>
          <ButtonText color="$white" fontSize={18}>🚪 Logout</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfileScreen;
