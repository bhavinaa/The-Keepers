import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const CatContext = createContext();

export const useCat = () => useContext(CatContext);

export const CatProvider = ({children}) => {
    const [cat, setCat] = useState([]);
    const [loading, setLoading] = useState(true);
    const {loggedInUser} = useAuth();

    useEffect(() => {
        if (loggedInUser?.email) {
          const q = query(collection(db, "category"), where("email", "==", loggedInUser?.email), orderBy("cat", "asc"));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const catData = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              catData.push({
                id: doc.id,
                category: data.cat || ''
              });
            });
            setCat(catData);
            setLoading(false);
          }, (error) => {
            console.error("Error fetching categories: ", error);
          });
    
          return () => unsubscribe();
        }
      }, [loggedInUser]);

      const deleteCat = async (catID) => {
        const catDoc = doc(db, "category", catID);
        await deleteDoc(catDoc);
      };

      return (
        <CatContext.Provider value={{ cat, loading, deleteCat }}>
          {children}
        </CatContext.Provider>
      );
}