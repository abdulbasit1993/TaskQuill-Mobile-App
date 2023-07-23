import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  keyboardType,
  textInputStyle,
}) => {
  return (
    <View style={{}}>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={[styles.inputBox, textInputStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: colors.PRIMARY,
    // width: '100%',
    color: colors.WHITE,
    borderRadius: 10,
    padding: 10,
  },
});

export default CustomInput;
