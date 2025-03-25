import React, { useState } from "react";
import { Alert } from "react-native";
import { Box, Text, Button, ButtonText, VStack, HStack, Input, InputField, Radio } from "@gluestack-ui/themed";
import { Image } from "react-native";

const DetailsScreen = ({ route, navigation }) => {
  const { product, address } = route.params; // ✅ Product + Address receive karna
  const [paymentMethod, setPaymentMethod] = useState("COD"); // ✅ Default: Cash on Delivery

  const handleConfirmPayment = () => {
    Alert.alert("Payment Successful", "Thank you for your order! 😊", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

  return (
    <Box  flex={1} bg="$black" p="$4">
      
      {/* 🔹 Product Details */}
      <Box bg="$white" borderRadius={10} p="$4">
        <Image source={{ uri: product.image }} style={{ width: "100%", height: 200, borderRadius: 10 }} />
        <Text fontSize={20} fontWeight="bold" mt="$2">{product.name}</Text>
        <Text color="$gray500">{product.title}</Text>
        <HStack justifyContent="space-between" mt="$2">
          <Text color="$yellow500">⭐ {product.rating} / 5</Text>
          <Text fontWeight="bold" color="$green500">₹{product.price}</Text>
        </HStack>
      </Box>

      {/* 🔹 Address Summary */}
      <Box bg="$white" borderRadius={10} p="$4" mt="$4">
        <Text fontSize={18} fontWeight="bold">📍 Delivery Address</Text>
        <Text color="$gray600">{address.fullName}</Text>
        <Text color="$gray600">{address.contactNumber}</Text>
        <Text color="$gray600">{address.houseAddress}, {address.pincode}</Text>
      </Box>

      {/* 🔹 Payment Method */}
      <Box  bg="$white" borderRadius={10} p="$4" mt="$4">
        <Text fontSize={18} fontWeight="bold">💳 Payment Method</Text>
        <Radio.Group value={paymentMethod} onChange={setPaymentMethod}>
        <Radio value="COD"><Text>Cash on Delivery (COD)</Text></Radio>
          <Radio value="UPI"><Text>UPI Payment</Text><Button top={5} left={90}><ButtonText>Payment !</ButtonText></Button></Radio>
        </Radio.Group>
      </Box>

      {/* ✅ Confirm Payment Button */}
      <Button mb={30} bg="$green500" borderRadius={10} mt="$4" onPress={handleConfirmPayment}>
        <ButtonText color="$white">✅ Confirm & Pay</ButtonText>
      </Button>

    </Box>
  );
};

export default DetailsScreen;
