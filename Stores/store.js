// store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './CategorySlice/categorySlice';
import { refreshSlice } from './RefreshSlice/refreshSlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    isRefreshing: refreshSlice.reducer,
    // ...other reducers if any
  },
});

export default store;
