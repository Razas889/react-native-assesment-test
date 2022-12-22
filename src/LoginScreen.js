import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
const LoginScreen = () => {
  const [formValue, setFormValue] = useState()
  
  const handleChange = (name, value) => {
    setFormValue({
      ...formValue,
      [name]: value
    })
  }
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        onChangeText={(e) => handleChange('username', e)}
        placeholderTextColor={'#cecece'}
        placeholder="User name"
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginTop: 10,
          borderRadius: 10,
        }}
      />
      <TextInput
        onChangeText={(e) => handleChange('password', e)}
        placeholderTextColor={'#cecece'}
        placeholder="Password"
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginTop: 10,
          borderRadius: 10,
        }}
      />

      <TouchableOpacity
        onPress={() => handleLogin()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          color: 'white',
        }}>
        Login
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen