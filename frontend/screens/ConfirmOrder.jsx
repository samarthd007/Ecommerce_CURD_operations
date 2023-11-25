import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, defaultStyle } from '../styles/Styles'
import Header from '../component/Header'
import Heading from '../component/Heading'
import ConfirmOrderItem from '../component/ConfirmOrderItem'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'

const ConfirmOrder = () => {
    const navigate = useNavigation()

    const { cartItems } = useSelector((state) => state.cart)

    const [itemsPrice] = useState(
        cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
    )
    const [shippingCost] = useState(itemsPrice > 10000 ? 20 : 100)
    const [tax] = useState(Number((0.18 * itemsPrice).toFixed()))
    const [total] = useState(shippingCost + tax + itemsPrice)

    return (
        <View style={defaultStyle}>
            <Header back={true} />
            {/* Heading */}
            <Heading
                text1="Confirm"
                text2="Order"
                containerStyle={{
                    paddingTop: 60,
                }}
            />
            <View
                style={{
                    paddingVertical: 20,
                    flex: 1,
                }}
            >
                <ScrollView>
                    {cartItems.map((i) => (
                        <ConfirmOrderItem
                            key={i.product}
                            name={i.name}
                            price={i.price}
                            image={i.image}
                            quantity={i.quantity}
                        />
                    ))}
                </ScrollView>
            </View>
            <PriceTag heading={'SubTotal'} value={itemsPrice} />

            <PriceTag heading={'Shipping Fee'} value={shippingCost} />

            <PriceTag heading={'Tax'} value={tax} />

            <PriceTag heading={'Total'} value={total} />

            <TouchableOpacity
                onPress={() =>
                    navigate.navigate('payment', {
                        itemsPrice,
                        shippingCost,
                        total,
                        tax,
                    })
                }
            >
                <Button
                    style={{
                        backgroundColor: Colors.color3,
                        borderRadius: 100,
                        padding: 5,
                        margnin: 10,
                    }}
                    textColor="white"
                    icon={'chevron-right'}
                >
                    Payment
                </Button>
            </TouchableOpacity>
        </View>
    )
}

const PriceTag = ({ heading, value }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 5,
        }}
    >
        <Text style={{ fontWeight: '900' }}>{heading}</Text>

        <Text>₹ {value}</Text>
    </View>
)

export default ConfirmOrder
