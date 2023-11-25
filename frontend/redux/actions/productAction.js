import axios from 'axios'
import { server } from '../store'

export const getAllProductsByFilter =
    (keyword, category) => async (dispatch) => {
        try {
            dispatch({
                type: 'getAllProductRequest',
            })
            //axois
            const { data } = await axios.get(
                `${server}/products/all/byfilter?keyword=${keyword}&category=${category}`,
                {
                    withCredentials: true,
                }
            )

            dispatch({
                type: 'getAllProductSuccess',
                payload: data.products,
            })
        } catch (error) {
            dispatch({
                type: 'getAllProductFail',
                payload: error.response.data.msg,
            })
        }
    }

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAdminProductRequest',
        })
        //axois
        const { data } = await axios.get(
            `${server}/products/adminproducts/getproducts`,
            {
                withCredentials: true,
            }
        )
        dispatch({
            type: 'getAdminProductSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'getAdminProductFail',
            payload: error.response.data.msg,
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'getProductDetailsRequest',
        })
        //axois
        const { data } = await axios.get(`${server}/products/${id}`, {
            withCredentials: true,
        })

        dispatch({
            type: 'getProductDetailsSuccess',
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: 'getProductDetailsFail',
            payload: error.response.data.msg,
        })
    }
}
