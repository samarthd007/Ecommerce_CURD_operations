import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, defaultStyle } from '../../styles/Styles'
import Header from '../../component/Header'
import Loader from '../../component/Loader'
import { Headline } from 'react-native-paper'
import OrderItems from '../../component/OrderItems'
import { useMessageAndErrorOrderStatus, useSetOrders } from '../../utils/hooks'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { isAdmin } from '../../redux/actions/userAction'
import { processOrder } from '../../redux/actions/otherAction'

const AdminOrders = () => {
    const dispatach = useDispatch()
    const isFocused = useIsFocused()

    const { loading, orders } = useSetOrders(isFocused, isAdmin)
    const processOrderLoading = useMessageAndErrorOrderStatus(
        dispatach,
        'adminpanel'
    )

    const updateHandler = (_id) => {
        dispatach(processOrder(_id))
    }

    return (
        <View style={{ ...defaultStyle, backgroundColor: Colors.color5 }}>
            <Header back={true} />

            {/* Heading */}
            <View
                style={{
                    marginBottom: 20,
                    paddingTop: 70,
                }}
            >
                <Text style={styles.heading}>All Orders</Text>
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
                                    address={`${item.address},  ${item.city} ,  ${item.country}  ${item.pincode}`}
                                    i={index}
                                    name={item.name}
                                    admin={true}
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
        padding: 20,
        backgroundColor: Colors.color3,
        borderRadius: 10,
        elevation: 10,
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
export default AdminOrders
