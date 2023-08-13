import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../constants/apiURL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.data;
      return resData;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTasks.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getTaskSlice.reducer;
