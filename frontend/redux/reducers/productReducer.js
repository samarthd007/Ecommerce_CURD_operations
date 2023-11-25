import { createReducer } from '@reduxjs/toolkit'

export const productReducer = createReducer(
    {
        products: [],
        product: {},
    },
    (builder) => {
        builder
            .addCase('getAllProductRequest', (state) => {
                state.loading = true
            })
            .addCase('getAdminProductRequest', (state) => {
                state.loading = true
            })
            .addCase('getProductDetailsRequest', (state) => {
                state.loading = true
            })

        builder
            .addCase('getAllProductSuccess', (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase('getAdminProductSuccess', (state, action) => {
                state.loading = false
                state.products = action.payload.product
                state.outOfStock = action.payload.outOfStock
                state.inStock = action.payload.inStock
            })
            .addCase('getProductDetailsSuccess', (state, action) => {
                state.loading = false
                state.product = action.payload
            })

        builder
            .addCase('getAllProductFail', (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase('getAdminProductFail', (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase('getProductDetailsFail', (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        builder.addCase('clearError', (state) => {
            state.error = null
        })
        builder.addCase('clearMessage', (state) => {
            state.message = null
        })
    }
)
