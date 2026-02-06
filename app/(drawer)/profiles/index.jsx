import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import app from '../../../firebase/config';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Profile() {
  const [name, setName] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const fetchUserName = async () => {
      if (!auth.currentUser) return;

      try {
        const uid = auth.currentUser.uid;
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setName(userSnap.data().name || '');
        }
      } catch (error) {
        console.log('Failed to fetch user name:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* ===== Profile Header ===== */}
        <View style={styles.header}>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => router.replace("/dashboard")}
        >
          <FontAwesome5 name="arrow-left" size={18} color="#2563eb" />
        </TouchableOpacity>

        {/* Centered Content */}
        <View style={styles.headerCenter}>
          <Text style={styles.name}>{name || "User"}</Text>
          <Text style={styles.role}>Operations Manager</Text>
        </View>

      </View>

        {/* ===== Profile Details ===== */}
        <View style={styles.detailsCard}>
          <DetailRow
            icon="email"
            label="Email"
            value={auth.currentUser?.email}
          />
          <DetailRow
            icon="phone"
            label="Phone"
            value="+93 787 40 71 40"
          />
          <DetailRow
            icon="account-badge"
            label="Role"
            value="Admin"
            lib="MaterialCommunityIcons"
          />
        </View>

        {/* ===== Actions ===== */}
        <View style={styles.actionsContainer}>
         <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push(`/(drawer)/users/${user.id}/edit`)}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="lock-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.logout]}>
            <FontAwesome5 name="times-circle" size={18} color="white" />
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
  const IconComponent =
    lib === 'MaterialCommunityIcons'
      ? MaterialCommunityIcons
      : MaterialIcons;

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
  backgroundColor: "#1e293b",
  paddingTop: 24,
  paddingBottom: 20,
  alignItems: "center",
  position: "relative",
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
},

  headerBackButton: {
    position: "absolute",
    left: 16,
    top: 26,
    padding: 8,
  },

  headerCenter: {
    alignItems: "center",
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  role: {
    color: "#cbd5e1",
    marginTop: 4,
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
