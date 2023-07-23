import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import Ionicon from 'react-native-vector-icons/Ionicons';

const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  onIconPress,
  containerStyles,
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.inputView}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.inputBox}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
        />
      </View>
      <View style={styles.iconView}>
        <TouchableOpacity onPress={onIconPress}>
          <Ionicon
            name={secureTextEntry ? 'eye' : 'eye-off'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    // width: '80%',
    flexDirection: 'row',
    borderRadius: 10,
  },
  inputView: {
    width: '80%',
    paddingLeft: 10,
  },
  inputBox: {
    color: colors.WHITE,
  },
  iconView: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 25,
    color: colors.WHITE,
  },
});

export default PasswordInput;
