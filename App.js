import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {

  const [formValue, setFormValue] = useState();
  const [isProductList, isShowProductList] = useState(true);
  const [productData, setProductData] = useState([]);
  const [productListDetail, setProductListDetail] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then(res => {
      let result = res.json();
      return result;

    }).then(response => {
      setProductData(response.products)
    })
  }, [])



  const handleChange = (name, value) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleGetDetail = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then(res => {
      let result = res.json();
      return result;

    }).then(response => {
      setProductListDetail(response)
    })
  }

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formValue.username,
        password: formValue.password
      })
    })
  }

  const handleSearchProduct = (name) => {
    fetch(`https://dummyjson.com/products/search?q=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then(res => {
      let result = res.json();
      return result;

    }).then(response => {
      setProductData(response.products)
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {productListDetail.length !== 0 && <View>
          <Text>{productListDetail.brand}</Text>
          <Text>{productListDetail.description}</Text>
        </View>}

        <View>
          <TextInput style={{ backgroundColor: "white", padding: 10, marginTop: 10, borderRadius: 10 }} onChangeText={(value) => handleSearchProduct(value)} />
        </View>
        {isProductList ? <View>
          {productData?.map(item => {
            return (
              <TouchableOpacity onPress={() => handleGetDetail(item.id)} style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: item.images[0] }} style={{ height: 60, width: 60 }} />
                <Text style={{ marginLeft: 10, }}>{item.brand}</Text>
              </TouchableOpacity>
            )
          })}
        </View> : <View style={{ flex: 1 }}>

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
        </View>}

      </ScrollView>

      <View style={{ alignSelf: "flex-end" }}>
        <Text>salman</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {},
});
