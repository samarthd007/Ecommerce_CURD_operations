import axios from 'axios'
import { server } from '../store'

export const updatePassword = (oldPassword, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'updatePasswordRequest',
        })
        const { data } = await axios.put(
            `${server}/users/updateUserPassword`,
            {
                oldPassword: oldPassword,
                newPassword: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
        dispatch({
            type: 'updatePasswordSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'updatePasswordFail',
            payload: error.response.data.msg,
        })
    }
}

export const updateProfile =
    (email, name, address, city, country, pincode) => async (dispatch) => {
        try {
            dispatch({
                type: 'updateProfileRequest',
            })
            const { data } = await axios.put(
                `${server}/users/updateUser`,
                {
                    email,
                    name,
                    address,
                    city,
                    country,
                    pincode,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )
            dispatch({
                type: 'updateProfileSuccess',
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: 'updateProfileFail',
                payload: error.response.data.msg,
            })
        }
    }

export const updateProfilePic = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'updatePicRequest',
        })
        //axois
        const { data } = await axios.put(
            `${server}/users/updatePicture`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        )
        dispatch({
            type: 'updatePicSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'updatePicFail',
            payload: error.response.data.msg,
        })
    }
}

export const placeOrder =
    (
        items,
        city,
        country,
        pincode,
        taxPrice,
        shippingCharges,
        itemsPrice,
        totalAmount,
        address,
        paymentMethod,
        paymentInfo,
        paymentStatusInfo
    ) =>
    async (dispatch) => {
        try {
            dispatch({
                type: 'placeOrderRequest',
            })

            const { data } = await axios.post(
                `${server}/orders`,
                {
                    items,
                    city,
                    country,
                    pincode,
                    taxPrice,
                    shippingCharges,
                    itemsPrice,
                    totalAmount,
                    address,
                    paymentMethod,
                    paymentInfo: paymentInfo,
                    paymentStatusInfo: paymentStatusInfo,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )

            dispatch({
                type: 'placeOrderSuccess',
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: 'placeOrderFail',
                payload: error.response.data.msg,
            })
        }
    }

export const processOrder = (_id) => async (dispatch) => {
    try {
        dispatch({
            type: 'processOrderRequest',
        })

        const { data } = await axios.put(
            `${server}/orders/orderstatus/${_id}`,

            {
                withCredentials: true,
            }
        )
        dispatch({
            type: 'processOrderSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'processOrderFail',
            payload: error.response.data.msg,
        })
    }
}

export const addCategory = (category) => async (dispatch) => {
    try {
        dispatch({
            type: 'addCategoryRequest',
        })

        const { data } = await axios.post(
            `${server}/products/category/categories`,
            {
                category,
            },

            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
        dispatch({
            type: 'addCategorySuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'addCategoryFail',
            payload: error.response.data.msg,
        })
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteCategoryRequest',
        })

        const { data } = await axios.delete(
            `${server}/products/category/categories/${id}`,

            {
                withCredentials: true,
            }
        )
        dispatch({
            type: 'deleteCategorySuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'deleteCategoryFail',
            payload: error.response.data.msg,
        })
    }
}

export const createProduct = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'addProductRequest',
        })
        //axois
        const { data } = await axios.post(`${server}/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        })
        dispatch({
            type: 'addProductSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'addProductFail',
            payload: error.response.data.msg,
        })
    }
}

export const updateCreatedProduct =
    (_id, name, price, description, category, stock) => async (dispatch) => {
        try {
            dispatch({
                type: 'updateProductRequest',
            })
            //axois
            const { data } = await axios.put(
                `${server}/products/${_id}`,
                {
                    name,
                    price,
                    description,
                    category,
                    stock,
                },
                {
                    withCredentials: true,
                }
            )
            dispatch({
                type: 'updateProductSuccess',
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: 'updateProductFail',
                payload: error.response.data.msg,
            })
        }
    }

export const updateProductImage = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'updateProductImageRequest',
        })
        //axois
        const { data } = await axios.post(
            `${server}/products/images/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        )
        dispatch({
            type: 'updateProductImageSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'updateProductImageFail',
            payload: error.response.data.msg,
        })
    }
}

export const deleteProductImage = (_id, id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteProductImageRequest',
        })
        //axois
        const { data } = await axios.delete(
            `${server}/products/images/${_id}?id=${id}`,

            {
                withCredentials: true,
            }
        )
        dispatch({
            type: 'deleteProductImageSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'deleteProductImageFail',
            payload: error.response.data.msg,
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteProductRequest',
        })
        //axois
        const { data } = await axios.delete(
            `${server}/products/${id}`,

            {
                withCredentials: true,
            }
        )
        dispatch({
            type: 'deleteProductSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'deleteProductFail',
            payload: error.response.data.msg,
        })
    }
}

export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: 'forgetPasswordRequest',
        })
        //axois
        console.log(email)

        const { data } = await axios.post(
            `${server}/users/forgetPassword`,
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
        console.log(data)

        dispatch({
            type: 'forgetPasswordSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'forgetPasswordFail',
            payload: error.response.data.msg,
        })
    }
}

export const resetPassword = (otp, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'resetPasswordRequest',
        })
        //axois
        const { data } = await axios.put(
            `${server}/users/forgetPassword`,
            {
                otp,
                password,
            },
            {
                withCredentials: true,
            }
        )
        dispatch({
            type: 'resetPasswordSuccess',
            payload: data,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'resetPasswordFail',
            payload: error.response.data.msg,
        })
    }
}
