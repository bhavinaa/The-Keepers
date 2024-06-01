import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from './src/contexts/AuthContext'; 
import GuestStack from "./src/navigation/GuestStack";
import AppStack from "./src/navigation/AppStack";

const AppContent = () => {
  const { loggedInUser } = useAuth();
  return (
    <NavigationContainer>
      {loggedInUser ? <AppStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


