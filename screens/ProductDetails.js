import React from "react";
import { Alert, Image } from "react-native";
import { Box, Text, VStack, Button, ButtonText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params; // 🔹 Product Details Get Karo
    const navigation = useNavigation();

    return (
        <Box flex={1} bg="#D7F9FA" p="$4">
            {/* 🖼️ Product Image */}
            <Image source={{ uri: product.image }} style={{ width: "100%", height: 250, borderRadius: 10 }} />

            {/* 📜 Product Details */}
            <VStack mt="$4">
                <Text fontSize={24} fontWeight="bold" color="$black">
                    {product.name}
                </Text>
                <Text color="$gray500" fontSize={18}>
                    {product.title}
                </Text>
                <Text fontSize={20} fontWeight="bold" color="$green500">
                    ₹{product.price}
                </Text>
                <Text fontSize={16} color="$red500">
                    {product.offer}% Off
                </Text>

                {/* ⭐ Rating & 🗓️ Date */}
                <Box gap={8}>
                    <Text mt="$2" color="$black" fontSize={16}>
                        ⭐ Rating: {product.rating} / 5
                    </Text>
                    <Text color="$gray500" fontSize={14}>
                        🗓️ Added on: {new Date(product.createdAt).toLocaleDateString()}
                    </Text>
                    <Text>
                        🕒 Time: {new Date(product.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
                    </Text>
                </Box>

                {/* 🛒 Order Now Button */}
                <Button
                    mt="$6"
                    bg="$blue500"
                    borderRadius="$lg"
                    onPress={() => navigation.navigate("Order", { product })}
                >
                    <ButtonText color="$white" fontSize={18}>🛒 Order Now</ButtonText>
                </Button>

                
            </VStack>
        </Box>
    );
};

export default ProductDetailsScreen;
