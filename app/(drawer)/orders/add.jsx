import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";

import { router, useFocusEffect } from "expo-router";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

/* STATIC DATA */
const PRODUCTS = [
  { id: "wheat", name: "Wheat" },
  { id: "flour", name: "Flour" },
  { id: "adkhod", name: "Adkhod" },
  { id: "kepak", name: "Kepak" },
  { id: "nabat", name: "Nabat" },
  { id: "granol", name: "Granol" },
];

const UNITS = [
  { id: "kg", name: "Kg" },
  { id: "ton", name: "Ton" },
  { id: "bag", name: "Bag" },
  { id: "box", name: "Box" },
];

export default function AddOrder() {
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [note, setNote] = useState("");

  const [orderNumber, setOrderNumber] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [onSelectCallback, setOnSelectCallback] = useState(null);

  const resetForm = () => {
  setSelectedCustomer(null);
  setSelectedInventory(null);
  setSelectedProduct(null);
  setSelectedUnit(null);

  setQuantity("");
  setPrice("");
  setVehiclePlate("");
  setNote("");

  setSearchText("");
  setModalVisible(false);
};

  /* 🔁 REFRESH WHEN SCREEN IS FOCUSED */
  useFocusEffect(
    useCallback(() => {
      resetForm();
      fetchCustomers();
      fetchInventory();
      generateOrderNumber();
    }, [])
  );

  /* FETCH DATA */
  const fetchCustomers = async () => {
    const snapshot = await getDocs(collection(db, "customers"));
    setCustomers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchInventory = async () => {
    const snapshot = await getDocs(collection(db, "inventories"));
    setInventory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  /* 🆔 GENERATE ORDER NUMBER LIKE INVENTORY CODE */
  const generateOrderNumber = async () => {
    try {
      const counterRef = doc(db, "counters", "orders");
      const counterSnap = await getDoc(counterRef);

      let nextNumber = 1;

      if (counterSnap.exists()) {
        const data = counterSnap.data();
        nextNumber = (data.lastNumber || 0) + 1;
      } else {
        // create counter if not exists
        await setDoc(counterRef, { lastNumber: 0 });
      }

      const newOrderCode = `ORD-${String(nextNumber).padStart(4, "0")}`;
      setOrderNumber(newOrderCode);

      return newOrderCode;
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to generate order number");
    }
  };

  /* OPEN PICKER */
  const openPicker = (title, data, onSelect) => {
    setModalTitle(title);
    setModalData(data);
    setSearchText("");
    setOnSelectCallback(() => onSelect);
    setModalVisible(true);
  };

  const handleSelect = (item) => {
    onSelectCallback(item);
    setModalVisible(false);
  };

  /* SAVE ORDER */
  const saveOrder = async () => {
    if (
      !selectedCustomer ||
      !selectedInventory ||
      !selectedProduct ||
      !selectedUnit ||
      !quantity ||
      !price ||
      !vehiclePlate
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const total = Number(quantity) * Number(price);

    // generate order number safely
    const newOrderNumber = await generateOrderNumber();

    try {
      // Save order
      await addDoc(collection(db, "orders"), {
        orderNumber: newOrderNumber,

        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,

        inventoryId: selectedInventory.id,
        inventoryName: selectedInventory.name,

        product: selectedProduct.name,
        unit: selectedUnit.name,
        quantity: Number(quantity),
        price: Number(price),
        total,

        vehiclePlateNumber: vehiclePlate,
        note: note || "",

        createdBy: "admin",
        createdAt: serverTimestamp(),
      });

      // Update counter
      const counterRef = doc(db, "counters", "orders");
      await setDoc(counterRef, { lastNumber: Number(newOrderNumber.split("-")[1]) });

      Alert.alert("Success", `Order ${newOrderNumber} added`);
      resetForm();
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save order");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Order</Text>

      {/* ORDER NUMBER */}
      <View style={styles.orderBox}>
        <Text style={styles.orderLabel}>Order No</Text>
        <Text style={styles.orderNumber}>{orderNumber}</Text>
      </View>

      {/* CUSTOMER */}
      <Text style={styles.label}>Customer</Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => openPicker("Select Customer", customers, setSelectedCustomer)}
      >
        <Text>{selectedCustomer?.name || "Select Customer"}</Text>
      </TouchableOpacity>

      {/* PRODUCT */}
      <Text style={styles.label}>Product</Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => openPicker("Select Product", PRODUCTS, setSelectedProduct)}
      >
        <Text>{selectedProduct?.name || "Select Product"}</Text>
      </TouchableOpacity>

      {/* UNIT */}
      <Text style={styles.label}>Unit</Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => openPicker("Select Unit", UNITS, setSelectedUnit)}
      >
        <Text>{selectedUnit?.name || "Select Unit"}</Text>
      </TouchableOpacity>

      {/* QUANTITY */}
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      {/* PRICE */}
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* INVENTORY */}
      <Text style={styles.label}>Inventory</Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => openPicker("Select Inventory", inventory, setSelectedInventory)}
      >
        <Text>{selectedInventory?.name || "Select Inventory"}</Text>
      </TouchableOpacity>

      {/* VEHICLE */}
      <Text style={styles.label}>Car Number Plate</Text>
      <TextInput
        style={styles.input}
        value={vehiclePlate}
        onChangeText={setVehiclePlate}
      />

      {/* NOTE */}
      <Text style={styles.label}>Note</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={note}
        onChangeText={setNote}
      />

      <Text style={styles.total}>
        Total: {quantity && price ? Number(quantity) * Number(price) : 0}
      </Text>

      <TouchableOpacity style={styles.button} onPress={saveOrder}>
        <Text style={styles.buttonText}>Save Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <TextInput
            style={styles.modalSearch}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={modalData.filter(item =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            )}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleSelect(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f5f6fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },

  orderBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0984e3",
    marginBottom: 10,
  },

  orderLabel: { fontSize: 12, color: "#636e72" },
  orderNumber: { fontSize: 18, fontWeight: "bold", color: "#0984e3" },

  label: { marginTop: 12, fontWeight: "600" },
  picker: { borderWidth: 1, borderColor: "#dcdde1", padding: 14, borderRadius: 12, backgroundColor: "#fff", marginTop: 6 },
  input: { borderWidth: 1, borderColor: "#dcdde1", padding: 14, borderRadius: 12, backgroundColor: "#fff", marginTop: 6 },

  total: { fontSize: 20, fontWeight: "bold", marginVertical: 16 },

  button: { backgroundColor: "#0984e3", padding: 16, borderRadius: 14, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  backButton: { marginTop: 12, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: "#0984e3", alignItems: "center", marginBottom: 30 },
  backText: { color: "#0984e3", fontWeight: "bold", fontSize: 16 },

  modalContainer: { flex: 1, padding: 20 },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  modalSearch: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 12, marginBottom: 10 },
  modalItem: { padding: 15, backgroundColor: "#fff", borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: "#eee" },
  modalClose: { backgroundColor: "#0984e3", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 10 },
});
