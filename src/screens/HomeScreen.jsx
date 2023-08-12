import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {colors} from '../constants/colors';
import Header from '../components/Header';

const HomeScreen = ({navigation}) => {
  const [greeting, setGreeting] = useState('Good Morning');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const morningStart = 0;
  const afternoonStart = 12;
  const eveningStart = 18;

  useEffect(() => {
    if (currentHour >= morningStart && currentHour < afternoonStart) {
      setGreeting('Good Morning');
    } else if (currentHour >= afternoonStart && currentHour < eveningStart) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="TaskQuill"
        menuEnabled
        onMenuPress={() => navigation.toggleDrawer()}
      />

      <View style={styles.subContainer}>
        <View style={{padding: 10}}>
          <Text style={styles.greetingText}>{greeting}, User!</Text>
        </View>

        <View style={{padding: 10}}>
          <Text style={styles.subHeading}>
            What would you like to do today?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY,
  },
  subContainer: {
    marginHorizontal: 15,
  },
  greetingText: {
    fontSize: 15,
    color: colors.WHITE,
  },
  subHeading: {
    fontSize: 18,
    color: colors.WHITE,
    fontWeight: '600',
  },
});

export default HomeScreen;
