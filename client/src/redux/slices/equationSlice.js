import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inputEquation: '',
  initialEquation: '',
  balancedEquation: '',
  isActiveEqualizeBtn: false,
}

export const equationSlice = createSlice({
  initialState,
  name: 'equation',
  reducers: {
    setEquation: (state, action) => {
      state.inputEquation = state.inputEquation + action.payload
    },
    resetEquation: (state) => {
      state.inputEquation = ''
    },
    removeSymbol: (state) => {
      state.inputEquation = state.inputEquation.slice(
        0,
        state.inputEquation.length - 1
      ) // TODO remove WHOLE element
    },
    toggleEqualizeBtn: (state) => {
      state.isActiveEqualizeBtn = !state.isActiveEqualizeBtn
    },
    setInitialEquation: (state, action) => {
      state.initialEquation = action.payload
    },
    resetInitialEquation: (state) => {
      state.initialEquation = ''
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
  setInitialEquation,
  resetInitialEquation,
} = equationSlice.actions
export const selectEquation = (state) => state.equation.inputEquation
export const selectIsActiveEqualizeBtn = (state) =>
  state.equation.isActiveEqualizeBtn
export const selectBalancedEquation = (state) => state.equation.balancedEquation
export const selectInitialEquation = (state) => state.equation.initialEquation

export default equationSlice.reducer
