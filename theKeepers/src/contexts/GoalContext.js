import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const GoalContext = createContext();

export const useGoal = () => useContext(GoalContext);

export const GoalProvider = ({ children }) => {
    const [goal, setGoal] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loggedInUser } = useAuth();

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
                        reminder: data.reminder,
                        reminderDates: data.reminderDates || [],
                        reminderCount: data.reminderCount || 0 
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

    const toggleReminder = async (goalID, reminder) => {
        const goalDoc = doc(db, 'goal', goalID);
        const goalSnap = await getDoc(goalDoc);
        if (goalSnap.exists()) {
            const goalData = goalSnap.data();
            const updatedReminders = goalData.reminderDates.map(r => {
                if (r.date === reminder.date) {
                    return { ...r, checked: !r.checked };
                }
                return r;
            });

            await updateDoc(goalDoc, {
                reminderDates: updatedReminders,
            });
        }
    };

    return (
        <GoalContext.Provider value={{ goal, loading, deleteGoal, toggleReminder }}>
            {children}
        </GoalContext.Provider>
    );
}
