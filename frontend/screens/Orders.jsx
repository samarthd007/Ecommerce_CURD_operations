import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, defaultStyle } from '../styles/Styles'
import Header from '../component/Header'
import Loader from '../component/Loader'
import { Headline } from 'react-native-paper'
import OrderItems from '../component/OrderItems'
import { useMessageAndErrorOrderStatus, useSetOrders } from '../utils/hooks'
import { useIsFocused } from '@react-navigation/native'
import { isAdmin } from '../redux/actions/userAction'
import { processOrder } from '../redux/actions/otherAction'
import { useDispatch } from 'react-redux'

const Orders = () => {
    const isFocused = useIsFocused()
    const dispatach = useDispatch()

    const processOrderLoading = useMessageAndErrorOrderStatus(
        dispatach,
        'profile'
    )

    // const isAdmin = info.role === 'admin'

    const { loading, orders } = useSetOrders(isFocused, isAdmin)

    const updateHandler = (_id) => {
        dispatach(processOrder(_id))
    }

    return (
        <View style={{ ...defaultStyle, backgroundColor: Colors.color5 }}>
            <Header back={true} />

            <View
                style={{
                    marginBottom: 20,
                    paddingTop: 70,
                }}
            >
                <Text style={styles.heading}>My Orders </Text>
            </View>
            {loading ? (
                <Loader />
            ) : (
                <View style={{ padding: 10, flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {orders.length > 0 ? (
                            orders.map((item, index) => (
                                <OrderItems
                                    key={item._id}
                                    _id={item._id}
                                    price={item.totalAmount}
                                    status={item.orderStatus}
                                    paymentMethod={item.paymentMethod}
                                    createdAt={item.createdAt.split('T')[0]}
                                    address={`${item.address}, ${item.city} , ${item.country} , ${item.pincode}`}
                                    i={index}
                                    details={orders}
                                    admin={isAdmin}
                                    updateHandler={updateHandler}
                                    loading={processOrderLoading}
                                    detail={item.orderItems}
                                />
                            ))
                        ) : (
                            <Headline style={{ textAlign: 'center' }}>
                                No Order Yet
                            </Headline>
                        )}
                    </ScrollView>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
        padding: 10,
        backgroundColor: Colors.color3,
        color: Colors.color2,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.color3,
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'center',
    },
    forget: {
        color: Colors.color2,
        marginHorizontal: 20,
        marginVertical: 10,
        alignSelf: 'flex-end',
        fontWeight: '400',
    },
    btn: {
        backgroundColor: Colors.color1,
        margin: 20,
        padding: 6,
    },
    or: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '100',
        color: Colors.color2,
        fontWeight: '100',
    },
    link: {
        alignSelf: 'center',
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 20,
        color: 'white',
    },
})

export default Orders
