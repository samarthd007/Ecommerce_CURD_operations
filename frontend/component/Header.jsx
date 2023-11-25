import { Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-paper'
import { Colors } from '../styles/Styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

const Header = ({ back, emptyCart = false, cartItems }) => {
    const navigate = useNavigation()
    const route = useRoute()
    const distaptch = useDispatch()
    const [sure, setSure] = useState(false)

    const emptyCartHandler = () => {
        cartItems.length > 0 &&
            Alert.alert('Sure You want to empty the cart???', '', [
                {
                    text: 'NO',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        distaptch({
                            type: 'clearCart',
                        })
                    },
                },
            ])
    }

    return (
        <>
            {back && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: 20,
                        top: 30,
                        zIndex: 10,
                    }}
                    onPress={() => {
                        navigate.goBack()
                    }}
                >
                    <Avatar.Icon
                        icon={'arrow-left'}
                        color={
                            route.name === 'productdetails'
                                ? Colors.color2
                                : Colors.color3
                        }
                        style={{
                            backgroundColor: Colors.color4,
                        }}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 17,
                    top: 30,
                    zIndex: 10,
                }}
                onPress={
                    emptyCart
                        ? emptyCartHandler
                        : () => {
                              navigate.navigate('cart')
                          }
                }
            >
                <Avatar.Icon
                    icon={emptyCart ? 'delete-outline' : 'cart-outline'}
                    color={
                        route.name === 'productdetails'
                            ? Colors.color2
                            : Colors.color3
                    }
                    style={{
                        backgroundColor: Colors.color4,
                    }}
                />
            </TouchableOpacity>
        </>
    )
}

export default Header
