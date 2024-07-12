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
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    categoryText: {
      fontSize: 18,
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
  export default CatItem;