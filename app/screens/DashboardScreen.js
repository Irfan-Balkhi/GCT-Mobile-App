// // import React from 'react';
// // import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// // export default function Dashboard({ navigation }) {
// //   return (
// //     <ScrollView style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <Text style={styles.headerTitle}>Paiman LTD</Text>
// //         <Text style={styles.headerTitle}>خوش آمدید جناب کمال الدین کمال</Text>
// //         <Text style={styles.headerSubtitle}>برای رهنمایی بیشتر با جناب محمد عرفان بلخی بتماس شوید</Text>
// //       </View>

// //       {/* Stats Cards */}
// //       <View style={styles.cardsContainer}>
// //         <TouchableOpacity style={styles.card}>
// //           <Text style={styles.cardTitle}>Orders</Text>
// //           <Text style={styles.cardNumber}>4</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.card}>
// //           <Text style={styles.cardTitle}>Pending</Text>
// //           <Text style={styles.cardNumber}>45</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.card}>
// //           <Text style={styles.cardTitle}>Completed Orders</Text>
// //           <Text style={styles.cardNumber}>30</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Quick Actions */}
// //       <View style={styles.actionsContainer}>
// //         <TouchableOpacity style={styles.actionButton}>
// //           <Text style={styles.actionText}>Warehouse Manager</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.actionButton}>
// //           <Text style={styles.actionText}>View Reports</Text>
// //         </TouchableOpacity>

// //          <TouchableOpacity style={styles.actionButton}>
// //           <Text style={styles.actionText}>View Incomes</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f4f6f8',
// //     padding: 16,
// //   },
// //   header: {
// //     paddingTop: 60,
// //     marginBottom: 20,
// //     paddingHorizontal: 20,
// //     // backgroundColor: '#007bff',
// //   },
// //   headerTitle: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     color: '#f9751dff',
// //   },
// //   headerSubtitle: {
// //     fontSize: 16,
// //     color: '#666',
// //     marginTop: 4,
// //   },
// //   cardsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 20,
// //   },
// //   card: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     padding: 16,
// //     marginHorizontal: 4,
// //     borderRadius: 12,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 6,
// //     elevation: 3, // Android shadow
// //   },
// //   cardTitle: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   cardNumber: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     marginTop: 8,
// //   },
// //   actionsContainer: {
// //     marginTop: 10,
// //   },
// //   actionButton: {
// //     backgroundColor: '#3b82f6',
// //     padding: 16,
// //     borderRadius: 12,
// //     marginBottom: 12,
// //   },
// //   actionText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// // });
// import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'; // Icons
// import React from 'react';
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function Dashboard({ navigation }) {
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Paiman LTD</Text>
//          <Text style={styles.headerTitle}>خوش آمدید جناب کمال الدین کمال</Text>
//          <Text style={styles.headerSubtitle}>برای رهنمایی بیشتر با جناب محمد عرفان بلخی بتماس شوید</Text>
//        </View>

//       {/* Stats Cards */}
//       <View style={styles.cardsContainer}>
//         <TouchableOpacity style={[styles.card, { backgroundColor: '#3b82f6' }]}>
//           <Ionicons name="cube" size={28} color="#fff" />
//           <Text style={styles.cardTitle}>Order</Text>
//           <Text style={styles.cardNumber}>120</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.card, { backgroundColor: '#10b981' }]}>
//           <MaterialIcons name="shopping-cart" size={28} color="#fff" />
//           <Text style={styles.cardTitle}>Pending</Text>
//           <Text style={styles.cardNumber}>45</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.card, { backgroundColor: '#f59e0b' }]}>
//           <FontAwesome5 name="truck-loading" size={28} color="#fff" />
//           <Text style={styles.cardTitle}>Done Orders</Text>
//           <Text style={styles.cardNumber}>30</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Quick Actions */}
//       <View style={styles.actionsContainer}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('AddProduct')}
//         >
//           <Text style={styles.actionText}>Add Order</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('ViewReports')}
//         >
//           <Text style={styles.actionText}>View Reports</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('ManageSales')}
//         >
//           <Text style={styles.actionText}>Manage Inventories</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('ManagePurchases')}
//         >
//           <Text style={styles.actionText}>Balance: USD, UZS Card, Bank</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 16,
//   },
//   header: {
//     marginBottom: 20,
//     paddingTop: 80,
//     paddingHorizontal: 10,
//   },
//   headerTitle: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   cardsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     paddingTop: 60,
//   },
//   card: {
//     flex: 1,
//     padding: 16,
//     marginHorizontal: 4,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: '#fff',
//     marginTop: 8,
//   },
//   cardNumber: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 4,
//   },
//   actionsContainer: {
//     marginTop: 10,
//   },
//   actionButton: {
//     backgroundColor: '#3b82f6',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   actionText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });
