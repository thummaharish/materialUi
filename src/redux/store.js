import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { fakeApi } from './services/fakeApi'


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [fakeApi.reducerPath]: fakeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fakeApi.middleware),
})

setupListeners(store.dispatch)


export default store