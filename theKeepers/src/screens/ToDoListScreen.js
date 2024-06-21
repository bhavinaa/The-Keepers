import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable, FlatList, TextInput, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase/config'; 
import { MaterialIcons } from '@expo/vector-icons';
import ToDoList from '../components/ToDoList'; // Ensure this is the correct path
import { useAuth } from '../contexts/AuthContext';

export default function ToDoListScreen() {
  const [title, setTitle] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuth();

  const addToDoList = async () => {
    try {
      await addDoc(collection(db, "toDoList"), {
        title: title,
        isChecked: false,
      });
      setTitle("");
      getToDoList(); // Refresh the list after adding a new item
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getToDoList = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "toDoList"));
      const list = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setToDoList(list);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    } finally {
      setLoading(false);
    }
  };

  
  const deleteToDoList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "toDoList"));
      const deletePromises = querySnapshot.docs.map((item) => deleteDoc(doc(db, "toDoList", item.id)));
      await Promise.all(deletePromises);
      getToDoList(); // Refresh the list after deletion
    } catch (e) {
      console.error("Error removing documents: ", e);
    }
  };

  useEffect(() => {
    getToDoList();
  }, []);

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
          <Pressable onPress={deleteToDoList}>
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
              <ToDoList
                title={item.title}
                isChecked={item.isChecked}
                id={item.id}
                getToDoList={getToDoList} // Pass a function to refresh the list after deletion
              />
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
          onSubmitEditing={addToDoList}
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
  }
});
