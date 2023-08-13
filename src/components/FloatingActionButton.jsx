import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/colors';

const FloatingActionButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <EntypoIcon name="plus" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: 60,
    height: 60,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  icon: {
    color: colors.WHITE,
    fontSize: 35,
  },
});

export default FloatingActionButton;
