import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

const ProductScreen = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$black">
      <Text color="$white" fontSize={20}>Product screen</Text>
    </Box>
  );
};

export default ProductScreen;
