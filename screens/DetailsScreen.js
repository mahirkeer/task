import { Box, Text, Button } from "@gluestack-ui/themed";

const DetailsScreen = ({ navigation }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$black">
      <Text color="$white" fontSize={24}>Details Screen</Text>
      <Button onPress={() => navigation.goBack()} mt="$4">
        <Text color="$white">Go Back</Text>
      </Button>
    </Box>
  );
};

export default DetailsScreen;
