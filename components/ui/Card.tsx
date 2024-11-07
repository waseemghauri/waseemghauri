import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';

function Card({children}: any) {
  return <View style={styles.card}>{children} </View>;
}

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: 'black',
  },
});
