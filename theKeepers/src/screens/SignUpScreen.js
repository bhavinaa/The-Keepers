import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, ImageBackground } from "react-native";
import { authentication, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { collection, setDoc, doc } from "firebase/firestore";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedInUser } = useAuth();
  const ref = collection(db, "Users");

  const handleSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(authentication, email, password)
      .then(async (res) => {
        try {
          await setDoc(doc(ref, email), {
            username: name,
          });
          await setDoc(doc(collection(db, "rewards"), email), {
            points: 0,
          });
          console.log("Document successfully written!");
        } catch (error) {
          console.error("Error adding document: ", error);
          alert('Failed to save user data');
        }
        setLoggedInUser(res.user);
        console.log("Navigation triggered to Home");
        navigation.navigate('Home');
      })
      .catch((error) => {
        // Handle the error appropriately, perhaps by setting an error state
        console.error("Error signing up: ", error);
        alert(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>SIGN UP</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ffffff"
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ffffff"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#ffffff"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
    textAlign: 'center',
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
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
    width: "90%",
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
