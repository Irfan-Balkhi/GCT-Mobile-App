// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import LoginScreen from '../screens/LoginScreen';
// // import DashboardScreen from '../screens/DashboardScreen';

// // const Stack = createNativeStackNavigator();

// // export default function AppNavigator() {
// //   return (
// //     //<NavigationContainer>
// //       <Stack.Navigator screenOptions={{ headerShown: false }}>
// //         <Stack.Screen name="Login" component={LoginScreen} />
// //         <Stack.Screen name="Dashboard" component={DashboardScreen} />
// //       </Stack.Navigator>
// //     //</NavigationContainer>
// //   );
// // }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import DashboardScreen from '../screens/DashboardScreen';

// const Drawer = createDrawerNavigator();

// export default function AppNavigator() {
//   return (
//       <Drawer.Navigator
//         screenOptions={{
//           headerShown: true, // we will create our OWN header
//         }}
//       >
//         <Drawer.Screen name="Profile" component={DashboardScreen} />
//       </Drawer.Navigator>
//   );
// }
