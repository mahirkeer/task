import React, { useCallback, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Box, Text, VStack, Button, ButtonText, Input, InputField, HStack, Modal } from "@gluestack-ui/themed";
import axios from "axios";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";


const AddProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // ✅ Toggle state
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [offer, setOffer] = useState("");
  const [rating, setRating] = useState("");

  // ✅ Fetch Products API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://192.168.43.172:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  // ✅ Add Product Functio
 // ✅ Upload Image & Product Data
const handleAddProduct = async () => {
  if (!image || !name || !title || !price) {
    Alert.alert("Error", "Please fill all fields!");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("title", title);
  formData.append("price", price);
  formData.append("offer", offer);
  formData.append("rating", rating);
  
  // ✅ Agar image URL hai to directly save karo, warna file upload karo
  
  if (image.startsWith("http")) {
    formData.append("image", image);
  } else {
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "product.jpg",
    });
  }

  try {
    const response = await axios.post("http://192.168.43.172:8000/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    Alert.alert("Success", "Product added successfully!");
    setImage(null);
    setName(""); setTitle(""); setPrice(""); setOffer(""); setRating("");
    fetchProducts();  // ✅ Product List Refresh karo
    setShowAddForm(false); // ✅ Form band kar do
  } catch (error) {
    Alert.alert("Error", "Something went wrong!");
  }
};


  // ✅ Delete Product Function
  const handleDeleteProduct = async (productId) => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.43.172:8000/api/products/${productId}`);
            Alert.alert("Success", "Product deleted successfully!");

            fetchProducts();
          } catch (error) {
            Alert.alert("Error", error.response?.data?.error || "Something went wrong");
          }
        },
      },
    ]);
  };
    // ✅ Select Image from Gallery
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
     // ✅ Upload Image & Product Data


  return (
    <ScrollView flex={1} bg="#D7F9FA" p="$4">

      {/* ✅ Add Product Button */}
      <Button alignSelf="center" h={50} borderRadius={20} width="98%" bg="$blue500" mb="$4" onPress={() => setShowAddForm(!showAddForm)}>
        <ButtonText   color="$white">{showAddForm ? "❌ Close Form" : "➕ Add Product"}</ButtonText>
      </Button>

      {/* ✅ Product Add Form (Show Only if `showAddForm` is True) */}
      {showAddForm && (
        <VStack space={4} bg="$white" p="$4" borderRadius="$lg">
        <Text fontSize={22} fontWeight="bold">🛒 Add Product</Text>
        <Input><InputField placeholder="Name" onChangeText={setName} value={name} /></Input>
        <Input><InputField placeholder="Title" onChangeText={setTitle} value={title} /></Input>
        <Input><InputField placeholder="Price" keyboardType="numeric" onChangeText={setPrice} value={price} /></Input>
        <Input><InputField placeholder="Offer (Optional)" onChangeText={setOffer} value={offer} /></Input>
        <Input><InputField placeholder="Rating (Optional)" onChangeText={setRating} value={rating} /></Input>

        {/* ✅ Select Image Button */}
        <Button bg="$blue500" onPress={pickImage}>
          <ButtonText color="$white">📷 Select Image</ButtonText>
        </Button>

        {/* ✅ Show Selected Image */}
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: "center", marginTop: 10 }} />}

        {/* ✅ Upload Button */}
        <Button bg="$green500" onPress={handleAddProduct}>
          <ButtonText color="$white">✅ Add Product</ButtonText>
        </Button>
      </VStack>
      )}
      
          

      {/* ✅ Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ProductUpdate", { product: item })}>
            <Box top={10} bgColor="#ffff" p="$4" mb="$4" borderRadius="$lg">
              <HStack alignItems="center">
                <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                <VStack ml="$4">
                  <Text color="$black" fontSize={18} fontWeight="bold">{item.name}</Text>
                  <Text color="$gray400">{item.title}</Text>
                  <HStack justifyContent="space-between" mt="$2">
                    <Text color="$yellow500">⭐ {item.rating} /5</Text>
                    <Text color="$green500" position='absolute' bottom={60} left={160} fontWeight="bold">₹{item.price}</Text>
                  </HStack>
                  <Text color="$red500" fontSize={14}>{item.offer}% Off</Text>
                </VStack>
              </HStack>
            </Box>
            <Button
              bg="$red500"
              position="absolute"
              w={80}
              left={260}
              top={90}
              borderRadius="$lg"
              onPress={() => handleDeleteProduct(item._id)}
            >
              <ButtonText color="$white" fontSize={14}>Delete</ButtonText>
            </Button>

          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export default AddProductScreen;
