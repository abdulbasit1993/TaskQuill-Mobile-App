import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import MainAppNavigator from './navigators';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainAppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
