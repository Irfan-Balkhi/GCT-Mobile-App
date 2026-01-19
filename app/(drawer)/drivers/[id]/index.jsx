import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function DriverDetails() {
  const { id } = useLocalSearchParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriver();
  }, []);

  const fetchDriver = async () => {
    try {
      const ref = doc(db, "drivers", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setDriver({ id: snap.id, ...snap.data() });
      } else {
        Alert.alert("Error", "Driver not found");
        router.back();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load driver");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
  Alert.alert(
    "Delete Driver",
    "Are you sure you want to delete this driver?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "drivers", id));

            Alert.alert("Deleted", "Driver deleted successfully");
            router.replace("/(drawer)/drivers");
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to delete driver");
          }
        },
      },
    ]
  );
};

  if (loading) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/(drawer)/drivers')}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Driver Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{driver.name}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{driver.phone}</Text>

        <Text style={styles.label}>Customer Name</Text>
        <Text style={styles.value}>{driver.customerName}</Text>

        <Text style={styles.label}>Customer Code</Text>
        <Text style={styles.value}>{driver.customerCode}</Text>
      </View>
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => router.push(`/(drawer)/drivers/${id}/edit`)}
      >
        <Text style={styles.btnText}>Edit Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.btnText}>Delete Driver</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loading: {
    textAlign: "center",
    marginTop: 50,
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
