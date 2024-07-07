import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useTasks } from '../contexts/TasksContext';
import CalendarItem from '../components/CalendarItem';

export default function CalendarScreen() {
  const { tasks, loading, toggleTaskCompletion, deleteTask } = useTasks();

  const renderEmptyData = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No tasks for this day</Text>
    </View>
  );

  const renderItem = (item) => (
    <CalendarItem
      item={item}
      toggleTaskCompletion={toggleTaskCompletion}
      deleteTask={deleteTask}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const formattedTasks = tasks.reduce((acc, task) => {
    const date = task.deadline.toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={formattedTasks}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
