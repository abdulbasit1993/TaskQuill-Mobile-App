import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../constants/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({title, menuEnabled}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {menuEnabled && (
          <TouchableOpacity>
            <MaterialCommunityIcon name="menu" style={styles.menuIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{width: '60%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View
        style={{
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.PRIMARY,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: colors.WHITE,
  },
  menuIcon: {
    color: colors.WHITE,
    fontSize: 28,
  },
});

export default Header;
