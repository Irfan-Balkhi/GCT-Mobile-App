import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Switch,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { createEmployee } from "../../../firebase/users";

export default function AddUser() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  /* -------- RESET FORM -------- */
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [])
  );

  /* -------- CREATE USER -------- */
  const handleCreate = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing fields", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createEmployee({
        name,
        email,
        password,
        active: true,
        isAdmin, // 👈 THIS IS THE KEY
        createdAt: new Date(),
      });

      Alert.alert("Success", "User created successfully");
      resetForm();
      router.back();
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(drawer)/users")}>
          <FontAwesome5 name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add User</Text>
        <View style={{ width: 18 }} />
      </View>

      {/* Form */}
      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Kamal Ahmad"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="user@paimanltd.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Temporary Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* ADMIN SWITCH */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Make this user Admin</Text>
          <Switch
            value={isAdmin}
            onValueChange={setIsAdmin}
            trackColor={{ false: "#e5e7eb", true: "#86efac" }}
            thumbColor={isAdmin ? "#16a34a" : "#9ca3af"}
          />
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <FontAwesome5 name="user-plus" size={14} color="#fff" />
              <Text style={styles.submitText}>Create User</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -------- STYLES -------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },

  header: {
    backgroundColor: "#1e293b",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },

  label: { fontWeight: "600", marginTop: 12, marginBottom: 6 },

  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  switchLabel: {
    fontWeight: "600",
    color: "#0f172a",
  },

  submitBtn: {
    marginTop: 24,
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
  },

  submitText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
});
