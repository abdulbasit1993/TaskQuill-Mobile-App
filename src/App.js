import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigators/AuthStack';
import {store} from './redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
