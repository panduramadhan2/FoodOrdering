// // WARN  Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35.
// import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
// import React, { useState } from "react";
// import Button from "../../components/Button";
// import Colors from "../../constants/Colors";
// import { Link, Stack } from "expo-router";
// import { supabase } from "@/src/lib/supabase";

// const SignInScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function signInWithEmail() {
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) {
//       Alert.alert(error.message);
//     }
//     setLoading(false);
//   }

//   return (
//     <View style={styles.container}>
//       <Stack.Screen options={{ title: "Sign in" }} />

//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         placeholder="jon@gmail.com"
//         style={styles.input}
//       />

//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         value={password}
//         onChangeText={setPassword}
//         placeholder=""
//         style={styles.input}
//         secureTextEntry
//       />

//       <Button
//         onPress={signInWithEmail}
//         disabled={loading}
//         text={loading ? "Sign in..." : "Sign in"}
//       />
//       <Link href="/sign-up" style={styles.textButton}>
//         Create an account
//       </Link>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     justifyContent: "center",
//     flex: 1,
//   },
//   label: {
//     color: "gray",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "gray",
//     padding: 10,
//     marginTop: 5,
//     marginBottom: 20,
//     backgroundColor: "white",
//     borderRadius: 5,
//   },
//   textButton: {
//     alignSelf: "center",
//     fontWeight: "bold",
//     color: Colors.light.tint,
//     marginVertical: 10,
//   },
// });

// export default SignInScreen;
// // WARN  Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35.

import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import * as SecureStore from "expo-secure-store";
import LZString from "lz-string";

const storeCompressedValue = async (key: string, value: string) => {
  const compressedValue = LZString.compressToUTF16(value);
  await SecureStore.setItemAsync(key, compressedValue);
};

const getDecompressedValue = async (key: string) => {
  const compressedValue = await SecureStore.getItemAsync(key);
  if (compressedValue) {
    return LZString.decompressFromUTF16(compressedValue);
  }
  return null;
};

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    // else {
    //   // Example of storing a large value (e.g., token)
    //   if (data.session && data.session.access_token) {
    //     const token = data.session.access_token;
    //     if (token.length > 2048) {
    //       await storeCompressedValue('access_token', token);
    //     } else {
    //       await SecureStore.setItemAsync('access_token', token);
    //     }
    //   }
    // }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? "Sign in..." : "Sign in"}
      />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;
