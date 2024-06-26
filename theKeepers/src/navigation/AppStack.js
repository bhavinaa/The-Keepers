import React from "react";
import HomeScreen from "../screens/HomeScreen"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskScreen from "../screens/TaskScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PomodaroScreen from "../screens/PomodaroScreen";
import CalendarScreen from "../screens/CalendarScreen";

//const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// need to change the screen each of it goes to as we create it
// esp update the task, pomodaro, and the profile 
function TimeKeeperBottomMenuTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pomodaro" component={PomodaroScreen} />
      <Tab.Screen name="Task" component={TaskScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const AppStack = () => {
  return (
    <TimeKeeperBottomMenuTabs/>
  );
};

export default AppStack;