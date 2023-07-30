import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {colors} from '../constants/colors';
import Header from '../components/Header';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="TaskQuill" menuEnabled />

      <View>
        <Text style={{color: colors.WHITE, fontSize: 22}}>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY,
  },
});

export default HomeScreen;
