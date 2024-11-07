import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';

function NumberContainer({children}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.textNumber}>{children}</Text>
    </View>
  );
}

export default NumberContainer;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNumber: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 24 : 36,
    fontWeight: 'bold',
  },
});
