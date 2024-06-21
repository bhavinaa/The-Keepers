import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { db, deleteDoc, doc, updateDoc } from "../firebase/config";

const TodoList = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const toggleChecked = async () => {
    setIsChecked(!isChecked);
    await updateIsChecked(!isChecked); // Toggle the checked state in Firestore
  };

  const updateIsChecked = async (checked) => {
    // collection name, the id of the document you are passing
    const toDoRef = doc(db, "toDoList", props.id);
    await updateDoc(toDoRef, {
      isChecked: checked,
    });
  };

  // there is a delete warning of a possible 
  // unhandled rejection? 
  // smthg wrong with this it is not auto updating 
  const deleteToDoListIem = async () => {
    // database, document and the ID 
    await deleteDoc(doc(db, "toDoList", props.id));
    //props.getToDoList();
    getToDoList()
  }

  // this is to update the state change of being clicked in the database
  // use hook, and then pass the isChecked state as a dependency
  useEffect(() => {
    updateIsChecked();
  },[isChecked])

  return (
    <View style={styles.container}>
      {/* Checkbox */}
      <Pressable onPress={toggleChecked}>
        {isChecked ? (
          <Fontisto name="checkbox-active" size={24} color="black" />
        ) : (
          <Fontisto name="checkbox-passive" size={24} color="black" />
        )}
      </Pressable>

      {/* ToDo title */}
      <Text style={styles.title}>{props.title}</Text>

      {/* Delete button */}
      <Pressable onPress={deleteToDoListIem}>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "500",
  },
});
