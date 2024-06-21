import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, doc, getDoc } from 'firebase/firestore';

export default function ProfileScreen({ navigation }) {
  const { loggedInUser } = useAuth();
  const [username, setUsername] = useState('');
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await db.collection('users').doc(loggedInUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUsername(userData.username || ''); // Ensure username is initialized
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (loggedInUser) {
      fetchUserData();
    }
  }, [loggedInUser]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.header}>Profile</Text>

          {/* User info section */}
          <View style={styles.userInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.info}>{username}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.info}>{loggedInUser ? loggedInUser.email : ''}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  userInfo: {
    width: '80%',
    marginTop: 50, // Adjust the marginTop to move the user info up
  },
  infoItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: 'white',
  },
});
