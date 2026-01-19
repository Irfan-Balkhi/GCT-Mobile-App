import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { router, useFocusEffect } from "expo-router";

export default function DriversIndex() {
  const [drivers, setDrivers] = useState([]);

  /* ---------- FETCH DRIVERS ---------- */
  const fetchDrivers = async () => {
    try {
      const q = query(
        collection(db, "drivers"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDrivers(list);
    } catch (error) {
      console.log("Error fetching drivers:", error);
    }
  };

  /* ---------- RELOAD WHEN SCREEN IS FOCUSED ---------- */
  useFocusEffect(
    useCallback(() => {
      fetchDrivers();
    }, [])
  );

  /* ---------- DRIVER ROW ---------- */
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => router.push(`/(drawer)/drivers/${item.id}`)}
    >
      <Text style={[styles.cell, styles.no]}>{index + 1}</Text>

      <Text style={[styles.cell, styles.code]}>
        {item.driverCode || "-"}
      </Text>

      <Text style={[styles.cell, styles.name]}>
        {item.name}
      </Text>

      <Text style={[styles.cell, styles.customer]}>
        {item.customerName || "-"}
      </Text>

      <Text style={[styles.cell, styles.phone]}>
        {item.phone}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.heading}>Drivers</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/(drawer)/drivers/add")}
        >
          <Text style={styles.addText}>+ Add Driver</Text>
        </TouchableOpacity>
      </View>

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.no]}>#</Text>
        <Text style={[styles.headerCell, styles.code]}>Code</Text>
        <Text style={[styles.headerCell, styles.name]}>Name</Text>
        <Text style={[styles.headerCell, styles.customer]}>Customer</Text>
        <Text style={[styles.headerCell, styles.phone]}>Phone</Text>
      </View>

      {/* DRIVER LIST */}
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* BACK TO DASHBOARD */}
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
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
  },

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

  no: { width: 30, textAlign: "center" },
  code: { width: 90 },
  name: { flex: 1, fontWeight: "600" },
  customer: { width: 110, color: "#475569" },
  phone: { width: 100, color: "#475569" },
});
