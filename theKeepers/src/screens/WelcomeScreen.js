import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground
} from "react-native";
import ourLogo from '../assets/ourLogo.jpg';
import {the_background} from "../assets/the_background.png";


export default function WelcomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>The Keepers</Text>
        <Image
          source={ourLogo}
          style={styles.logo}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style = {styles.copyright}> Copyright 2024, NUS CS Bhavina and Sahana, v1.0, All rights reserved. orbital </Text>
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
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // value to move buttons up or down
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center', // Ensures text alignment in the text component itself
    color: '#fff', // Change 
    //fontFamily? not rlly sure yet 
  },
  copyright: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center', // Ensures text alignment in the text component itself
    color: '#fff' // Change 
    //fontFamily? not rlly sure yet 
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30, // Adjust the spacing between the logo and the buttons
    alignSelf: 'center', // Center the logo horizontally
  },
  button: {
    backgroundColor: "#302298",
    width: "90%",
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Ensure content is centered horizontally
    width: '100%',
    height: '100%',
  },
});
