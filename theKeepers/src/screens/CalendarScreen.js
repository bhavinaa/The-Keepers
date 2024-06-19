import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import {Agenda} from 'react-native-calendars';
import { useTasks } from '../contexts/TasksContext';

export default function CalendarScreen() {
  const { tasks } = useTasks();

  return (
    <SafeAreaView style={styles.container}>
      <Agenda 
        items={tasks}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'lightblue',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  }
});