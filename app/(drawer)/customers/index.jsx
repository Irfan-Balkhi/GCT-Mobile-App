import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";

// import { collection, getDocs } from "firebase/firestore";
import { collection, doc, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { router, useFocusEffect } from "expo-router";

export default function CustomersIndex() {
  const [customers, setCustomers] = useState([]);

  /* ---------- FETCH CUSTOMERS ---------- */
  const fetchCustomers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "customers"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(list);
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------- AUTO REFRESH WHEN SCREEN FOCUSED ---------- */
  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [])
  );

  /* ---------- ROW ---------- */
  const renderItem = ({ item, index }) => (
  <TouchableOpacity
    style={styles.row}
    onPress={() =>
      router.push(`/(drawer)/customers/${item.id}`)
    }
  >
    <Text style={[styles.cell, styles.no]}>{index + 1}</Text>

    {/* <Text
      style={[styles.cell, styles.id]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {item.id}
    </Text> */}

    <Text
      style={[styles.cell, styles.id]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {item.customerCode}
    </Text>
    <Text style={[styles.cell, styles.name]}>{item.name}</Text>
    <Text style={[styles.cell, styles.phone]}>{item.phone}</Text>
  </TouchableOpacity>
);



  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.heading}>Customers</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/(drawer)/customers/add")}
        >
          <Text style={styles.addText}>+ Add Customer</Text>
        </TouchableOpacity>
      </View>

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.no]}>#</Text>
        <Text style={[styles.headerCell, styles.id]}>Customer Code</Text>
        <Text style={[styles.headerCell, styles.name]}>Name</Text>
        <Text style={[styles.headerCell, styles.phone]}>Phone</Text>
      </View>

      {/* TABLE BODY */}
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <TouchableOpacity
          style={styles.addBtn2}
          onPress={() => router.push('/(drawer)/dashboard')}
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

  addBtn2: {
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

  /* TABLE */
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

  no: {
    width: 32,
    textAlign: "center",
  },
  id: {
    width: 95,
    color: "#475569",
  },
  name: {
    flex: 1,
    fontWeight: "600",
    paddingHorizontal: 6,
  },
  phone: {
    width: 100,
    color: "#475569",
  },
});
