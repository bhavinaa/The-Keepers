import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { useAuth } from "../contexts/AuthContext";
import { authentication, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import {StyleSheet} from 'react-native';
import { getDoc, query, where } from 'firebase/firestore';

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
  /*
  const username = null;
  const q = getDoc(query(db, 'Users'), where('email', "==",loggedInUser?.email))
  const reqdoc = getDocs(q);
  querySnapshot.forEach((doc) => {
    // Access the 'name' field of the document
    username = doc.data().username;
    console.log('Name:', username);
  }); //not sure why the error appears
  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        setLoggedInUser(null);
      })
      .catch((err) => {
        // Handle error appropriately, perhaps by setting an error state
        console.error('Error signing out: ', err);
        alert('Error signing out');
      });
  };
  */
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={signOutUser} style={styles.button}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Task')} style={styles.button}>
        <Text style={styles.signOutText}>Task</Text>
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
