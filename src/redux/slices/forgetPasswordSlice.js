import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../constants/apiURL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const forgetPassword = createAsyncThunk(
  'forgetPwd/forgetPassword',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/forget-password`,
        data,
      );
      const resData = await response.data;
      return resData;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const forgetPasswordSlice = createSlice({
  name: 'forgetPwd',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(forgetPassword.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default forgetPasswordSlice.reducer;
