import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { useAuth } from "../contexts/AuthContext";
import { authentication } from "../firebase/config";
import { signOut } from "firebase/auth";
import {StyleSheet} from 'react-native';


export default function HomeScreen({navigation}) {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        setLoggedInUser(null);
      })
      .catch((err) => {
        // Handle error appropriately, perhaps by setting an error state
      });
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Page</Text>
      <TouchableOpacity onPress={signOutUser} style={styles.button}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
