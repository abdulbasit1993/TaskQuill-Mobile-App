import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../redux/slices/loginSlice';
import signupReducer from '../redux/slices/signupSlice';

export const store = configureStore({
  reducer: {
    loginReducer: loginReducer,
    signupReducer: signupReducer,
  },
});
