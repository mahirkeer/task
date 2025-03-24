import { Box, Text, Button } from "@gluestack-ui/themed";
import useAuthStore from "../store/authStore";

const ProfileScreen = ({ navigation }) => {
  const { logout, user } = useAuthStore();

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$black">
      <Text color="$white" fontSize={24}>Profile Screen</Text>
      <Text color="$yellow500" fontSize={18}>Welcome, {user?.name}</Text>

      <Button onPress={() => logout(navigation)} mt="$4">
        <Text color="$white">Logout</Text>
      </Button>
    </Box>
  );
};

export default ProfileScreen;
