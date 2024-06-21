// ToDoListScreen.js

import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, FlatList, TextInput, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useToDoList } from '../contexts/ToDoListContext'; // Update path as per your project

export default function ToDoListScreen() {
  const [title, setTitle] = useState("");
  const { toDoList, loading, addToDoList, deleteToDoListItem } = useToDoList();

  const handleAddToDo = () => {
    if (title.trim()) {
      addToDoList(title.trim());
      setTitle("");
    }
  };

  const handleDeleteToDo = (id) => {
    deleteToDoListItem(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/the_background.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.header}>
          {/* Heading */}
          <Text style={styles.heading}>ToDo List</Text>

          {/* Number of items */}
          <Text style={styles.noOfItems}>{toDoList.length}</Text>

          {/* Delete all */}
          <Pressable onPress={() => handleDeleteAll()}>
            <MaterialIcons name="delete" size={30} color="white" />
          </Pressable>
        </View>

        {/* FlatList to render items */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={toDoList}
            renderItem={({ item }) => (
              <View style={styles.toDoListItem}>
                <Text>{item.title}</Text>
                <Pressable onPress={() => handleDeleteToDo(item.id)}>
                  <MaterialIcons name="delete" size={24} color="black" />
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}

        {/* TextInput for adding new tasks */}
        <TextInput
          placeholder='Add New Task'
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
          onSubmitEditing={handleAddToDo}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Added padding to create space at the top
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#6200ea",
    width: "90%",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 15, // Adjusted marginTop to increase space between the header and the screen header
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  noOfItems: {
    fontSize: 18,
    color: "white",
    marginRight: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15, // Increased padding for a larger input box
    fontSize: 18, // Increased font size
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
  },
  listContent: {
    width: "90%",
    paddingBottom: 100,
    alignItems: 'center', // Center the content
  },
  toDoListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#fff',
  },
});
