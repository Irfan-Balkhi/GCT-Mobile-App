import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!id) return;

      let isActive = true;

      const loadUser = async () => {
        try {
          setLoading(true);
          const userRef = doc(db, "users", id);
          const snap = await getDoc(userRef);

          if (snap.exists() && isActive) {
            setUser(snap.data());
          }
        } catch (error) {
          console.log("Failed to load user:", error);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      loadUser();

      return () => {
        isActive = false;
      };
    }, [id])
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (!user) {
    return (
      <Text style={{ marginTop: 40, textAlign: "center" }}>
        User not found
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* ===== Header ===== */}
        <View style={styles.header}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </View>

        {/* ===== Details ===== */}
        <View style={styles.details}>
          <Detail label="Full Name" value={user.name} />
          <Detail label="Email" value={user.email} />
          <Detail label="Phone" value={user.phone || "N/A"} />
          <Detail label="Active" value={user.active ? "Yes" : "No"} />
          <Detail label="CreatedAt" value={user.createdAt?.toDate().toLocaleDateString() || "N/A"} />
          <Detail label="isAdmin" value={user.isAdmin ? "Yes" : "No"} />
        </View>

        {/* ===== Actions ===== */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push(`/(drawer)/users/${id}/edit`)}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}>
            <MaterialIcons name="lock-outline" size={20} color="#fff" />
            <Text style={styles.btnText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.danger]}>
            <FontAwesome5 name="times-circle" size={18} color="#fff" />
            <Text style={styles.btnText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* ===== Small reusable row ===== */
function Detail({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },

  header: {
    backgroundColor: "#1e293b",
    alignItems: "center",
    padding: 24,
  },
  name: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  role: { color: "#cbd5e1", marginTop: 4 },

  details: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 14,
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: { color: "#475569" },
  detailValue: {
    color: "#0f172a",
    fontWeight: "600",
  },

  actions: { padding: 16, marginTop: 10 },
  btn: {
    backgroundColor: "#064276",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  danger: { backgroundColor: "#b91c1c" },
  btnText: { color: "#fff", fontWeight: "600" },
});
