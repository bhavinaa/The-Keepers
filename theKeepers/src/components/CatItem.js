import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class CatItem extends PureComponent {
    render () {
        const {cat, selectCategory, deleteCat} = this.props;

        return (
            <Swipeable
            renderRightActions={() => (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteCat(cat.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
          >
            <TouchableOpacity onPress={() => selectCategory(cat.category)}>
                <View style={styles.catContainer}>
                <Text style={styles.categoryText}>{cat.category}</Text>
                </View>
            </TouchableOpacity>
          </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    catContainer: {
      backgroundColor: "#302298",
      borderRadius: 20,
      padding: 10,
      margin: 14,
      width: 265,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    categoryText: {
      fontSize: 20,
      fontWeight: "bold",
      color: '#fffff0',
      textAlign: 'center',
    },
    deleteButton: {
      backgroundColor: '#b22222',
      justifyContent: 'center',
      alignItems: 'center',
      width: 265,
      height: '75%',
      marginTop: 10,
      borderRadius: 10,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
      padding: 20,
    },
  });
  
  export default CatItem;