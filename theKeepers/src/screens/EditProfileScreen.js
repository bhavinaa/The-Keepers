import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase/config';
import { doc, collection, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { profilepic } from '../assets/profilepic';

const EditProfileScreen = ({ navigation }) => {
    const { loggedInUser } = useAuth();
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState();
    const ref = collection(db, "Profile");

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
    
        // Cleanup subscriptions on unmount
        return () => {
          unsubscribeImage();
          unsubscribeUsername();
        };
      }, [loggedInUser]);
    

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
            await setDoc(doc(ref, loggedInUser?.email), {
              url: result.assets[0].uri,
            });
            console.log("Document successfully written!");
          } catch (error) {
            console.error("Error adding document: ", error);
            alert('Failed to save user data');
          }
        
        }
    };
 

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
                <View style={styles.overlay}>
                    <TouchableOpacity onPress={pickImage} style={styles.profileIcon}>
                        <Image source={{ uri: image }} style={styles.profileImage}/>
                    </TouchableOpacity>
                    <Text style={styles.username}>{username}</Text>
                </View>
                <Button title="Save" onPress={() => navigation.navigate('Profile')} />
            </ImageBackground>
        </SafeAreaView>
    );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    profileIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    initials: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
});
