import { Box, Text, Button } from "@gluestack-ui/themed";

const HomeScreen = ({ navigation }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$black">
      <Text color="$white" fontSize={24}>Home Screen</Text>
      <Button onPress={() => navigation.navigate("Details")} mt="$4">
        <Text color="$white">Go to Details</Text>
      </Button>
    </Box>
  );
};

export default HomeScreen;
