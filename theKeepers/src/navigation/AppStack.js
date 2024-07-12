import React from "react";
import HomeScreen from "../screens/HomeScreen"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskScreen from "../screens/TaskScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PomodaroScreen from "../screens/PomodaroScreen";
import CalendarScreen from "../screens/CalendarScreen";
import { Ionicons } from '@expo/vector-icons';
import EditProfileScreen from "../screens/EditProfileScreen";
import GoalScreen from "../screens/GoalScreen";
import { Screen } from "react-native-screens";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// need to change the screen each of it goes to as we create it
// esp update the task, pomodaro, and the profile 
function TimeKeeperBottomMenuTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Pomodoro" 
        component={PomodaroScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Task" 
        component={TaskScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      {/* <Ionicons name="checkmark-circle" size={32} color="green" /> */}
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TimeKeeperBottomMenuTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Goal" 
        component={GoalScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="EditProfile" 
      component={EditProfileScreen} 
      options={{ headerShown: true }}/>
    </Stack.Navigator>
    // <TimeKeeperBottomMenuTabs/>
  );
};

export default AppStack;