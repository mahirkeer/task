import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Box, Text, VStack, Button, ButtonText, Input, InputField, Divider } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Image } from "@gluestack-ui/themed";

const OrderScreen = ({ route }) => {
    const navigation = useNavigation();
    const { product } = route.params;

    // 🔹 User Input Fields
    const [fullName, setFullName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [houseAddress, setHouseAddress] = useState("");
    const [roadArea, setRoadArea] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    // ✅ Pincode Validation Function
    const isValidPincode = (pin) => /^\d{6}$/.test(pin);

    const handleOrder = () => {
        if (!fullName || !contactNumber || !houseAddress || !roadArea || !pincode || !city || !state) {
            Alert.alert("Error", "Please fill all required fields!");
            return;
        }
        if (!isValidPincode(pincode)) {
            Alert.alert("Error", "Enter a valid 6-digit Pincode!");
            return;
        }

        const address = { fullName, contactNumber, houseAddress, roadArea, pincode, city, state };

        Alert.alert("Order Placed", `Your order for ${product.name} has been confirmed. Please proceed with the payment.`, [
            { text: "Okay", onPress: () => navigation.navigate("Details", { product, address }) },
        ]);
    };
   
  

    // 🔹 Price Details Calculation
    const totalProductPrice = product.price;
    const discount = 105; // Flat Discount
    const additionalFees = 79; // Delivery Charges
    const orderTotal = totalProductPrice - discount + additionalFees;

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Box flex={1} bg="#D7F9FA" p="$2">
                        {/* 🖼️ Product Image */}
                        <Box borderRadius={20} p={10} h={180} bg="#ffff" top={20}>
                            <Image borderRadius={20} h={100} w={100} source={{ uri: product.image }} />
                            <Text left={110} bottom={105} fontSize={24} fontWeight="bold" color="$black">{product.name}</Text>
                            <Text left={110} bottom={100} color="$gray500" fontSize={18}>{product.title}</Text>
                            <Text left={110} bottom={100} fontSize={20} fontWeight="bold" color="$green500">₹{product.price}</Text>
                            <Text left={110} bottom={100} fontSize={16} color="$red500">{product.offer} OFF</Text>
                            <Text left={200} bottom={90}>{new Date(product.createdAt).toDateString()}</Text>
                            <Text bottom={112}>⭐ Rating: {product.rating} / 5</Text>
                        </Box>

                        {/* 🏠 Address Form */}
                        <VStack borderRadius={20} w="98%" alignSelf="center" top={10} bg="#ffff" p={10} m="$4">
                            <Text fontSize={20} fontWeight="bold" mb="$2">📍 Delivery Address</Text>
                            <Input mt="$2"><InputField placeholder="Full Name*" onChangeText={setFullName} value={fullName} /></Input>
                            <Input mt="$2"><InputField placeholder="Contact Number*" keyboardType="phone-pad" onChangeText={setContactNumber} value={contactNumber} /></Input>
                            <Input mt="$2"><InputField placeholder="House No./Building Name*" onChangeText={setHouseAddress} value={houseAddress} /></Input>
                            <Input mt="$2"><InputField placeholder="Road Name/Area/Colony*" onChangeText={setRoadArea} value={roadArea} /></Input>
                            <Input mt="$2"><InputField placeholder="Pincode*" keyboardType="numeric" maxLength={6} onChangeText={setPincode} value={pincode} /></Input>
                            <Input mt="$2"><InputField placeholder="City*" onChangeText={setCity} value={city} /></Input>
                            <Input mt="$2"><InputField placeholder="State*" onChangeText={setState} value={state} /></Input>
                        </VStack>

                        {/* 💰 Price Details */}
                        <Box borderRadius={20} w="98%" gap={6} alignSelf="center" bg="#ffff" p={10} m="$4">
                            <Text fontSize={20} fontWeight="bold">💰 Price Details</Text>
                            <Divider my="$2" />
                            <Text fontSize={16}>Total Product Price: ₹{totalProductPrice}</Text>
                            <Text fontSize={16} color="$red500">Total Discounts: -₹{discount}</Text>
                            <Text fontSize={16} color="$blue500">Additional Fees: +₹{additionalFees}</Text>
                            <Divider my="$2" />
                            <Text fontSize={18} fontWeight="bold" color="$green500">Order Total: ₹{orderTotal}</Text>
                        </Box>

                        {/* ✅ Confirm Order Button */}
                        <Button mt="$8" bg="$green500" borderRadius="$lg" onPress={handleOrder}>
                            <ButtonText color="$white" fontSize={18}>✅ Deliver to this Address</ButtonText>
                        </Button>
                    </Box>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default OrderScreen;
