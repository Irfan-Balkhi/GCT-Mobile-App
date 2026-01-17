import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useLocalSearchParams, router } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";


export default function CustomerDetails() {
  const { id } = useLocalSearchParams();
  const [customer, setCustomer] = useState(null);

  // useEffect(() => {
  //   const fetchCustomer = async () => {
  //     const snap = await getDoc(doc(db, "customers", id));
  //     if (snap.exists()) {
  //       setCustomer(snap.data());
  //     }
  //   };
  //   fetchCustomer();
  // }, [id]);
useFocusEffect(
  useCallback(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      const snap = await getDoc(doc(db, "customers", id));
      if (snap.exists()) {
        setCustomer(snap.data());
      }
    };

    fetchCustomer();
  }, [id])
);


const handleDelete = () => {
  Alert.alert(
    "Delete Customer",
    "Are you sure you want to delete this customer?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "customers", id));

            Alert.alert("Deleted", "Customer deleted successfully");
            router.replace("/(drawer)/customers");
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to delete customer");
          }
        },
      },
    ]
  );
};
  if (!customer) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/(drawer)/customers')}>
             <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
      <Text style={styles.title}>Customer Details</Text>


      <View style={styles.card}>
        <Text style={styles.label}>Customer ID</Text>
        <Text style={styles.value}>{id}</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{customer.name}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{customer.phone}</Text>

        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>
          {customer.createdAt?.toDate().toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => router.push(`/(drawer)/customers/${id}/edit`)}
        >
        <Text style={styles.btnText}>Edit Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.btnText}>Delete Customer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6ff",
    padding: 20,
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
    fontSize: 13,
    color: "#64748b",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  editBtn: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
