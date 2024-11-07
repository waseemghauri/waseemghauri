import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';

function Title({children}: any) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
    maxWidth: '80%',
    width: 300,
  },
});
