import React, { useState } from "react";
import { authentication } from "../firebase/config";
import { signInWithEmailAndPassword,  sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import {the_background} from "../assets/the_background.png";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";





export default function ForgetPassword({navigation}) {
 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedInUser } = useAuth();  
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const auth = useAuth();

  // context is not running yet
  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
    })
    .catch((error) => {
      Alert.alert('Error', error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
      <View style={styles.contentContainer}>
      <Text style={styles.title}> Reset Password </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ffffff"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      
      <TouchableOpacity onPress={handleForgetPassword} style={styles.button}>
        <Text style={styles.buttonText}> send email </Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          />
        )}
      </TouchableOpacity>
      </View>
      </ImageBackground>
      </SafeAreaView>
    
  );
};
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#fffff0',
    textAlign: 'center', // Ensures text alignment in the text component itsel
  },
  input: {
    width: "100%", // Adjusted width for wider input boxes
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "90%", // Adjusted width for the button to match input boxes
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: '#fffff0',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});














