import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Colors, defaultStyle } from '../styles/Styles'
import Header from '../component/Header'
import Heading from '../component/Heading'
import { Button, RadioButton } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserInfo } from '../redux/actions/userAction'
import { placeOrder } from '../redux/actions/otherAction'
import { useOrderPlacedSuccessfully } from '../utils/hooks'
import { useStripe } from '@stripe/stripe-react-native'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import Loader from '../component/Loader'
import { server } from '../redux/store'

const Payment = ({ route }) => {
    const navigate = useNavigation()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [loaderLoading, setLoaderLoading] = useState(false)

    const dispatach = useDispatch()
    const isFocused = useIsFocused()
    const stripe = useStripe()

    const { info, isAuthenticated } = useSelector((state) => state.user)
    const { cartItems } = useSelector((state) => state.cart)

    const loading = useOrderPlacedSuccessfully(
        dispatach,
        'orderplaced',
        () => ({
            type: 'clearCart',
        })
    )

    const redirectToLogin = () => {
        navigate.navigate('login')
    }
    const codHandler = (paymentInfo, paymentStatusInfo) => {
        const city = info.city
        const country = info.country
        const pincode = info.pincode
        const address = info.address
        const itemsPrice = route.params.itemsPrice
        const shippingCharges = route.params.shippingCost
        const totalAmount = route.params.total
        const taxPrice = route.params.tax

        dispatach(
            placeOrder(
                cartItems,
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
            )
        )
    }

    const onlineHandler = async () => {
        try {
            const {
                data: { client_secret },
            } = await axios.post(
                `${server}/orders/payment`,
                {
                    totalAmount: route.params.total,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )

            const init = await stripe.initPaymentSheet({
                paymentIntentClientSecret: client_secret,
                merchantDisplayName: 'Samarth-D-Valmiki',
            })
            if (init.error) {
                return Toast.show({
                    type: 'error',
                    text1: init.error.message,
                })
            }

            const presentSheet = await stripe.presentPaymentSheet()

            setLoaderLoading(true)

            if (presentSheet.error) {
                setLoaderLoading(false)
                console.log(presentSheet.error.message)
                return Toast.show({
                    type: 'error',
                    text1: presentSheet.error.message,
                })
            }

            const { paymentIntent } = await stripe.retrievePaymentIntent(
                client_secret
            )

            if (paymentIntent.status === 'Succeeded') {
                codHandler(paymentIntent.id, paymentIntent.status)
                setLoaderLoading(false)
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Server Timeout Error',
            })
        }
    }

    useState(() => {
        dispatach(loadUserInfo())
    }, [dispatach, isFocused])

    return loaderLoading ? (
        <Loader />
    ) : (
        <>
            <View style={defaultStyle}>
                <Header back={true} />
                <Heading
                    text1="Payment"
                    text2="Method"
                    containerStyle={{
                        paddingTop: 60,
                    }}
                />
                <View style={styles.container}>
                    <Image
                        source={{
                            uri: 'https://www.swipez.in/blog/media/posts/23/2933578.jpg',
                        }}
                        style={{
                            width: 250,
                            height: '40%',
                            resizeMode: 'contain',
                        }}
                    />
                    <RadioButton.Group
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                    >
                        <View style={styles.radio}>
                            <Text
                                style={styles.radioText}
                                onPress={() => setPaymentMethod('COD')}
                            >
                                Cash On Delivery
                            </Text>
                            <RadioButton color={Colors.color1} value="COD" />
                        </View>
                        <View style={styles.radio}>
                            <Text
                                style={styles.radioText}
                                onPress={() => setPaymentMethod('ONLINE')}
                            >
                                Pay Online
                            </Text>
                            <RadioButton color={Colors.color1} value="ONLINE" />
                        </View>
                    </RadioButton.Group>
                </View>
                <TouchableOpacity
                    disabled={loading}
                    onPress={
                        !isAuthenticated
                            ? redirectToLogin
                            : paymentMethod === 'COD'
                            ? () => codHandler()
                            : () => onlineHandler()
                    }
                >
                    {paymentMethod && (
                        <Button
                            loading={loading}
                            disabled={loading}
                            style={styles.btn}
                            textColor="white"
                            icon={paymentMethod === 'COD' ? 'check-circle' : ''}
                        >
                            {paymentMethod === 'COD' ? 'Place Order' : 'Pay'}
                        </Button>
                    )}
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color3,
        padding: 30,
        borderRadius: 10,
        marginVertical: 20,
        flex: 1,
        justifyContent: 'center',
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    radioText: {
        fontWeight: '600',
        fontSize: 18,
        textTransform: 'uppercase',
        color: Colors.color2,
    },
    btn: {
        backgroundColor: Colors.color3,
        borderRadius: 100,
        margin: 10,
        padding: 10,
    },
})

export default Payment
