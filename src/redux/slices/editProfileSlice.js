import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../constants/apiURL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async ({data, token}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.data;
      return resData;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(editProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default editProfileSlice.reducer;
