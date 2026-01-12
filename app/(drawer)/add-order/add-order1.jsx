import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { measure } from 'react-native-reanimated';

export default function AddOrder() {
  const [customer, setCustomer] = useState('');
  const [CustomerPhone, setCustomerPhone] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [measure, setMeasure] = useState('');


  // const handl = () => {
  //   if (!customer || !CustomerPhone || !product || !quantity || !price) {
  //     Alert.alert('Error', 'Please fill all fields');
  //     return;
  //   }

  //   // TEMP: No database yet
  //   console.log({
  //     customer,
  //     CustomerPhone,
  //     number,
  //     product,
  //     quantity,
  //     price,
  //   });

  //   Alert.alert('Success', 'Order added successfully');

  //   router.replace('/(drawer)/dashboard'); // go back to dashboard
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => router.replace('/(drawer)/dashboard')}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Add Customer Details</Text>
        </View>
      
      <Text style={styles.label}>Customer Name</Text>
      <TextInput
        placeholder="Enter customer full name"
        placeholderTextColor="#9ca3af"
        value={customer}
        onChangeText={setCustomer}
        style={styles.input}
      />

      <Text style={styles.label}>Customer Phone Number</Text>
      <TextInput
        placeholder="Enter Customer's Phone Number"
        placeholderTextColor="#9ca3af"
        value={CustomerPhone}
        onChangeText={setCustomerPhone}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Product Name</Text>
      <TextInput
        placeholder="Enter Product Name"
        placeholderTextColor="#9ca3af"
        value={product}
        onChangeText={setProduct}
        style={styles.input}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        placeholder="Enter Quantity"
        placeholderTextColor="#9ca3af"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

<Text style={styles.label}>Unit of measure</Text>
      <TextInput
        placeholder="Enter Unit of measure"
        placeholderTextColor="#9ca3af"
        value={measure}
        onChangeText={setMeasure}
        style={styles.input}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="Enter Price"
        placeholderTextColor="#9ca3af"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton} 
        onPress={() => router.push('/(drawer)/add-order/add-order2')}>        
        <Text style={styles.saveText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f5f9',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#0b2243',
    },
  
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},
backText: {
  fontSize: 16,
  color: '#2563eb',
  marginRight: 12,
},
headerTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  flex: 1,
  textAlign: 'center',
},

});
