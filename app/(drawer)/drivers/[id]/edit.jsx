import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { Picker } from "@react-native-picker/picker";

export default function EditDriver() {
  const { id } = useLocalSearchParams();
  const driverId = Array.isArray(id) ? id[0] : id;

  const [driverCode, setDriverCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- LOAD DRIVER + CUSTOMERS (CUSTOMER STYLE) ---------- */
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadData = async () => {
        if (!driverId) return;

        setLoading(true);

        try {
          // Fetch driver
          const driverSnap = await getDoc(doc(db, "drivers", driverId));

          if (!isActive) return;

          if (driverSnap.exists()) {
            const data = driverSnap.data();
            setDriverCode(data.driverCode || "");
            setName(data.name || "");
            setPhone(data.phone || "");
            setSelectedCustomer({
              id: data.customerId,
              name: data.customerName,
              customerCode: data.customerCode,
            });
          } else {
            Alert.alert("Error", "Driver not found");
            router.back();
            return;
          }

          // Fetch customers
          const customerSnap = await getDocs(collection(db, "customers"));

          if (!isActive) return;

          const list = customerSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCustomers(list);
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Failed to load data");
        } finally {
          if (isActive) setLoading(false);
        }
      };

      loadData();

      return () => {
        isActive = false;
      };
    }, [driverId])
  );

  /* ---------- UPDATE DRIVER ---------- */
  const updateDriver = async () => {
    if (!name || !phone || !selectedCustomer) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      await updateDoc(doc(db, "drivers", driverId), {
        name,
        phone,
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        customerCode: selectedCustomer.customerCode,
      });

      Alert.alert("Success", "Driver updated successfully");
      router.replace(`/(drawer)/drivers`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update driver");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4471ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Driver</Text>

      {/* DRIVER CODE */}
      <Text style={styles.label}>Driver Code</Text>
      <TextInput
        style={[styles.input, styles.disabled]}
        value={driverCode}
        editable={false}
      />

      {/* NAME */}
      <Text style={styles.label}>Driver Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      {/* PHONE */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />

      {/* CUSTOMER PICKER */}
      <Text style={styles.label}>Assign Customer</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCustomer?.id}
          onValueChange={(value) => {
            const customer = customers.find((c) => c.id === value);
            setSelectedCustomer(customer);
          }}
          dropdownIconColor="#4471ee"
        >
          {customers.map((c) => (
            <Picker.Item
              key={c.id}
              label={`${c.customerCode} - ${c.name}`}
              value={c.id}
              color="#000"
            />
          ))}
        </Picker>
      </View>

      {/* UPDATE */}
      <TouchableOpacity style={styles.saveBtn} onPress={updateDriver}>
        <Text style={styles.saveText}>Update</Text>
      </TouchableOpacity>

      {/* BACK */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace(`/(drawer)/drivers/${driverId}`)}
      >
        <Text style={styles.saveText}>Back</Text>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4471ee",
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#1e293b",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  disabled: {
    backgroundColor: "#e5e7eb",
    color: "#6b7280",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7d2fe",
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: "#0ac700",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  backBtn: {
    backgroundColor: "#ee5844",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
