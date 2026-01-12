// // import { View, Text, Button } from 'react-native';

// // export default function LoginScreen({ navigation }) {
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text>Login Screen</Text>
// //       <Button
// //         title="Login To GCT Inventory"
// //         onPress={() => navigation.replace('Dashboard')}
// //       />
// //     </View>
// //   );
// // }

// import { View, Text, Button, TextInput } from 'react-native';
// import React, { useState } from 'react';

// export default function LoginScreen({ navigation }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
//       <Text>Login</Text>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         style={{ borderWidth: 1, marginVertical: 10, padding: 8}}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
//       />
//       <Button
//         title="Login"
//         onPress={() => navigation.navigate('Dashboard')}
//       />
//     </View>
//   );
// }
