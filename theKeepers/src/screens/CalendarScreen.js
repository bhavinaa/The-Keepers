import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Agenda } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useTasks } from '../contexts/TasksContext';

export default function CalendarScreen() {
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();

  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tasks for this day</Text>
      </View>
    );
  };

  const renderItem = (item) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => toggleTaskCompletion(item.id, item.completed)}
        >
          {item.completed ? (
            <Feather name="check-circle" size={24} color="green" />
          ) : (
            <Feather name="circle" size={24} color="black" />
          )}
          <Text style={[styles.itemText, item.completed && styles.completedTask]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={tasks}
        showOnlySelectedDayItems={true}
        renderEmptyData={renderEmptyData}
        renderItem={(item, isFirst) => renderItem(item)}
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
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    color: 'black',
    fontSize: 17,
    marginLeft: 10,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '75%',
    marginTop: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
