import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const GoalContext = createContext();

export const useGoal = () => useContext(GoalContext);

export const GoalProvider = ({children}) => {
    const [goal, setGoal] = useState([]);
    const [loading, setLoading] = useState(true);
    const {loggedInUser} = useAuth();

    useEffect(() => {
        if (loggedInUser?.email) {
          const q = query(collection(db, "goal"), where("email", "==", loggedInUser?.email));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const goalData = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              goalData.push({
                id: doc.id,
                title: data.title || '',
                des: data.description,
                deadline: data.deadline, 
                reminder: data.reminder
              });
            });
            setGoal(goalData);
            setLoading(false);
          }, (error) => {
            console.error("Error fetching goal: ", error);
          });
    
          return () => unsubscribe();
        }
      }, [loggedInUser]);

      const deleteGoal = async (goalID) => {
        const goalDoc = doc(db, "goal", goalID);
        await deleteDoc(goalDoc);
      };

      return (
        <GoalContext.Provider value={{ goal, loading, deleteGoal }}>
          {children}
        </GoalContext.Provider>
      );
}