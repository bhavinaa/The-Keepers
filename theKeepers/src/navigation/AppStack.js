import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// need to change the screen each of it goes to as we create it
// esp update the task, pomodaro, and the profile 
function TimeKeeperBottomMenuTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Task" component={HomeScreen} />
      <Tab.Screen name="Pomodaro" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}

const AppStack = () => {
  return (

    <TimeKeeperBottomMenuTabs/>
      // <Stack.Navigator>
      //   <Stack.Screen
      //     name="Home"
      //     component={HomeScreen}
      //     options={{ headerShown: false }}
      //   />
      // </Stack.Navigator>
  );
};

export default AppStack;
