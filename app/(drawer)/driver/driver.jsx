// import { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";

// import { Picker } from "@react-native-picker/picker";
// // import { collection, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
// import {
//   collection,
//   getDocs,
//   doc,
//   setDoc,
//   serverTimestamp,
//   runTransaction,
// } from "firebase/firestore";
// import { db } from "../../../firebase/config";
// import { router } from "expo-router";

// export default function AddDriver() {
//   const [driverId, setDriverId] = useState("");
//   const [driverName, setDriverName] = useState("");
//   const [driverPhone, setDriverPhone] = useState("");
//   const [carPlate, setCarPlate] = useState("");

//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   /* ---------------- GENERATE SEQUENTIAL DRIVER ID ---------------- */
//   const generateNextDriverId = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, "driver"));
//       const nextNumber = snapshot.size + 1;
//       const newId = "drv_" + String(nextNumber).padStart(4, "0");
//       setDriverId(newId);
//     } catch (error) {
//       console.error("Error generating driver ID:", error);
//     }
//   };

//   /* ---------------- FETCH CUSTOMERS + DRIVER ID ---------------- */
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "customers"));
//         const list = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCustomers(list);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };

//     fetchCustomers();
//     generateNextDriverId(); // generate ID on page load
//   }, []);

//   /* ---------------- ADD DRIVER ---------------- */
// const handleAddDriver = async () => {
//   if (!driverName || !driverPhone || !carPlate || !selectedCustomer) {
//     return Alert.alert("Error", "Please fill all fields");
//   }

//   try {
//     const counterRef = doc(db, "counters", "driver");

//     await runTransaction(db, async (transaction) => {
//       const counterSnap = await transaction.get(counterRef);

//       const current = counterSnap.exists() ? counterSnap.data().current : 0;
//       const next = current + 1;

//       const newDriverId = `drv_${String(next).padStart(4, "0")}`;
//       const driverRef = doc(db, "driver", newDriverId);

//       transaction.set(driverRef, {
//         name: driverName,
//         phone: driverPhone,
//         carPlate,
//         customerId: selectedCustomer,
//         createdAt: serverTimestamp(),
//       });

//       transaction.set(counterRef, { current: next }, { merge: true });
//     });

//     Alert.alert("Success", "Driver successfully added!", [
//       {
//         text: "OK",
//         onPress: () => router.replace("/dashboard"),
//       },
//     ]);

//   } catch (error) {
//     console.error(error);
//     Alert.alert("Error", "Failed to add driver");
//   }
// };


// return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.container}>

//         {/* BACK BUTTON */}
//         <TouchableOpacity onPress={() => router.replace('/(drawer)/dashboard')}>
//           <Text style={styles.backText}>← Back</Text>
//         </TouchableOpacity>

//         <Text style={styles.heading}>Add New Driver</Text>

//         {/* SHOW DRIVER ID BEFORE SAVING */}
//         <Text style={styles.driverIdText}>Driver ID: {driverId}</Text>

//         <Text style={styles.label}>Driver Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Driver Name"
//           value={driverName}
//           onChangeText={setDriverName}
//         />

//         <Text style={styles.label}>Driver Phone</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Driver Phone"
//           value={driverPhone}
//           onChangeText={setDriverPhone}
//           keyboardType="phone-pad"
//         />

//         <Text style={styles.label}>Car Plate Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Car Plate Number"
//           value={carPlate}
//           onChangeText={setCarPlate}
//         />

//         <Text style={styles.label}>Customer</Text>
//         <Picker
//           selectedValue={selectedCustomer}
//           onValueChange={setSelectedCustomer}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Customer" value={null} />
//           {customers.map(customer => (
//             <Picker.Item
//               key={customer.id}
//               label={`${customer.name} (${customer.id})`}
//               value={customer.id}
//             />
//           ))}
//         </Picker>

//         <TouchableOpacity style={styles.button} onPress={handleAddDriver}>
//           <Text style={styles.buttonText}>Add Driver</Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// /* ---------------- STYLES ---------------- */
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#f2f6ff",
//     justifyContent: "center",
//   },
//   backText: {
//     fontSize: 16,
//     color: "#4471ee",
//     marginBottom: 10,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#4471ee",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   driverIdText: {
//     marginBottom: 15,
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 6,
//     color: "#0b2243",
//   },
//   picker: {
//     backgroundColor: "#fff",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#4471ee",
//     padding: 15,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
