import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  equation: '',
  balancedEquation: '',
  isActiveEqualizeBtn: false,
}

export const equationSlice = createSlice({
  initialState,
  name: 'equation',
  reducers: {
    setEquation: (state, action) => {
      state.equation = state.equation + action.payload
    },
    resetEquation: (state) => {
      state.equation = ''
    },
    removeSymbol: (state) => {
      state.equation = state.equation.slice(0, state.equation.length - 1) // TODO remove WHOLE element
    },
    toggleEqualizeBtn: (state) => {
      state.isActiveEqualizeBtn = !state.isActiveEqualizeBtn
    },
    setBalancedEquation: (state, action) => {
      state.balancedEquation = action.payload
    },
    resetBalancedEquation: (state) => {
      state.balancedEquation = ''
    },
  },
})

export const {
  setEquation,
  resetEquation,
  removeSymbol,
  toggleEqualizeBtn,
  setBalancedEquation,
  resetBalancedEquation,
} = equationSlice.actions
export const selectEquation = (state) => state.equation.equation
export const selectIsActiveEqualizeBtn = (state) =>
  state.equation.isActiveEqualizeBtn
export const selectBalancedEquation = (state) => state.equation.balancedEquation

export default equationSlice.reducer
