import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'
import { otherReducer } from './reducers/otherReducres'
import { productReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        other: otherReducer,
        product: productReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const server = 'https://e-commerce-server-wdha.onrender.com/api/v1'
