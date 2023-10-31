import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const refreshSlice = createSlice({
  name: 'iSRefreshing',
  initialState,
  reducers: {
    startRefreshing: (state) => {
      state.value = true
    },
    stopRefreshing: (state) => {
      state.value = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { startRefreshing, stopRefreshing } = refreshSlice.actions

export default refreshSlice.reducer