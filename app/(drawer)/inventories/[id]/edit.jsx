import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { useState, useCallback } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function EditInventory() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [clerkName, setClerkName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------- FETCH ON FOCUS ---------- */
  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      setLoading(true);
      fetchInventory();
    }, [id])
  );

  /* ---------- FETCH INVENTORY ---------- */
  const fetchInventory = async () => {
    try {
      const ref = doc(db, "inventories", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        Alert.alert("Error", "Inventory not found");
        router.back();
        return;
      }

      const data = snap.data();
      setName(data.name || "");
      setCode(data.code || "");
      setLocation(data.location || "");
      setClerkName(data.clerkName || "");
      setIsActive(data.isActive ?? true);
    } catch (error) {
      Alert.alert("Error", "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- SAVE ---------- */
  const handleSave = async () => {
    if (!name) {
      Alert.alert("Validation", "Inventory name is required");
      return;
    }

    try {
      setSaving(true);

      await updateDoc(doc(db, "inventories", id), {
        name,
        location,
        clerkName,
        isActive,
        updatedAt: serverTimestamp(),
      });

      Alert.alert("Success", "Inventory updated");
      router.replace("/(drawer)/inventories");
    } catch (error) {
      Alert.alert("Error", "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading inventory...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Inventory</Text>

      {/* 🔒 CODE (READ ONLY) */}
      <Text style={styles.label}>Inventory Code</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={code}
        editable={false}
        selectTextOnFocus={false}
      />

      <Text style={styles.label}>Inventory Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Clerk Name</Text>
      <TextInput
        style={styles.input}
        value={clerkName}
        onChangeText={setClerkName}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Active Status</Text>
        <Switch value={isActive} onValueChange={setIsActive} />
      </View>

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.btnText}>
          {saving ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/(drawer)/inventories")}
      >
        <Text style={styles.btnText}>Back</Text>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4471ee",
    marginBottom: 20,
    alignSelf: "center",
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  disabledInput: {
    backgroundColor: "#e5e7eb",
    color: "#6b7280",
  },
  switchRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveBtn: {
    marginTop: 30,
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 6,
  },
  backBtn: {
    marginTop: 10,
    backgroundColor: "#6b7280",
    padding: 12,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
