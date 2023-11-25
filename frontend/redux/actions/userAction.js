import axios from 'axios'
import { server } from '../store'

export let isAdmin = false
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'loginRequest',
        })
        //axois
        const { data } = await axios.post(
            `${server}/auth/login`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
        isAdmin = data.user.role === 'admin'
        dispatch({
            type: 'loginSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'loginFail',
            payload: error.response.data.msg,
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'loadUserRequest',
        })
        //axois
        const { data } = await axios.get(`${server}/users/showme`, {
            withCredentials: true,
        })
        isAdmin = data.user.role === 'admin'
        dispatch({
            type: 'loadUserSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'loadUserFail',
            payload: error.response.data.msg,
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'logoutRequest',
        })
        //axois
        const { data } = await axios.get(`${server}/auth/logout`, {
            withCredentials: true,
        })
        dispatch({
            type: 'logoutSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'logoutFail',
            payload: error.response.data.msg,
        })
    }
}

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'registerRequest',
        })
        //axois
        const { data } = await axios.post(`${server}/auth/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        })
        dispatch({
            type: 'registerSuccess',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'registerFail',
            payload: error.response.data.msg,
        })
    }
}

export const loadUserInfo = () => async (dispatch) => {
    try {
        dispatch({
            type: 'loadUserInfoRequest',
        })
        //axois
        const { data } = await axios.get(`${server}/users/userinfo`, {
            withCredentials: true,
        })
        dispatch({
            type: 'loadUserInfoSuccess',
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: 'loadUserInfoFail',
            payload: error.response.data.msg,
        })
    }
}
