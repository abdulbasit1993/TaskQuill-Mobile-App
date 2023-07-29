import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../constants/colors';

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, containerStyles]}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.WHITE} />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    color: colors.WHITE,
  },
});

export default CustomButton;
