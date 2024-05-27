import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: '',
}

export const errorSlice = createSlice({
  initialState,
  name: 'error',
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: () => {
      return initialState
    },
  },
})

export const { setError, clearError } = errorSlice.actions
export const selectError = (state) => state.error.error
export default errorSlice.reducer
