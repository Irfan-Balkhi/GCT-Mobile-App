import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function Dashboard() {
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
          <TouchableOpacity style={[styles.card, { backgroundColor: '#3b82f6' }]}>
            <Ionicons name="cube" size={28} color="#fff" />
            <Text style={styles.cardTitle}>Orders</Text>
            <Text style={styles.cardNumber}>120</Text>
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
            onPress={() => router.push('/(drawer)/add-order/add-order1')}
          >
            <Text style={styles.actionText}>Add Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>View Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Manage Inventory</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e5e7eb',
    marginTop: 6,
  },
  headerNote: {
    color: '#cbd5f5',
    fontSize: 12,
    marginTop: 4,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    width: '48%',
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    color: '#fff',
    marginTop: 6,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  actionButton: {
    backgroundColor: '#064276',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
  },
  actionText: {
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
  },
});
