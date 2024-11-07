import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';

function InstructionText({children, style}: any) {
  return <Text style={[style, styles.instructionText]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 26,
  },
});
