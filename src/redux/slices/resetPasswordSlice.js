import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../constants/apiURL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  'resetPwd/resetPassword',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/reset-password`,
        data,
      );
      const resData = await response.data;
      return resData;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const resetPasswordSlice = createSlice({
  name: 'resetPwd',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(resetPassword.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default resetPasswordSlice.reducer;
