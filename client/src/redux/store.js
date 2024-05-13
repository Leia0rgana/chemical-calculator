import { configureStore } from '@reduxjs/toolkit'
import { elementsApi } from './elementsApi.js'
import elementReducer from './slices/elementSlice.js'

const store = configureStore({
  reducer: {
    [elementsApi.reducerPath]: elementsApi.reducer,
    element: elementReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(elementsApi.middleware),
})

export default store
