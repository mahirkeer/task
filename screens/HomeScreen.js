import { Box, FlatList, HStack, Image, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const navigation=useNavigation();
  const [products, setProducts] = useState([]);

   // ✅ Fetch Products API
   const fetchProducts = async () => {
    try {
      const response = await axios.get("http://192.168.43.172:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
    // 🔹 Fetch products when screen comes in focus
    useFocusEffect(
      useCallback(() => {
        fetchProducts();
      }, [])
    );
  return (
    <Box flex={1} bg="#D7F9FA">
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product: item })}>
          <Box top={10} bgColor="#ffff" p="$4" mb="$4" borderRadius="$lg">
            <HStack alignItems="center">
              <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
              <VStack ml="$4">
                <Text color="$black" fontSize={18} fontWeight="bold">{item.name}</Text>
                <Text color="$gray400">{item.title}</Text>
                <HStack justifyContent="space-between" mt="$2">
                  <Text color="$yellow500">⭐ {item.rating} /5</Text>
                  

                  <Text color="$green500" position='absolute' top={20} left={180} fontWeight="bold">₹{item.price}</Text>
                </HStack>
                <Text color="$red500" fontSize={14}>{item.offer}% Off</Text>
              </VStack>
            </HStack>
          </Box>
        </TouchableOpacity>
      )}
    />
  </Box>
  )
}

export default HomeScreen