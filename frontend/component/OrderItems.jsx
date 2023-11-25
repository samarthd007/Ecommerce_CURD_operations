import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const OrderItems = ({
    _id,
    price,
    name,
    address,
    createdAt,
    key,
    status,
    paymentMethod,
    updateHandler,
    admin = false,
    loading,
    i = 0,
    detail,
}) => {
    const navigate = useNavigation()
    const getDetails = () => {
        navigate.navigate('getdetail', {
            detail,
            paymentMethod,
            address,
            status,
            createdAt,
            price,
        })
    }
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: i % 2 === 0 ? Colors.color2 : Colors.color3,
            }}
        >
            <Text
                style={{
                    ...styles.text,
                    backgroundColor:
                        i % 2 === 0 ? Colors.color3 : Colors.color1,
                }}
            >
                ID: #{_id}
            </Text>
            <Textbox title={'Address'} value={address} i={i} />
            <Textbox title={'Ordered-On'} value={createdAt} i={i} />
            <Textbox title={'Price'} value={price} i={i} />
            <Textbox title={'Payment Method'} value={paymentMethod} i={i} />
            <Textbox title={'Status'} value={status} i={i} />

            <Button
                mode={'outlined'}
                textColor={i % 2 === 0 ? Colors.color3 : Colors.color2}
                style={{
                    width: 120,
                    alignSelf: 'center',
                    marginTop: 20,
                }}
                loading={loading}
                disabled={loading}
                onPress={() => getDetails()}
            >
                details
            </Button>
            {admin && (
                <Button
                    icon={'update'}
                    mode={'outlined'}
                    textColor={i % 2 === 0 ? Colors.color3 : Colors.color2}
                    style={{
                        width: 120,
                        alignSelf: 'center',
                        marginTop: 20,
                    }}
                    loading={loading}
                    disabled={loading}
                    onPress={() => updateHandler(_id)}
                >
                    Update
                </Button>
            )}
        </View>
    )
}

const Textbox = ({ title, value, i }) => (
    <Text
        style={{
            marginVertical: 6,
            color: i % 2 === 0 ? Colors.color3 : Colors.color2,
        }}
    >
        <Text style={{ fontWeight: '900' }}> {title} - </Text>
        {title === 'Price' ? ' ₹ ' : ''}
        <Text>{value}</Text>
    </Text>
)

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
        borderRadius: 10,
        elevation: 5,
        marginVertical: 10,
    },
    text: {
        color: Colors.color2,
        fontSize: 16,
        fontWeight: '900',
        marginHorizontal: -20,
        marginTop: -20,
        marginBottom: 10,
        paddingVertical: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
    },
})

export default OrderItems
