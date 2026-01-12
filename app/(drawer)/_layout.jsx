// // import { Drawer } from 'expo-router/drawer';
// // import { Image, Text, View } from 'react-native';
// // import CustomDrawer from './CustomDrawer'; // <— new file you created


// // export default function DrawerLayout() {
// //   return (
// //     <Drawer
// //       screenOptions={{
// //         headerStyle: { backgroundColor: '#4471ee' },
// //         headerTintColor: '#fff',
// //       }}
// //     >
// //       <Drawer.Screen
// //         name="dashboard"
// //         options={{
// //           title: 'Home',
// //           headerTitle: () => (
// //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
// //               {/* <Image
// //                 source={require('../../assets/images/logo.png')}
// //                 style={{ width: 30, height: 30, marginRight: 8 }}
// //               /> */}
// //               <Text style={{ color: '#fff', fontWeight: 'bold' }}>
// //                 Paiman LTD
// //               </Text>
// //             </View>
// //           ),
// //         }}
// //       />

// //       <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
// //       <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
// //     </Drawer>
// //   );
// // }

// import { Drawer } from 'expo-router/drawer';
// import CustomDrawer from './CustomDrawer'; // <— new file you created
// import { Text, View } from 'react-native';

// export default function DrawerLayout() {
//   return (
//     <Drawer
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={{
//         headerStyle: { backgroundColor: '#4471ee' },
//         headerTintColor: '#fff',
//       }}
//     >
//       <Drawer.Screen
//         name="dashboard"
//         options={{
//           title: 'Home',
//           headerTitle: () => (
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Text style={{ color: '#fff', fontWeight: 'bold' }}>
//                 Paiman LTD
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
//       <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
//     </Drawer>
//   );
// }
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from './CustomDrawer'; // <— new file you created
import { Text, View } from 'react-native';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#4471ee' },
        headerTintColor: '#fff',
      }}
    >
      {/* <Drawer.Screen
        name="dashboard"
        options={{
          title: 'Home',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Paiman LTD
              </Text>
            </View>
          ),
        }}
      /> */}
      {/* <Drawer.Screen name="profile" options={{ title: 'Profile' }} /> */}
      {/* <Drawer.Screen name="settings" options={{ title: 'Settings' }} /> */}
    </Drawer>
  );
}
