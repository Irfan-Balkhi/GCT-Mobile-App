import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from "../../context/AuthContext";

import { router, useFocusEffect } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function Dashboard() {
  const [orderCounts, setOrderCounts] = useState({
    total: 0,
    loading: true,
  });

  /* ---------- AUTO REFRESH WHEN SCREEN IS FOCUSED ---------- */
  useFocusEffect(
    useCallback(() => {
      const fetchOrderCount = async () => {
        try {
          const snapshot = await getDocs(collection(db, "orders"));
          setOrderCounts({ total: snapshot.size, loading: false });
        } catch (err) {
          console.error("Failed to fetch orders:", err);
          setOrderCounts(prev => ({ ...prev, loading: false }));
        }
      };

      fetchOrderCount();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <Text style={styles.headerSubtitle}>
            خوش آمدید جناب کمال الدین کمال
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>

          {/* Orders Card */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#3b82f6' }]}
            onPress={() => router.push('/(drawer)/orders')}
          >
            <Ionicons name="cube" size={28} color="#fff" />
            <Text style={styles.cardTitle}>Orders</Text>
            <Text style={styles.cardNumber}>
              {orderCounts.loading ? '...' : orderCounts.total}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#e79405' }]}>
            <MaterialIcons name="shopping-cart" size={28} color="#fff" />
            <Text style={styles.cardTitle}>Loading</Text>
            <Text style={styles.cardNumber}>45</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#04bd0a' }]}>
            <FontAwesome5 name="truck-loading" size={28} color="#fff" />
            <Text style={styles.cardTitle}>Completed</Text>
            <Text style={styles.cardNumber}>30</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#ff0000' }]}>
            <FontAwesome5 name="times-circle" size={28} color="#fff" />
            <Text style={styles.cardTitle}>Rejected</Text>
            <Text style={styles.cardNumber}>30</Text>
          </TouchableOpacity>

        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(drawer)/orders/add')}
          >
            <Text style={styles.actionText}>Add Order</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(drawer)/customers')}
          >
            <Text style={styles.actionText}>Customers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(drawer)/inventories')}
          >
            <Text style={styles.actionText}>Inventories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>View Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Balances</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Paiman Ltd</Text>
          <Text style={styles.footerText}>
            Developed by Mohammad Irfan Balkhi
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { backgroundColor: '#1e293b', padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#e5e7eb', marginTop: 6 },
  cardsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 16 },
  card: { width: '48%', padding: 12, borderRadius: 14, alignItems: 'center', marginBottom: 16 },
  cardTitle: { color: '#fff', marginTop: 6 },
  cardNumber: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  actionsContainer: { marginTop: 30, paddingHorizontal: 16 },
  actionButton: { backgroundColor: '#064276', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2, alignItems: 'center' },
  actionText: { fontWeight: '600', color: '#fff' },
  footer: { marginTop: 30, alignItems: 'center', paddingBottom: 20 },
  footerText: { fontSize: 12, color: '#64748b' },
});
