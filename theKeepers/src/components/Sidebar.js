import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ImageBackground, FlatList } from 'react-native';
import { useTasks } from '../contexts/TasksContext';
import TaskItem from '../components/TaskItem';

const Sidebar = ({ categories, closeSidebar }) => {
  const [popVisible, setPopVisibility] = useState(false);
  const [chosenCat, setCat] = useState("");
  const { getTasksByCategory, tasksByCategory, loading, toggleTaskCompletion, deleteTask } = useTasks();

  const renderTaskItem = ({ item }) => (
    <TaskItem 
      item={item} 
      toggleTaskCompletion={toggleTaskCompletion} 
      deleteTask={deleteTask} 
    />
  );

  const openCategory = async (category) => {
    setPopVisibility(true);
    setCat(category);
    await getTasksByCategory(category);
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarHeader}>StarGazer</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryButton}
          onPress={() => openCategory(category.category)}
        >
          <Text style={styles.categoryButtonText}>{category.category}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        visible={popVisible}
        onRequestClose={() => setPopVisibility(false)}
      >
        <ImageBackground source={require('../assets/the_background.png')} style={styles.modalView}>
          <Text style={styles.modalText}>{chosenCat}</Text>
          <View style={styles.taskListContainer}>
            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : (
              <FlatList
                data={tasksByCategory}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.taskList}
              />
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {
            setPopVisibility(false);
            closeSidebar();
          }}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: '#333',
    padding: 20,
    zIndex: 1000,
  },
  sidebarHeader: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#444',
    marginVertical: 5,
    borderRadius: 5,
  },
  categoryButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fffff0',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  taskListContainer: {
    height: '80%',
    width: '115%',
    paddingBottom: 40,
  },
  taskList: {
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fffff0',
    textAlign: 'center',
  },
  taskItem: {
    backgroundColor: '#444',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  taskText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Sidebar;
