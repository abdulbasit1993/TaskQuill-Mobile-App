import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../constants/apiURL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({data, token}, {rejectWithValue}) => {
    console.log('data for dispatch --> ', data);
    try {
      const response = await axios.post(`${BASE_URL}/tasks/add`, data, {
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

export const addTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTask.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default addTaskSlice.reducer;
