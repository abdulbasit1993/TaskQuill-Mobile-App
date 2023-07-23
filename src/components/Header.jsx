import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: colors.WHITE,
  },
});

export default Header;
