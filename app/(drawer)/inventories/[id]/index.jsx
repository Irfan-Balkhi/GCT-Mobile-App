import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useState, useCallback } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function InventoryDetails() {
  const { id } = useLocalSearchParams();
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH ON SCREEN FOCUS ---------- */
  useFocusEffect(
    useCallback(() => {
      if (!id) return;

      setLoading(true);
      setInventory(null);

      fetchInventory();
    }, [id])
  );

  /* ---------- FETCH INVENTORY ---------- */
  const fetchInventory = async () => {
    try {
      const ref = doc(db, "inventories", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setInventory({ id: snap.id, ...snap.data() });
      } else {
        Alert.alert("Error", "Inventory not found");
        router.back();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE INVENTORY ---------- */
  const handleDelete = () => {
    Alert.alert(
      "Delete Inventory",
      "Are you sure you want to delete this inventory?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "inventories", id));
              Alert.alert("Deleted", "Inventory deleted successfully");
              router.replace("/(drawer)/inventories");
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Failed to delete inventory");
            }
          },
        },
      ]
    );
  };

  /* ---------- FORMAT DATE ---------- */
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  /* ---------- LOADING / SAFE GUARD ---------- */
  if (loading || !inventory) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading inventory...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/(drawer)/inventories")}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Inventory Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Inventory Code</Text>
        <Text style={styles.value}>{inventory.code}</Text>

        <Text style={styles.label}>Inventory Name</Text>
        <Text style={styles.value}>{inventory.name}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{inventory.location}</Text>

        <Text style={styles.label}>Clerk Name</Text>
        <Text style={styles.value}>
          {inventory.clerkName || "Not Assigned"}
        </Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>
          {inventory.isActive ? "Active" : "Inactive"}
        </Text>

        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>
          {formatDate(inventory.createdAt)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => router.push(`/(drawer)/inventories/${id}/edit`)}
      >
        <Text style={styles.btnText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 16,
    color: "#6b7280",
  },
  backText: {
    color: "#4471ee",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4471ee",
    marginBottom: 15,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  editBtn: {
    marginTop: 30,
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 6,
  },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
