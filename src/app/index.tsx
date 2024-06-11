import { View, Text, ActivityIndicator, Alert } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";
import * as SecureStore from "expo-secure-store";

const index = () => {
  const { session, loading } = useAuth();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
    } else {
      // Clear the stored access token
      await SecureStore.deleteItemAsync("access_token");
      console.log("logout");
      Alert.alert("Signed out successfully");
    }
  }
//////////////////////////////////////
  if (!loading) {
    return <ActivityIndicator />;
  }
  //problem di loading indicator
  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      {/* <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link> */}
      <Button onPress={signOut} text="Sign out" />
    </View>
  );
};

export default index;
