import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const HomeNavigator = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeNavigator.Navigator screenOptions={{headerShown: false}}>
      <HomeNavigator.Screen name="HomeScreen" component={HomeScreen} />
    </HomeNavigator.Navigator>
  );
};

export default HomeStack;
