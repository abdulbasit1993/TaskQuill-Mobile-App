import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screens/Auth/Signup';
import Login from '../screens/Auth/Login';
import ForgetPassword from '../screens/Auth/ForgetPassword';

const AuthNavigator = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <AuthNavigator.Navigator screenOptions={{headerShown: false}}>
      <AuthNavigator.Screen name="Login" component={Login} />
      <AuthNavigator.Screen name="Signup" component={Signup} />
      <AuthNavigator.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthNavigator.Navigator>
  );
};

export default AuthStack;
