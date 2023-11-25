import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Colors, defaultStyle } from '../styles/Styles'
import Header from '../component/Header'
import Heading from '../component/Heading'
import { Button } from 'react-native-paper'
import CartItem from '../component/CartItem'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigation()

    const { cartItems } = useSelector((state) => state.cart)

    const decrementHandler = (_id, name, stock, imgSrc, price, quantity) => {
        const newQuantity = quantity - 1
        if (1 >= quantity) {
            return dispatch({
                type: 'removeFromCart',
                payload: _id,
            })
        } else {
            dispatch({
                type: 'addToCart',
                payload: {
                    product: _id,
                    name: name,
                    price: price,
                    image: imgSrc,
                    stock,
                    quantity: newQuantity,
                },
            })
        }
    }

    const incrementHandler = (_id, name, stock, imgSrc, price, quantity) => {
        const newQuantity = quantity + 1
        if (stock <= quantity) {
            return Toast.show({
                type: 'error',
                text1: 'Stock Limit Exceeded',
            })
        } else {
            dispatch({
                type: 'addToCart',
                payload: {
                    product: _id,
                    name: name,
                    price: price,
                    image: imgSrc,
                    stock,
                    quantity: newQuantity,
                },
            })
        }
    }

    return (
        <View
            style={{
                ...defaultStyle,
                padding: 0,
            }}
        >
            {/* Header */}
            <Header back={true} emptyCart={true} cartItems={cartItems} />

            {/* Heading */}

            <Heading
                text1="Shopping"
                text2="Cart"
                containerStyle={{ paddingTop: 70, marginLeft: 30 }}
            />

            <View style={{ paddingVertical: 20, flex: 1 }}>
                <ScrollView>
                    {cartItems.length > 0 ? (
                        cartItems.map((i, index) => (
                            <CartItem
                                key={i.product}
                                _id={i.product}
                                name={i.name}
                                price={i.price}
                                stock={i.stock}
                                quantity={i.quantity}
                                imgSrc={i.image}
                                index={index}
                                incrementHandler={incrementHandler}
                                decrementHandler={decrementHandler}
                                navigate={navigate}
                            />
                        ))
                    ) : (
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: '500',
                                paddingTop: 160,
                            }}
                        >
                            No Items added yet
                        </Text>
                    )}
                </ScrollView>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 35,
                }}
            >
                <Text style={{ fontSize: 17 }}>{cartItems.length} Items</Text>
                <Text style={{ fontWeight: '700', fontSize: 17 }}>
                    ₹{' '}
                    {cartItems.reduce(
                        (prev, curr) => prev + curr.quantity * curr.price,
                        0
                    )}
                </Text>
            </View>
            <TouchableOpacity
                onPress={
                    cartItems.length > 0
                        ? () => navigate.navigate('confirmorder')
                        : null
                }
            >
                <Button
                    style={{
                        backgroundColor: Colors.color3,
                        borderRadius: 100,
                        padding: 5,
                        margin: 30,
                    }}
                    textColor="white"
                    icon={'cart'}
                >
                    CheckOut
                </Button>
            </TouchableOpacity>
        </View>
    )
}

// const Heading = () => (
//     <View
//         style={{
//             paddingTop: 70,
//             marginLeft: 35,
//         }}
//     >
//         <Text style={{ fontSize: 25 }}>Shopping</Text>
//         <Text style={{ fontSize: 25, fontWeight: '900' }}>Cart</Text>
//     </View>
// )

export default Cart
