import React, {useState, useEffect} from 'react';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MainAppNavigator = () => {
  const navigation = useNavigation();

  const token = useSelector(state => state.loginReducer?.data?.token);
  // console.log('token ==> ', token);

  useEffect(() => {
    if (token) {
      navigation.navigate('Root');
    } else {
      navigation.navigate('Auth');
    }
  }, [token, navigation]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={HomeStack} />

      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
