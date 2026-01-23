// app/(drawer)/orders/list.jsx
import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { router, useFocusEffect } from "expo-router";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH ALL ORDERS ---------- */
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "orders")); // fetch all orders
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(list);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- AUTO REFRESH WHEN SCREEN FOCUSED ---------- */
  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  /* ---------- ROW ---------- */
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => router.push(`/(drawer)/orders/${item.id}`)}
    >
      <Text style={[styles.cell, styles.no]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.code]} numberOfLines={1} ellipsizeMode="tail">
        {item.orderNumber || "-"}
      </Text>
      <Text style={[styles.cell, styles.name]} numberOfLines={1} ellipsizeMode="tail">
        {item.customerName || "No Customer"}
      </Text>
      <Text style={[styles.cell, styles.product]} numberOfLines={1} ellipsizeMode="tail">
        {item.product || "No Product"}
      </Text>
      {/* <Text style={[styles.cell, styles.total]}>{item.total || 0}</Text> */}
      {/* <Text style={[styles.cell, styles.status]}>{item.status || "-"}</Text> */}
    </TouchableOpacity>
  );

  /* ---------- LOADING OR EMPTY STATES ---------- */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No orders found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.heading}>Orders</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/(drawer)/orders/add")}
        >
          <Text style={styles.addText}>+ Add Order</Text>
        </TouchableOpacity>
      </View>

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.no]}>#</Text>
        <Text style={[styles.headerCell, styles.code]}>Order #</Text>
        <Text style={[styles.headerCell, styles.name]}>Customer</Text>
        <Text style={[styles.headerCell, styles.product]}>Product</Text>
        {/* <Text style={[styles.headerCell, styles.total]}>Total</Text> */}
        {/* <Text style={[styles.headerCell, styles.status]}>Status</Text> */}
      </View>

      {/* TABLE BODY */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.push("/(drawer)/dashboard")}
      >
        <Text style={styles.addText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6ff",
    padding: 12,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4471ee",
  },
  addBtn: {
    backgroundColor: "#4471ee",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  backBtn: {
    backgroundColor: "#ee5844",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* TABLE HEADER */
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e5edff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  headerCell: {
    fontWeight: "700",
    fontSize: 13,
    color: "#1e3a8a",
  },

  /* ROW */
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
  },
  cell: {
    fontSize: 13,
    color: "#0f172a",
  },
  no: { width: 32, textAlign: "center" },
  code: { width: 80, color: "#475569" },
  name: { flex: 1, fontWeight: "600", paddingHorizontal: 6 },
  product: { width: 120, color: "#475569" },
  total: { width: 60, textAlign: "right", color: "#475569" },
  status: { width: 90, color: "#475569" },
});
