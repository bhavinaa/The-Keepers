import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

const ToDoListContext = createContext();

export const useToDoList = () => useContext(ToDoListContext);

export const ToDoListProvider = ({ children }) => {
  const { loggedInUser } = useAuth();
  const [toDoList, setToDoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedInUser?.email) {
      const q = query(collection(db, "toDoList"), where("email", "==", loggedInUser.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            title: doc.data().title,
            isChecked: doc.data().isChecked
          });
        });
        setToDoList(list);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [loggedInUser]);

  const addToDoList = async (title) => {
    try {
      await addDoc(collection(db, "toDoList"), {
        title: title,
        isChecked: false,
        email: loggedInUser.email
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const deleteToDoListItem = async (id) => {
    try {
      await deleteDoc(doc(db, "toDoList", id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <ToDoListContext.Provider value={{ toDoList, loading, addToDoList, deleteToDoListItem }}>
      {children}
    </ToDoListContext.Provider>
  );
};
