import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.43.172:8000/api/auth";

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: true,

    checkLoginStatus: async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");

        if (token && user) {
            set({ token, user: JSON.parse(user), isLoading: false });
        } else {
            set({ token: null, user: null, isLoading: false });
        }
    },

    register: async (name, email, mobile, password, navigation) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { name, email, mobile, password });
    
            console.log("Register API Response:", response.data);
    
            if (!response.data.token || !response.data.user) {
                throw new Error("Invalid response from server");
            }
    
            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    
            set({ user: response.data.user, token: response.data.token });
    
            console.log("Navigating to ProtectedRoutes...");
            navigation.replace("ProtectedRoutes");  // ✅ Fix: Correct screen name
        } catch (error) {
            console.log("Register Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong");
        }
    },
       

    logout: async (navigation) => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        set({ user: null, token: null });

        console.log("Navigating to Login...");
        if (navigation) {
            navigation.replace("Login");  // ✅ Navigation yahan pass ho raha hai
        } else {
            console.error("Navigation object is undefined!");
        }
    }
}));

export default useAuthStore;
