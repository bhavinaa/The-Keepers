import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, getDoc, increment, getDocs } from "firebase/firestore";
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
    
        const q = query(collection(db, 'calendar'), where("goalId", "==", goalID));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    };

    const toggleReminder = async (goalID, reminder) => {
        let check = false;
        const goalDoc = doc(db, 'goal', goalID);
        const goalSnap = await getDoc(goalDoc);
        const rewardDoc = doc(db, 'rewards', loggedInUser?.email);
        const rewardSnap = await getDoc(rewardDoc);
        if (goalSnap.exists()) {
            const goalData = goalSnap.data();
            const updatedReminders = goalData.reminderDates.map(r => {
                if (r.date === reminder.date) {
                    check = !r.checked;
                    return { ...r, checked: !r.checked };
                }
                return r;
            });

            await updateDoc(goalDoc, {
                reminderDates: updatedReminders,
            });

            const q = query(collection(db, "calendar"), where("goalId", "==", goalDoc), where("deadline", "==", reminder));
            const goalSnap = await getDoc(goalDoc);
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc, {
                    completion: check,
            });
            });

            if(rewardSnap.exists()){
                let pointsChange = check ? 200 : -200;

                await updateDoc(rewardDoc, {
                    points: increment(pointsChange)
                })
            }
        }
    };

    const getCompletion = async (goalID, reminderDate) => {
        const goalDoc = doc(db, "goal", goalID);
        const goalSnap = await getDoc(goalDoc);
        let check = false;
        if (goalSnap.exists()) {
            const goalData = goalSnap.data();
            goalData.reminderDates.forEach(r => {
                if (r.date === reminderDate) {
                    check = r.checked;
                }
            });
        }
        return check;
    };

    return (
        <GoalContext.Provider value={{ goal, loading, deleteGoal, toggleReminder, getCompletion }}>
            {children}
        </GoalContext.Provider>
    );
}
