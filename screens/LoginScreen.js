import React, { useState } from "react";
import { Box, Button, ButtonText, FormControl, Input, InputField, Text } from "@gluestack-ui/themed";
import useAuthStore from "../store/authStore";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login} = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    login(email, password, navigation);  // ✅ Navigation pass karo
};
  return (
    <Box bgColor="#D7F9FA" justifyContent="center" flex={1}>
      <Text underline bottom={60} fontWeight={600} alignSelf="center" fontSize={30}>Login !</Text>
      <Box bottom={40} justifyContent="center"
        bgColor="#ffff"
        borderRadius={20}
        alignSelf="center"
        w={340} h={300}
        shadowColor="black"
        shadowOffset={{ width: 2, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={6}
        elevation={8}  >
        <Box w="90%" p={5} borderRadius={16} alignSelf="center" justifyContent="center" gap={50} h={200} bgColor="#ffff" >

          <FormControl gap={10}>
            <FormControl.Label>
              <Text fontWeight={500} color="black" fontSize={16}>Email</Text>
            </FormControl.Label>
            <Input>
              <InputField onChangeText={setEmail} placeholder="Enter Your valid Email"  fontWeight={300} color="black" />
            </Input>
            <FormControl.Label>
              <Text fontWeight={500} color="black" fontSize={16}>Password</Text>
            </FormControl.Label>
            <Input>
              <InputField  onChangeText={setPassword} secureTextEntry placeholder="Enter Your Password..." fontWeight={300} color="black" />
            </Input>
            <Text top={20}>
              Don't have an account? <Text color="blue" onPress={()=>{navigation.navigate("Register")}} underline fontWeight={800}>Register</Text>

            </Text>
           
            
            <Button onPress={handleLogin} alignSelf="center" h={50} borderRadius={20} w="90%" top={140}>
              <ButtonText >
                Login !
              </ButtonText>
            </Button>
          </FormControl>
        </Box>
      </Box>

    </Box>

  );
};

export default LoginScreen;


