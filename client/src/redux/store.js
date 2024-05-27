import { configureStore } from '@reduxjs/toolkit'
import { elementsApi } from './elementsApi.js'
import equationReducer from './slices/equationSlice.js'
import errorReducer from './slices/errorSlice.js'

const store = configureStore({
  reducer: {
    [elementsApi.reducerPath]: elementsApi.reducer,
    equation: equationReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(elementsApi.middleware),
})

export default store
