import { configureStore } from '@reduxjs/toolkit'
import { elementsApi } from './elementsApi.js'

const store = configureStore({
  reducer: {
    [elementsApi.reducerPath]: elementsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(elementsApi.middleware),
})

export default store
