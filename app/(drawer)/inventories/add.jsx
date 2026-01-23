import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";

import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase/config";
import { router, useFocusEffect } from "expo-router";

export default function AddInventory() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [clerkName, setClerkName] = useState("");
  const [isActive, setIsActive] = useState(true);

  /* ---------- RESET + GENERATE CODE ON SCREEN FOCUS ---------- */
  useFocusEffect(
    useCallback(() => {
      setName("");
      setLocation("");
      setClerkName("");
      setIsActive(true);
      setCode("");

      const generateInventoryCode = async () => {
        try {
          // 1️⃣ Get counter document
          const counterRef = doc(db, "counters", "inventories");
          const counterSnap = await getDoc(counterRef);

          let nextNumber = 1;

          if (counterSnap.exists()) {
            const data = counterSnap.data();
            nextNumber = (data.lastNumber || 0) + 1;
          } else {
            // If counter does not exist, create it
            await setDoc(counterRef, { lastNumber: 0 });
          }

          // 2️⃣ Set inventory code
          setCode(`INV-${String(nextNumber).padStart(4, "0")}`);
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Failed to generate inventory code");
        }
      };

      generateInventoryCode();
    }, [])
  );

  /* ---------- SAVE INVENTORY ---------- */
  const saveInventory = async () => {
    if (!name || !code || !location) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      // 1️⃣ Get counter document again to ensure atomicity
      const counterRef = doc(db, "counters", "inventories");
      const counterSnap = await getDoc(counterRef);

      let nextNumber = 1;

      if (counterSnap.exists()) {
        const data = counterSnap.data();
        nextNumber = (data.lastNumber || 0) + 1;
      } else {
        await setDoc(counterRef, { lastNumber: 0 });
      }

      // 2️⃣ Save new inventory
      await addDoc(collection(db, "inventories"), {
        name,
        code,
        location,
        clerkName,
        isActive,
        createdAt: serverTimestamp(),
      });

      // 3️⃣ Update counter
      await setDoc(counterRef, { lastNumber: nextNumber });

      Alert.alert("Success", "Inventory added successfully");
      router.replace("/(drawer)/inventories");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add inventory");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Inventory</Text>

      <Text style={styles.label}>Inventory Code</Text>
      <TextInput
        value={code}
        editable={false} // 🔒 User cannot edit
        style={[styles.input, styles.disabled]}
      />

      <Text style={styles.label}>Inventory Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Enter inventory name"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={styles.input}
        placeholder="Enter location"
      />

      <Text style={styles.label}>Clerk Name</Text>
      <TextInput
        value={clerkName}
        onChangeText={setClerkName}
        style={styles.input}
        placeholder="Optional"
      />

      {/* ✅ ACTIVE / INACTIVE TOGGLE */}
      <View style={styles.switchRow}>
        <Text style={styles.label}>Status: {isActive ? "Active" : "Inactive"}</Text>
        <Switch
          value={isActive}
          onValueChange={setIsActive}
          trackColor={{ false: "#94a3b8", true: "#86efac" }}
          thumbColor={isActive ? "#16a34a" : "#64748b"}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={saveInventory}>
        <Text style={styles.saveText}>Save Inventory</Text>
      </TouchableOpacity>

      {/* ✅ BACK BUTTON */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/(drawer)/inventories")}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6ff",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4471ee",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  disabled: {
    backgroundColor: "#e5e7eb",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: "#4471ee",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backBtn: {
    backgroundColor: "#ee5844",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
