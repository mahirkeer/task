import { GluestackUIProvider, Box, Spinner } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import AppNavigation from "./navigation/AppNavigation";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

export default function App() {
  const { isLoading, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus(); // ✅ App start hone par login status check karega
  }, []);

  return (
    <GluestackUIProvider config={config}>
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$yellow500" />
        </Box>
      ) : (
        <AppNavigation />
      )}
    </GluestackUIProvider>
  );
}
