import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CustomDrawer(props) {
  const handleLogout = () => {
    // Replace with Firebase or Laravel logout later
    props.navigation.replace('login'); // assuming you have a login screen
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        {/* Optional: User info on top */}
        <View style={styles.userInfo}>
          {/* <Image
            source={require('../../assets/images/avatar.png')} // add your avatar
            style={styles.avatar}
          /> */}
          <Text style={styles.userName}>DR Kamal</Text>
        </View>

        {/* Menu items */}
        <TouchableOpacity
          style={styles.item}
          onPress={() => props.navigation.navigate('dashboard')}
        >
          <FontAwesome5 name="home" size={18} color="white"/>
          <Text style={styles.text}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => props.navigation.navigate('users/index')}
        >
          <FontAwesome5 name="users" size={18} color="white" />
          <Text style={styles.text}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => props.navigation.navigate('profiles/index')}
        >
          <FontAwesome5 name="user" size={18} color="white" />
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.item}
          onPress={() => props.navigation.navigate('settings')}
        >
          <FontAwesome5 name="cog" size={18} color="white" />
          <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      {/* Logout fixed at bottom */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={18} color="red" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 40 },
  userInfo: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#e1e0e0' },
  item: { flexDirection: 'row', color: '#e1e0e0', alignItems: 'center', padding: 16 },
  text: { marginLeft: 12, fontSize: 16, color: '#e1e0e0' },
  logout: { borderTopWidth: 1, borderColor: '#ddd', padding: 16, flexDirection: 'row', alignItems: 'center' },
  logoutText: { marginLeft: 12, fontSize: 16, color: 'red' },
//   fontAwesome5: {color: 'red' },
});
