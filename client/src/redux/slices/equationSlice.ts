import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store.ts'

interface IEquationState {
  inputEquation: string
  initialEquation: string
  balancedEquation: string
  isActiveEqualizeBtn: boolean
}

const initialState: IEquationState = {
  inputEquation: '',
  initialEquation: '',
  balancedEquation: '',
  isActiveEqualizeBtn: false,
}

export const equationSlice = createSlice({
  initialState,
  name: 'equation',
  reducers: {
    setEquation: (state, action: PayloadAction<string>) => {
      state.inputEquation = state.inputEquation + action.payload
    },
    resetEquation: (state) => {
      state.inputEquation = ''
    },
    removeSymbol: (state) => {
      state.inputEquation = state.inputEquation.slice(
        0,
        state.inputEquation.length - 1
      )
    },
    toggleEqualizeBtn: (state) => {
      state.isActiveEqualizeBtn = !state.isActiveEqualizeBtn
    },
    setInitialEquation: (state, action: PayloadAction<string>) => {
      state.initialEquation = action.payload
    },
    resetInitialEquation: (state) => {
      state.initialEquation = ''
    },
    setBalancedEquation: (state, action: PayloadAction<string>) => {
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
export const selectEquation = (state: RootState) => state.equation.inputEquation
export const selectIsActiveEqualizeBtn = (state: RootState) =>
  state.equation.isActiveEqualizeBtn
export const selectBalancedEquation = (state: RootState) =>
  state.equation.balancedEquation
export const selectInitialEquation = (state: RootState) =>
  state.equation.initialEquation

export default equationSlice.reducer
