import React, { useState } from 'react'
import { Box, Button, ButtonText, FormControl, Input, InputField, Text } from '@gluestack-ui/themed'
import useAuthStore from '../store/authStore'
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation=useNavigation();
  const { register, error} = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    register(name, email, mobile, password, navigation);  // ✅ Navigation pass karo
};
  return (
    <Box justifyContent='center' flex={1} bgColor='#D7F9FA'>
      <Text underline bottom="8%" fontWeight={600} alignSelf="center" fontSize={30}>Register !</Text>
      {error && <Text color="$red500">{error}</Text>}

      <Box
        justifyContent="center"
        bgColor="#ffff"
        borderRadius={20}
        alignSelf="center"
        w={340} h={400}
        shadowColor="black"
        shadowOffset={{ width: 2, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={6}
        elevation={8}>
        <FormControl m={20} gap={6}>
          <FormControl.Label>
            <Text fontWeight={500}>Name</Text>
          </FormControl.Label>
          <Input>
            <InputField onChangeText={setName} placeholder='Enter Your UserName'></InputField>
          </Input>
          <FormControl.Label>
            <Text fontWeight={500}>Email</Text>
          </FormControl.Label>
          <Input>
            <InputField onChangeText={setEmail} placeholder='Enter Valid Email'></InputField>
          </Input>
          <FormControl.Label>
            <Text fontWeight={500}>Mobile No:</Text>
          </FormControl.Label>
          <Input>
            <InputField onChangeText={setMobile} placeholder='Enter Your Number'></InputField>
          </Input>
          <FormControl.Label>
            <Text fontWeight={500}>Password</Text>
          </FormControl.Label>
          <Input>
            <InputField onChangeText={setPassword} secureTextEntry placeholder='Enter New Password'></InputField>
          </Input>
          <Text top={20}>Already have an account? <Text underline color='blue' fontWeight={800}>Login</Text> </Text>
        </FormControl>
        <Button         onPress={handleRegister} alignSelf="center" h={50} borderRadius={20} w="90%" top={80}>
          <ButtonText >
            Submit !
          </ButtonText>
        </Button>

      </Box>
    </Box>
  )
}

export default RegisterScreen



















