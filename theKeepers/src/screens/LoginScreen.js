import React, { useState } from "react";
import { authentication } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import ourLogo from '../assets/ourLogo.jpg';
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
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}> The Keepers </Text>
          <Image
            source={require('../assets/ourLogo.jpg')}
            style={styles.logo}
          />  

          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#ffffff"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />

          <TextInput
            ref={passwordRef}
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#ffffff"
            value={password}
            secureTextEntry
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
        </View>
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
  input: {
    width: "80%", // Adjusted width for wider input boxes
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    color: "#ffffff", // Adjusted text color to white
    borderRadius: 5,
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
    color: '#fffff0',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
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
    color: "#331ece",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 10,
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

