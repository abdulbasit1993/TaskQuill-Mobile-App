import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../constants/apiURL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, data);
      const resData = await response.data;
      return resData;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signupUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = action.payload;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default signupSlice.reducer;
