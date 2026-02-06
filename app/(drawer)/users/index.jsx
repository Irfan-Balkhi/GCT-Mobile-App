import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { getAllUsers } from "../../../firebase/users";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search, users]);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setFiltered(data);
    } catch (e) {
      console.error("Failed to load users", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (!text) {
      setFiltered(users);
      return;
    }
    const lower = text.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          u.name?.toLowerCase().includes(lower) ||
          u.email?.toLowerCase().includes(lower)
      )
    );
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
    onPress={() => router.push(`/(drawer)/users/${item.id}`)}
    >
      <View style={styles.avatar}>
        <FontAwesome5 name="user" size={18} color="#fff" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>

        <View style={styles.metaRow}>
          
          <Text
            style={[
              styles.status,
              { color: item.active ? "#16a34a" : "#dc2626" },
            ]}
          >
            {item.active ? "Active" : "Disabled"}
          </Text>
        </View>
      </View>

      <FontAwesome5 name="chevron-right" size={16} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/dashboard")}>
          <FontAwesome5 name="arrow-left" size={18} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.title}>Users</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/(drawer)/users/add")}
        >
          <FontAwesome5 name="plus" size={14} color="#fff" />
          <Text style={styles.addText}>Add User</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <FontAwesome5 name="search" size={14} color="#9ca3af" />
        <TextInput
          placeholder="Search by name or email"
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : filtered.length === 0 ? (
        <View style={styles.empty}>
          <FontAwesome5 name="users" size={36} color="#9ca3af" />
          <Text style={styles.emptyText}>No users found</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderUser}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  addText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 44,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#0f172a",
  },

  email: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 2,
  },

  metaRow: {
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    marginRight: 8,
    fontWeight: "600",
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
  },

  empty: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyText: {
    marginTop: 12,
    color: "#64748b",
  },
});
