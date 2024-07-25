import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth'; 
import { authentication } from '../firebase/config'; 
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { profilepic } from '../assets/profilepic';
import { ProgressBar } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {
  const { loggedInUser, setLoggedInUser } = useAuth(); 
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(0);
  const [levelUpAnimation] = useState(new Animated.Value(0)); // Animation state need to change, if not it is not updated HELP 
  const ref = doc(db, "Profile", loggedInUser?.email);

  // Function to calculate points required for a given level
  const pointsForLevel = (lvl) => {
    const basePoints = 100;
    const multiplier = 1.5;
    return Math.floor(basePoints * Math.pow(multiplier, lvl - 1));
  };

  useEffect(() => {
    const unsubscribeImage = onSnapshot(doc(db, 'Profile', loggedInUser?.email), (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setImage(userData?.url || profilepic);
      } else {
        setImage(profilepic);
      }
    }, (error) => {
      console.error("Error fetching user document:", error);
      setImage(profilepic);
    });

    const unsubscribeUsername = onSnapshot(doc(db, 'Users', loggedInUser?.email), (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setUsername(userData?.username || 'Stargazer');
      } else {
        setUsername('Stargazer');
      }
    }, (error) => {
      console.error("Error fetching user document:", error);
      setUsername('Stargazer');
    });

    const updatePoints = onSnapshot(doc(db, "rewards", loggedInUser?.email), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setPoints(data.points);
        updateLevel(data.points);
      }
    });

    return () => {
      unsubscribeImage();
      unsubscribeUsername();
      updatePoints();
    };
  }, [loggedInUser]);

  const updateLevel = (currentPoints) => {
    let newLevel = 0;
    while (currentPoints >= pointsForLevel(newLevel + 1)) {
      newLevel++;
    }

    if (newLevel > level) {
      setLevel(newLevel);
      animateLevelUp();
    }
  };

  const animateLevelUp = () => {
    Animated.sequence([
      Animated.timing(levelUpAnimation, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(levelUpAnimation, { toValue: 0, duration: 1000, useNativeDriver: true })
    ]).start();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      try {
        await setDoc(ref, {
          url: result.assets[0].uri,
        });
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert('Failed to save user data');
      }
    }
  };

  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        setLoggedInUser(null);
        navigation.navigate('Login');
      })
      .catch((err) => {
        console.error('Error signing out:', err);
      });
  };

  const nextLevelPoints = pointsForLevel(level + 1);
  const progressToNextLevel = (points - pointsForLevel(level)) / (nextLevelPoints - pointsForLevel(level));

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.header}>
          <TouchableOpacity onPress={signOutUser} style={styles.signOutButton}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.profileIcon}>
                <Image source={{ uri: image }} style={styles.profileImage} />
            </TouchableOpacity>
            <View style={styles.userInfoContainer}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.email}>{loggedInUser ? loggedInUser.email : ''}</Text>
            </View>
          </View>
          <Animated.View style={[styles.levelUpContainer, { opacity: levelUpAnimation }]}>
            <Text style={styles.levelUpText}>Level Up!</Text>
          </Animated.View>
          <ProgressBar progress={progressToNextLevel} color="white" style={styles.progressBar} />
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Points: {points}</Text>
            <Text style={styles.statsText}>Level: {level}</Text>
            <Text style={styles.statsText}>Points to next level: {nextLevelPoints - points}</Text>
          </View>
        </View>
      </ImageBackground>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.editButton}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    marginTop: 10,
    width: '100%',
    height: 10,
  },
  levelUpContainer: {
    position: 'absolute',
    top: 50,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  levelUpText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
  },
  overlay: {
    flex: 1,
    padding: 20,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center', 
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 20,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userInfoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    backgroundColor: '#fff8dc',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  signOutButton: {
    backgroundColor: '#302298',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#7b68ee', 
    borderRadius: 10,
    width: '100%',
    alignItems: 'center', 
  },
  statsText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },
});
