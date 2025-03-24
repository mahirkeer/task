import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

const DashboardScreen = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$black">
      <Text color="$white" fontSize={20}>Dashboard Screen</Text>
    </Box>
  );
};

export default DashboardScreen;
