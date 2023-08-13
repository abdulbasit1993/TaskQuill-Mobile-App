import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import loginReducer from './slices/loginSlice';
import signupReducer from './slices/signupSlice';
import forgetPasswordReducer from './slices/forgetPasswordSlice';
import userProfileReducer from './slices/userProfileSlice';
import getTaskReducer from './slices/getTaskSlice';
import addTaskReducer from './slices/addTaskSlice';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  signupReducer: signupReducer,
  forgetPasswordReducer: forgetPasswordReducer,
  userProfileReducer: userProfileReducer,
  getTaskReducer: getTaskReducer,
  addTaskReducer: addTaskReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['signupReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
