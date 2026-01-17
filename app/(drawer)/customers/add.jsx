// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";

// import {
//   collection,
//   getDocs,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// import { db } from "../../../firebase/config";
// import { router } from "expo-router";

// export default function AddCustomer() {
//   const [customerCode, setCustomerCode] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Generate readable customer code
//   const generateCustomerCode = async () => {
//     const snap = await getDocs(collection(db, "customers"));
//     const next = snap.size + 1;
//     setCustomerCode(`CUST-${String(next).padStart(4, "0")}`);
//   };

//   useEffect(() => {
//     generateCustomerCode();
//   }, []);

//   const handleAddCustomer = async () => {
//     if (!name || !phone) {
//       return Alert.alert("Error", "All fields are required");
//     }

//     try {
//       setLoading(true);

//       await addDoc(collection(db, "customers"), {
//         customerCode,
//         name,
//         phone,
//         createdAt: serverTimestamp(),
//       });

//       Alert.alert("Success", "Customer added successfully", [
//         {
//           text: "OK",
//           onPress: () => router.replace("/(drawer)/customers"),
//         },
//       ]);
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Failed to add customer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.heading}>Add New Customer</Text>

//         <View style={styles.card}>
//           <Text style={styles.codeLabel}>Customer Code</Text>
//           <Text style={styles.codeValue}>{customerCode}</Text>
//         </View>

//         <TextInput
//           style={styles.input}
//           placeholder="Customer Name"
//           value={name}
//           onChangeText={setName}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//         />

//         <TouchableOpacity
//           style={[styles.button, loading && { opacity: 0.6 }]}
//           onPress={handleAddCustomer}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? "Saving..." : "Add Customer"}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }


import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase/config";
import { router, useFocusEffect } from "expo-router";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customerCode, setCustomerCode] = useState("");

  /* ---------- GENERATE CUSTOMER CODE ---------- */
  const generateCustomerCode = async () => {
    const snapshot = await getDocs(collection(db, "customers"));
    const count = snapshot.size + 1;

    const code = `CUST-${String(count).padStart(4, "0")}`;
    setCustomerCode(code);
  };

  /* ---------- RESET FORM ON SCREEN OPEN ---------- */
  useFocusEffect(
    useCallback(() => {
      setName("");
      setPhone("");
      generateCustomerCode();
    }, [])
  );

  /* ---------- SAVE CUSTOMER ---------- */
  const saveCustomer = async () => {
    if (!name || !phone) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "customers"), {
        customerCode,
        name,
        phone,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Customer added successfully");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Customer</Text>

      <Text style={styles.label}>Customer Code</Text>
      <TextInput
        value={customerCode}
        editable={false}
        style={[styles.input, styles.disabled]}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Customer Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveCustomer}>
        <Text style={styles.saveText}>Save Customer</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6ff",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4471ee",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#334155",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  disabled: {
    backgroundColor: "#e5e7eb",
  },
  saveBtn: {
    backgroundColor: "#4471ee",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
