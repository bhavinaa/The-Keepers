import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProfileScreen = ({ navigation }) => {
    const { loggedInUser } = useAuth();
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const imageUri = result.assets[0].uri;
          setImage(imageUri); // Update the state to display the image immediately
          await uploadImage(imageUri);
        }
    };

    const uploadImage = async (uri) => {
        if (loggedInUser) {
            const response = await fetch(uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `profileImages/${loggedInUser.email}`);
            await uploadBytes(storageRef, blob);

            const downloadURL = await getDownloadURL(storageRef);
            await setDoc(doc(db, 'Users', loggedInUser.email), { imageUrl: downloadURL }, { merge: true });

            setImage(downloadURL); // Update the state to use the URL from Firebase
        }
    };

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
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (loggedInUser) {
            fetchUserData();
        }
    }, [loggedInUser]);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
                <View style={styles.overlay}>
                    <TouchableOpacity onPress={pickImage} style={styles.profileIcon}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.profileImage} />
                        ) : (
                            <Text style={styles.initials}>{username.charAt(0).toUpperCase()}</Text>
                        )}
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
