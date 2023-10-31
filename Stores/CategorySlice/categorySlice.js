// categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories } from '../../Services/CategoriesServices';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (lastKey, { dispatch }) => {
  const categories = await getAllCategories();
  dispatch(storeCategories(categories)); // Dispatch a regular action to store categories in the Redux store
  return categories; // Return the fetched categories if needed
});


const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    storeCategories: (state, action) => {
      state.categories = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { storeCategories } = categorySlice.actions;
export default categorySlice.reducer;
