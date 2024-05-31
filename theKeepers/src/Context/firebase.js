import { Text, View } from 'react-native'
import React, { Component } from 'react'


const firebaseConfig = {
    apiKey: "AIzaSyCOzVy2azggvtQboBgLtspvaV2tdyaBqkg",
    authDomain: "thekeepers2-e1005.firebaseapp.com",
    projectId: "thekeepers2-e1005",
    storageBucket: "thekeepers2-e1005.appspot.com",
    messagingSenderId: "1040602743546",
    appId: "1:1040602743546:web:36fc3c2a9c761ba09bff43"
  };

export class firebase extends Component {
  render() {
    return (
      <View>
        <Text>firebase</Text>
      </View>
    )
  }
}

export default firebase;