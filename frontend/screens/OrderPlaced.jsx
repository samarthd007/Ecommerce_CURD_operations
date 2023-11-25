import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Colors } from '../styles/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserInfo } from '../redux/actions/userAction'

const OrderPlaced = ({ route }) => {
    const dispatach = useDispatch()
    const navigate = useNavigation()
    const isFocused = useIsFocused()

    const { info, isAuthenticated } = useSelector((state) => state.user)

    useState(() => {
        dispatach(loadUserInfo())
    }, [dispatach, isFocused])

    return (
        <View style={styles.container}>
            {/* Green success tick mark image */}
            <Image
                source={require('../assets/orders.png')}
                style={styles.successIcon}
            />

            {/* Order placed address */}
            <Text
                style={{
                    fontSize: 25,
                    color: '#0a6437',
                    marginBottom: 20,
                    fontWeight: '700',
                }}
            >
                Order Placed SuccessFully! ✓
            </Text>
            <Text style={styles.addressText} numberOfLines={2}>
                Address: {info.address}
            </Text>
            <Text style={styles.addressText}>City: {info.city}</Text>
            <Text style={styles.addressText}>Pincode: {info.pincode}</Text>

            {/* Home button */}
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() =>
                    navigate.reset({
                        index: 0,
                        routes: [{ name: 'home' }],
                    })
                }
            >
                <Text style={styles.homeButtonText}>Home</Text>
            </TouchableOpacity>
            <Text style={{ ...styles.addressText, marginTop: 25 }}>
                check in My Orders for more info 👇🏻
            </Text>
            <TouchableOpacity
                style={{ ...styles.homeButton, marginTop: 10 }}
                onPress={() =>
                    navigate.reset({
                        index: 0,
                        routes: [{ name: 'profile' }],
                    })
                }
            >
                <Text
                    style={{
                        ...styles.homeButtonText,
                    }}
                >
                    My Orders
                </Text>
            </TouchableOpacity>
        </View>
    )
}

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Grey background color
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    addressText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '500',

        color: '#333', // Good font styling for address
    },
    homeButton: {
        backgroundColor: '#a72852', // Green color for the button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 20,
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
})

export default OrderPlaced
