import React, { useState } from "react";
import { Alert } from "react-native";
import { Box, Text, VStack, Button, ButtonText, Input, InputField } from "@gluestack-ui/themed";
import axios from "axios";

const ProductUpdateScreen = ({ route, navigation }) => {
  const { product } = route.params; // ✅ Jo product update karna hai uska data le lo
  
  // ✅ State with pre-filled data
  const [name, setName] = useState(product.name);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);
  const [offer, setOffer] = useState(product.offer.toString());
  const [rating, setRating] = useState(product.rating.toString());

  // ✅ Function to Update Product
  const handleUpdateProduct = async () => {
    if (!name || !title || !price || !image) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      await axios.put(`http://192.168.43.172:8000/api/products/${product._id}`, {
        name, title, price, image, offer, rating
      });

      Alert.alert("Success", "Product updated successfully!");
      navigation.goBack(); // ✅ Wapas jao aur list update hogi
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Box flex={1} bg="#D7F9FA" p="$4">
      <VStack space={4} bg="$white" p="$4" borderRadius="$lg">
        <Text fontSize={22} fontWeight="bold">✏️ Update Product</Text>
        <Input><InputField placeholder="Name" onChangeText={setName} value={name} /></Input>
        <Input><InputField placeholder="Title" onChangeText={setTitle} value={title} /></Input>
        <Input><InputField placeholder="Price" keyboardType="numeric" onChangeText={setPrice} value={price} /></Input>
        <Input><InputField placeholder="Image URL" onChangeText={setImage} value={image} /></Input>
        <Input><InputField placeholder="Offer" onChangeText={setOffer} value={offer} /></Input>
        <Input><InputField placeholder="Rating" onChangeText={setRating} value={rating} /></Input>
        <Button bg="$blue500" onPress={handleUpdateProduct}>
          <ButtonText color="$white">✅ Update Product</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductUpdateScreen;
