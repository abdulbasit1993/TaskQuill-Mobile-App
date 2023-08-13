import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <View style={{width: '90%', justifyContent: 'center'}}>
        <TextInput
          placeholder="Search Tasks"
          placeholderTextColor={'#eee'}
          style={styles.input}
          {...props}
        />
      </View>

      <View
        style={{width: '10%', alignItems: 'center', justifyContent: 'center'}}>
        <Ionicon name="search" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    height: 55,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  icon: {
    color: colors.WHITE,
    fontSize: 25,
  },
  input: {
    color: colors.WHITE,
  },
});

export default SearchBar;
