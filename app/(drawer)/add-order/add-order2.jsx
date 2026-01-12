import { useLocalSearchParams, router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';


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
// import { router } from 'expo-router';

export default function AddOrder() {
    const {
      customer,
      CustomerPhone,
      product,
      quantity,
      price,
        } = useLocalSearchParams();
  const [driver, setDriver] = useState('');
//   const [customer, setCustomer] = useState('');
  const [inventory, setInventory] = useState('');

  //   const [CustomerPhone, setCustomerPhone] = useState('');
  const [driverPhone, setdriverPhone] = useState('');
//   const [product, setProduct] = useState('');
  const [number, setNumber] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');

  const handleSave = () => {
    if (!driver || !driverPhone || !number) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // TEMP: No database yet
    console.log({
      driver,
      driverPhone,
      number,
    //   product,
    //   quantity,
    //   price,
    });

    Alert.alert('Success', 'Order added successfully');

    router.replace('/(drawer)/dashboard'); // go back to dashboard
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => router.replace('/(drawer)/add-order/add-order1')}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Add Driver Details</Text>
        </View>
      
      <Text style={styles.label}>Driver Name</Text>
      <TextInput
        placeholder="Enter Driver full name"
        placeholderTextColor="#9ca3af"
        value={driver}
        onChangeText={setDriver}
        style={styles.input}
      />

      <Text style={styles.label}>Driver Phone Number</Text>
      <TextInput
        placeholder="Enter Driver's Phone Number"
        placeholderTextColor="#9ca3af"
        value={driverPhone}
        onChangeText={setdriverPhone}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Car Number</Text>
      <TextInput
        placeholder="Enter Car's Number Plate"
        placeholderTextColor="#9ca3af"
        value={number}
        onChangeText={setNumber}
        style={styles.input}
      />

      <Text style={styles.label}>Select Inventory</Text>

      <View style={styles.pickerWrapper}>
      <Picker
          selectedValue={inventory}
          onValueChange={(itemValue) => setInventory(itemValue)}
          style={{ color: '#000' }}        // ANDROID
          itemStyle={{ color: '#000' }}    // iOS

      >
          <Picker.Item label="Select your inventory" value="" />
          <Picker.Item label="Yangi Youl" value="yangi_youl" />
          <Picker.Item label="Flour Product" value="flour_product" />
          <Picker.Item label="Nabat" value="nabat" />
          <Picker.Item label="Granol" value="granol" />
      </Picker>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Order</Text>
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

pickerWrapper: {
  backgroundColor: '#f0f1ef',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  marginBottom: 12,
},
});
