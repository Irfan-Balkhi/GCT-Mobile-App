import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { router } from "expo-router";

export default function AddDriver() {
  const [driverCode, setDriverCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  /* ---------- FETCH CUSTOMERS + GENERATE DRIVER CODE ---------- */
  useEffect(() => {
    const init = async () => {
      try {
        // fetch customers
        const customerSnap = await getDocs(collection(db, "customers"));
        const customerList = customerSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerList);

        // generate driver code
        const driverSnap = await getDocs(collection(db, "drivers"));
        const nextNumber = driverSnap.size + 1;
        const code = `DRV-${String(nextNumber).padStart(3, "0")}`;
        setDriverCode(code);
      } catch (error) {
        console.log("Init error:", error);
      }
    };

    init();
  }, []);

  /* ---------- SAVE DRIVER ---------- */
  const saveDriver = async () => {
    if (!name || !phone || !selectedCustomer) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      await addDoc(collection(db, "drivers"), {
        driverCode,
        name,
        phone,
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        customerCode: selectedCustomer.customerCode,
        status: "active",
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Driver added successfully");
      router.replace("/(drawer)/drivers");
    } catch (error) {
      console.log("Save error:", error);
      Alert.alert("Error", "Failed to add driver");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Driver</Text>

      {/* DRIVER CODE (AUTO GENERATED) */}
      <Text style={styles.label}>Driver Code</Text>
      <TextInput
        style={[styles.input, styles.readOnly]}
        value={driverCode}
        editable={false}
      />

      {/* DRIVER NAME */}
      <Text style={styles.label}>Driver Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Driver name"
        value={name}
        onChangeText={setName}
      />

      {/* PHONE */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="07xxxxxxxx"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* CUSTOMER SELECT (CUSTOM PICKER) */}
      <Text style={styles.label}>Assign Customer</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setShowCustomerModal(true)}
      >
        <Text style={styles.selectText}>
          {selectedCustomer
            ? `${selectedCustomer.customerCode} - ${selectedCustomer.name}`
            : "Select Customer"}
        </Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={showCustomerModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <FlatList
              data={customers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCustomer(item);
                    setShowCustomerModal(false);
                  }}
                >
                  <Text style={styles.modalText}>
                    {item.customerCode} - {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* SAVE */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveDriver}>
        <Text style={styles.btnText}>Save Driver</Text>
      </TouchableOpacity>

      {/* BACK (TO DRIVER INDEX ONLY) */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/(drawer)/drivers")}
      >
        <Text style={styles.btnText}>Back</Text>
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

  readOnly: {
    backgroundColor: "#e5edff",
    color: "#475569",
  },

  selectBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7d2fe",
    padding: 12,
    marginBottom: 20,
  },

  selectText: {
    color: "#0f172a",
    fontWeight: "500",
  },

  saveBtn: {
    backgroundColor: "#4471ee",
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

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: "70%",
  },

  modalItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  modalText: {
    fontSize: 15,
    color: "#0f172a",
  },
});
