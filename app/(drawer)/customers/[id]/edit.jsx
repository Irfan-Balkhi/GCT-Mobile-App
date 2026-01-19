import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
// import { useLocalSearchParams, router } from "expo-router";
import { useFocusEffect, useLocalSearchParams, router } from "expo-router";



export default function EditCustomer() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadCustomer = async () => {
        if (!id) return;

        setLoading(true);

        try {
          const snap = await getDoc(doc(db, "customers", id));

          if (!isActive) return;

          if (snap.exists()) {
            const data = snap.data();
            setName(data.name || "");
            setPhone(data.phone || "");
          } else {
            Alert.alert("Error", "Customer not found");
            router.back();
          }
        } catch (err) {
          console.error(err);
          Alert.alert("Error", "Failed to load customer");
        } finally {
          if (isActive) setLoading(false);
        }
      };

      loadCustomer();

      return () => {
        isActive = false;
      };
    }, [id])
  );

  const handleUpdate = async () => {
    if (!name || !phone) {
      return Alert.alert("Error", "All fields required");
    }

    try {
      await updateDoc(doc(db, "customers", id), {
        name,
        phone,
      });

      Alert.alert("Success", "Customer updated");
        router.replace("/(drawer)/customers");  
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Update failed");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4471ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Customer</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Customer Name"
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Customer</Text>
      </TouchableOpacity>
      {/* BACK */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/(drawer)/customers")}
      >
        <Text style={styles.saveText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f6ff",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4471ee",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0ac700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  backBtn: {
    backgroundColor: "#ee5844",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
