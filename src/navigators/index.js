import React, {useState, useEffect} from 'react';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {useSelector} from 'react-redux';

const MainAppNavigator = () => {
  const token = useSelector(state => state.loginReducer?.data?.token);
  console.log('token ==> ', token);

  if (token) {
    return <HomeStack />;
  } else {
    return <AuthStack />;
  }
};

export default MainAppNavigator;
