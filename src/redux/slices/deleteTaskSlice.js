import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../constants/apiURL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({data, token}, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`${BASE_URL}/tasks/delete/${data}`, {
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

export const deleteTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(deleteTask.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default deleteTaskSlice.reducer;
