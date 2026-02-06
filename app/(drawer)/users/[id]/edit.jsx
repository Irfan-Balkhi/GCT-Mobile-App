import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Switch,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function EditUser() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadUser = async () => {
      try {
        const userRef = doc(db, "users", id);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setIsAdmin(!!data.isAdmin);
        }
      } catch (error) {
        console.log("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const save = async () => {
    try {
      const userRef = doc(db, "users", id);

      await updateDoc(userRef, {
        name,
        email,
        phone,
        isAdmin,
      });

      Alert.alert("Success", "User updated successfully");
      router.replace(`/users/${id}`);
    } catch (error) {
      Alert.alert("Error", "Failed to update user");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        editable={false}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

      {/* ===== Admin Switch ===== */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>This User is Admin???</Text>
        <Switch
          value={isAdmin}
          onValueChange={setIsAdmin}
          trackColor={{ false: "#e5e7eb", true: "#86efac" }}
          thumbColor={isAdmin ? "#16a34a" : "#9ca3af"}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelbtn} 
        onPress={() => router.replace(`/users/${id}`)}>
        <Text style={styles.btnText}>Cancel Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f1f5f9",
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#0f172a",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  switchLabel: {
    fontWeight: "600",
    color: "#0f172a",
  },
  btn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelbtn: {
    backgroundColor: "#5a5c62",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",  
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
