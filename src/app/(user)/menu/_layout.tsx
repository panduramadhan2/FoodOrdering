// import Colors from "@/src/constants/Colors";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        // headerTitle: () => (
        //   <View style={styles.headerContainer}>
        //     <Text style={styles.headerText}>Menu</Text>
        //   </View>
        // ),
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}

// const styles = StyleSheet.create({
//   headerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: "-7%",
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
// });
