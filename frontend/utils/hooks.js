import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { loadUser } from '../redux/actions/userAction'
import axios from 'axios'
import { server } from '../redux/store'
import { getAdminProducts } from '../redux/actions/productAction'

export const useMessageAndErrorUser = (dispatch, navigateTo = 'login') => {
    const navigate = useNavigation()

    const { loading, message, error, isAuthenticated } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            navigate.reset({
                index: 0,
                routes: [{ name: navigateTo }],
            })
            Toast.show({
                type: 'success',
                text1: `Welcome back ! ${message.user.name}`,
            })
            dispatch({
                type: 'clearMessage',
            })
            dispatch(loadUser())
        }
    }, [error, message, dispatch])

    return loading
}

export const useMessageAndErrorUserLogout = (
    dispatch,
    navigateTo = 'login'
) => {
    const navigate = useNavigation()

    const { loading, message, error, isAuthenticated } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: `${error} `,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            navigate.navigate(navigateTo)
            Toast.show({
                type: 'success',
                text1: `${message.msg} `,
            })
            dispatch({
                type: 'clearMessage',
            })

            dispatch(loadUser())
        }
    }, [error, message, dispatch])

    return loading
}

export const useMessageAndErrorOther = (dispatch, navigateTo, func) => {
    const navigate = useNavigation()

    const { loading, message, error } = useSelector((state) => state.other)

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            Toast.show({
                type: 'success',
                text1: message.msg
                    ? `${message.msg}`
                    : `Profile updated Successfully`,
            })
            dispatch({
                type: 'clearMessage',
            })

            func && dispatch(func())
            if (navigateTo) {
                navigate.navigate(navigateTo)
            }
        }
    }, [error, message, dispatch])

    return loading
}

export const useMessageAndErrorOrderStatus = (dispatch, navigateTo, func) => {
    const navigate = useNavigation()

    const { loading, message, error } = useSelector((state) => state.other)

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            Toast.show({
                type: 'success',
                text1: message.message
                    ? `${message.message}`
                    : `Profile updated Successfully`,
            })
            dispatch({
                type: 'clearMessage',
            })

            func && dispatch(func())
            if (navigateTo) {
                navigate.navigate(navigateTo)
            }
        }
    }, [error, message, dispatch])

    return loading
}

export const useSetCategories = (setCategories, isFocused) => {
    useEffect(() => {
        axios
            .get(`${server}/products/category/categories`)
            .then((res) => {
                setCategories(res.data.categories)
            })
            .catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: error.response.data.msg,
                })
            })
    }, [isFocused])
}

export const useOrderPlacedSuccessfully = (dispatch, navigateTo, func) => {
    const navigate = useNavigation()

    const { loading, message, error } = useSelector((state) => state.other)

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            Toast.show({
                type: 'success',
                text1: 'Order Placed Successfully !!',
            })
            dispatch({
                type: 'clearMessage',
            })

            func && dispatch(func())
            if (navigateTo) {
                navigate.reset({
                    index: 0,
                    routes: [{ name: navigateTo }],
                })
            }
        }
    }, [error, message, dispatch])

    return loading
}

export const useSetOrders = (isFocused, isAdmin = false) => {
    const [orders, setOrders] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`${server}/orders/${isAdmin ? '' : 'showAllMyOrders'}`)
            .then((res) => {
                setOrders(res.data.orders)
                setLoading(false)
            })
            .catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: error.response.data.msg,
                })
                setLoading(false)
            })
    }, [isFocused])

    return { loading, orders }
}

export const useAdminProducts = (dispatch, isFocused) => {
    const { products, error, loading, outOfStock, inStock } = useSelector(
        (state) => state.product
    )
    if (error) {
        Toast.show({
            type: 'error',
            text1: error,
        })
        dispatch({
            type: 'clearError',
        })
    }
    useEffect(() => {
        dispatch(getAdminProducts())
    }, [dispatch, isFocused, error])

    return { products, loading, outOfStock, inStock }
}

export const useMessageAndErrorAddCategory = (dispatch, navigateTo, func) => {
    const navigate = useNavigation()

    const { loading, message, error } = useSelector((state) => state.other)

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            Toast.show({
                type: 'success',
                text1: message.message
                    ? ` ${message.message}`
                    : 'Product created successfully',
            })
            dispatch({
                type: 'clearMessage',
            })

            func && dispatch(func())
            if (navigateTo) {
                navigate.navigate(navigateTo)
            }
        }
    }, [error, message, dispatch])

    return loading
}

export const useMessageAndErrorProductUpdated = (
    dispatch,
    navigateTo,
    func
) => {
    const navigate = useNavigation()

    const { loading, message, error } = useSelector((state) => state.other)

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            Toast.show({
                type: 'success',
                text1: message.message
                    ? ` ${message.message}`
                    : 'Product updated successfully',
            })
            dispatch({
                type: 'clearMessage',
            })

            func && dispatch(func())
            if (navigateTo) {
                navigate.navigate(navigateTo)
            }
        }
    }, [error, message, dispatch])

    return loading
}

export const useMessageAndErrorProductdeletion = (
    dispatch,
    navigateTo,
    func
) => {
    const navigate = useNavigation()

    const { loading, message, error } = useSelector((state) => state.other)

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            Toast.show({
                type: 'success',
                text1: message.message
                    ? ` ${message.message}`
                    : 'Product deleted successfully',
            })
            dispatch({
                type: 'clearMessage',
            })

            func && dispatch(func())
            if (navigateTo) {
                navigate.navigate(navigateTo)
            }
        }
    }, [error, message, dispatch])

    return loading
}

export const useMessageAndErrorForgetPassword = (
    dispatch,
    navigateTo,
    func
) => {
    const navigate = useNavigation()

    const { loading, message, error } = useSelector((state) => state.other)

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
            dispatch({
                type: 'clearError',
            })
        }
        if (message) {
            Toast.show({
                type: 'success',
                text1: message.message
                    ? ` ${message.message}`
                    : 'Success! Password Updated.',
            })
            dispatch({
                type: 'clearMessage',
            })

            func && dispatch(func())
            if (navigateTo) {
                navigate.navigate(navigateTo)
            }
        }
    }, [error, message, dispatch])

    return loading
}
