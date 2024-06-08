import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Button, ImageBackground, Image}from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from './src/contexts/AuthContext'; 
import GuestStack from "./src/navigation/GuestStack";
import AppStack from "./src/navigation/AppStack";
import {the_background} from './src/assets/the_background.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//const image = {uri: the_background};

//<Image image={require('./src/assets/the_background.png')} />

const AppContent = () => {
  const { loggedInUser } = useAuth();
  return (
    <NavigationContainer>
      {loggedInUser ? <AppStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

function MyKeepersTabBar({ navigation }) {
  return (
    <Button
      title="Home"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('HomeScreen');
      }}
    />
  );
}


export default function App() {
  return (
    // this does not do a full wrap! help 
    <ImageBackground source={require('./src/assets/the_background.png')} resizeMode="cover" style={styles.image}>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});


