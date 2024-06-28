import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth'; 
import { authentication } from '../firebase/config'; 
export default function ProfileScreen({ navigation }) {
  const { loggedInUser, setLoggedInUser } = useAuth(); 
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
// it is unable to retirve the same image the next time...
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'Users', loggedInUser.email));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
          if (userData.imageUrl) {
            setImage(userData.imageUrl);
          }
        } else {
          setUsername("");
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
        <View style={styles.header}>
          <TouchableOpacity onPress={signOutUser} style={styles.signOutButton}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.profileIcon}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <Text style={styles.initials}>{username.charAt(0).toUpperCase()}</Text>
              )}
            </TouchableOpacity>
            <View style={styles.userInfoContainer}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.email}>{loggedInUser ? loggedInUser.email : ''}</Text>
            </View>
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
    alignItems: 'flex-start',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
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
  initials: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
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
});
