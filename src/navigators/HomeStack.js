import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';

const HomeNavigator = createDrawerNavigator();

const HomeStack = () => {
  return (
    <HomeNavigator.Navigator screenOptions={{headerShown: false}}>
      <HomeNavigator.Screen name="HomeScreen" component={HomeScreen} />
    </HomeNavigator.Navigator>
  );
};

export default HomeStack;
