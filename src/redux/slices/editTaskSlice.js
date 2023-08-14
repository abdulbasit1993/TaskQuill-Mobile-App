import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../constants/apiURL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async ({id, data, token}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`${BASE_URL}/tasks/update/${id}`, data, {
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

export const editTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(editTask.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(editTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default editTaskSlice.reducer;
