import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { FontAwesome5, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Profile() {
  return (
    <View style={styles.container}>
      <ScrollView>

        {/* ===== Profile Header ===== */}
        <View style={styles.header}>
          {/* <Image
            source={require('../../assets/profile.png')} // add any avatar
            style={styles.avatar}
          /> */}
          <Text style={styles.name}>کمال الدین کمال</Text>
          <Text style={styles.role}>Operations Manager</Text>
        </View>

        {/* ===== Profile Details ===== */}
        <View style={styles.detailsCard}>
          <DetailRow icon="email" label="Email" value="kamal@paiman.com" />
          <DetailRow icon="phone" label="Phone" value="+93 787 40 71 40" />
          {/* <DetailRow icon="office-building" label="Role" value="Paiman Ltd" /> */}
          <DetailRow icon="account-badge" label="Role" value="Admin" lib="MaterialCommunityIcons" />
        </View>

        {/* ===== Stats (Optional) ===== */}
        {/* <View style={styles.cardsContainer}>
          <View style={[styles.card, { backgroundColor: '#16a34a' }]}>
            <FontAwesome5 name="check-circle" size={24} color="#fff" />
            <Text style={styles.cardTitle}>Completed</Text>
            <Text style={styles.cardNumber}>30</Text>
          </View>

          <View style={[styles.card, { backgroundColor: '#dc2626' }]}>
            <FontAwesome5 name="times-circle" size={24} color="#fff" />
            <Text style={styles.cardTitle}>Rejected</Text>
            <Text style={styles.cardNumber}>5</Text>
          </View>
        </View> */}

        {/* ===== Actions (2–3 buttons only) ===== */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="lock-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.logout]}>
            {/* <MaterialIcons name="times-circle" size={20} color="#fff" /> */}
            <FontAwesome5 name="times-circle" size={18} color="white"/>
            <Text style={styles.actionText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* ===== Footer ===== */}
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

/* ===== Reusable Detail Row ===== */
function DetailRow({ icon, label, value, lib = 'MaterialIcons' }) {
  const IconComponent = lib === 'MaterialCommunityIcons' ? MaterialCommunityIcons : MaterialIcons;
  return (
    <View style={styles.detailRow}>
      <IconComponent name={icon} size={20} color="#475569" />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
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
    alignItems: 'center',
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  role: {
    color: '#cbd5e1',
    marginTop: 4,
  },

  detailsCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 14,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    marginLeft: 10,
    color: '#475569',
    width: 80,
  },
  detailValue: {
    color: '#0f172a',
    fontWeight: '600',
  },

  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  card: {
    width: '48%',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
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
    marginTop: 24,
    paddingHorizontal: 16,
  },
  actionButton: {
    backgroundColor: '#064276',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logout: {
    backgroundColor: '#b91c1c',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
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
