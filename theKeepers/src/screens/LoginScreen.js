import React, { useState } from "react";
import { authentication } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import {the_background} from "../assets/the_background.png";
import {getFocusTip} from "../firebase/openAI"

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
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // impt for the code to run
  const inputRef = React.useRef();
  const passwordRef = React.useRef();
  
  const { setLoggedInUser } = useAuth();

  const handleSignIn = async () => {
    setIsLoading(true); 
  
    signInWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        setLoggedInUser(res.user); // Set the logged-in user state
      })
      .catch((err) => {
        setError("Incorrect Email/Password"); // Set the error message state
        alert("Incorrect Email/Password");
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>

        <SafeAreaView style={styles.contentContainer}>
        <Text style={styles.title}>LOGIN</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ffffff"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />

          <TextInput
            ref={passwordRef}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            value={password}
            secureTextEntry // makes the password hidden
            onChangeText={(text) => setPassword(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={styles.loginText}>Login</Text>
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
          <View style={styles.signUpContainer}>
            <Text style={styles.downText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUpContainer}>
            {/* </View>Text style={styles.downText}> Forgot Password?</Text> */}
            <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
              <Text style={styles.signup}> Forgot Password? </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
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
    width: "80%", // Adjusted width for wider input boxes
    height: 40,
    borderColor: "gray",
    marginTop: 15,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    color: "#ffffff", // Adjusted text color to white
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "80%", // Adjusted width for the button to match input boxes
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#fffff0',
    textAlign: 'center', // Ensures text alignment in the text component itsel
  },
  welcomeText: {
    fontSize: 44,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 44,
    color: '#fffff0',
    textAlign: 'center',
    marginBottom: 16,
  },
  downText: {
    fontSize: 16,
    color: '#fffff0',
    fontWeight: "400",
    marginTop: 10,
  },
  signup: {
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    color: "#4682b4",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    margin: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: '100%', // Ensures the content container takes the full width
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
