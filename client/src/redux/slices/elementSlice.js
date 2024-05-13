import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  symbol: '',
}

export const elementSlice = createSlice({
  initialState,
  name: 'element',
  reducers: {
    setElementSymbol: (state, action) => {
      state.symbol = action.payload
    },
    resetElement: () => {
      return initialState
    },
  },
})

export const { setElementSymbol, resetElement } = elementSlice.actions
export const selectElementSymbol = (state) => state.element.symbol

export default elementSlice.reducer
