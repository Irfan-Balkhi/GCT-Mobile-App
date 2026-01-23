// app/(drawer)/orders/[id]/index.jsx
import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from "react-native";
import { useFocusEffect, router, useLocalSearchParams } from "expo-router";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function OrderDetail() {
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      } else {
        setOrder(null);
      }
    } catch (err) {
      console.error("Failed to fetch order:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrder();
    }, [id])
  );

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return timestamp;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Order",
      "Are you sure you want to delete this order?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "orders", id));
              Alert.alert("Deleted", "Order deleted successfully");
              router.replace("/(drawer)/orders");
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Failed to delete order");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4471ee" />
        <Text style={{ marginTop: 10 }}>Loading order details...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 20, fontSize: 16 }}>Order not found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/(drawer)/orders/list")}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.heading}>Order #{order.orderNumber || "-"}</Text>

      {/* DETAILS */}
      {[
        ["Created At", formatDate(order.createdAt)],
        ["Created By", order.createdBy],
        ["Customer ID", order.customerId],
        ["Customer Name", order.customerName],
        ["Inventory ID", order.inventoryId],
        ["Inventory Name", order.inventoryName],
        ["Product", order.product],
        ["Quantity", order.quantity],
        ["Unit", order.unit],
        ["Price", order.price],
        ["Total", order.total],
        ["Vehicle Plate", order.vehiclePlateNumber],
        ["Note", order.note],
        ["Status", order.status],
      ].map(([label, value], index) => (
        <View key={index} style={styles.detailCard}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value ?? "-"}</Text>
        </View>
      ))}

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => router.push(`/(drawer)/orders/${id}/edit`)}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backBtn} 
        onPress={() => router.replace("/(drawer)/orders")}>
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f6ff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4471ee",
    marginBottom: 20,
    textAlign: "center",
  },
  detailCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  label: { fontWeight: "600", color: "#1e3a8a", fontSize: 15 },
  value: { color: "#0f172a", fontSize: 15, flexShrink: 1, textAlign: "right" },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  editBtn: {
    flex: 1,
    backgroundColor: "#4471ee",
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#ee5844",
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  backBtn: {
    backgroundColor: "#475569",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
