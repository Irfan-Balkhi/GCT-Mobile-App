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
  ActivityIndicator,
} from "react-native";

import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../firebase/config";

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

export default function EditOrder() {
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  /* MODAL */
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [onSelectCallback, setOnSelectCallback] = useState(null);

  /* 🔁 FETCH EVERYTHING ON FOCUS */
  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      fetchCustomers();
      fetchInventory();
      fetchOrder();
    }, [id])
  );

  /* FETCH CUSTOMERS */
  const fetchCustomers = async () => {
    const snap = await getDocs(collection(db, "customers"));
    setCustomers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  /* FETCH INVENTORY */
  const fetchInventory = async () => {
    const snap = await getDocs(collection(db, "inventories"));
    setInventory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  /* FETCH ORDER */
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "orders", id));
      if (!snap.exists()) {
        Alert.alert("Error", "Order not found");
        router.back();
        return;
      }

      const data = snap.data();

      setOrderNumber(data.orderNumber || "");
      setQuantity(String(data.quantity || ""));
      setPrice(String(data.price || ""));
      setVehiclePlate(data.vehiclePlateNumber || "");
      setNote(data.note || "");

      setSelectedCustomer({
        id: data.customerId,
        name: data.customerName,
      });

      setSelectedInventory({
        id: data.inventoryId,
        name: data.inventoryName,
      });

      setSelectedProduct({ name: data.product });
      setSelectedUnit({ name: data.unit });
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to load order");
    } finally {
      setLoading(false);
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

  /* UPDATE ORDER */
  const updateOrder = async () => {
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

    try {
      setSaving(true);

      await updateDoc(doc(db, "orders", id), {
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
        note,

        updatedAt: serverTimestamp(),
      });

      Alert.alert("Success", "Order updated successfully");
      router.replace(`/(drawer)/orders/${id}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0984e3" />
        <Text style={{ marginTop: 10 }}>Loading order...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Order</Text>

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

      <TouchableOpacity style={styles.button} onPress={updateOrder} disabled={saving}>
        <Text style={styles.buttonText}>
          {saving ? "Saving..." : "Update Order"}
        </Text>
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
