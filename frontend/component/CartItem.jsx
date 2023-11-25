import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { Avatar } from 'react-native-paper'
import { iconOptions } from '../screens/ProductDetails'
import { useNavigation } from '@react-navigation/native'

const CartItem = ({
    name,
    price,
    stock,
    quantity,
    imgSrc,
    _id,
    incrementHandler,
    index,
    decrementHandler,
    navigate,
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 100,
                marginVertical: 20,
            }}
        >
            <View
                style={{
                    width: '40%',
                    backgroundColor:
                        index % 2 === 0 ? Colors.color1 : Colors.color3,
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                }}
            >
                <Image
                    source={{ uri: imgSrc }}
                    style={{
                        width: 200,
                        height: '100%',
                        resizeMode: 'contain',
                        top: '-20%',
                        left: '10%',
                    }}
                />
            </View>
            <View
                style={{
                    width: '40%',
                    paddingHorizontal: 25,
                }}
            >
                <Text
                    numberOfLines={1}
                    style={{ fontSize: 17 }}
                    onPress={() => navigate.navigate('productdetails', { _id })}
                >
                    {name}
                </Text>
                <Text
                    numberOfLines={1}
                    style={{ fontSize: 17, fontWeight: '900' }}
                    onPress={() => navigate.navigate('productdetails', { _id })}
                >
                    ₹ {price}
                </Text>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    width: '20%',
                    height: 80,
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() =>
                        decrementHandler(
                            _id,
                            name,
                            stock,
                            imgSrc,
                            price,
                            quantity
                        )
                    }
                >
                    <Avatar.Icon icon={'minus'} size={20} {...iconOptions} />
                </TouchableOpacity>
                <Text
                    style={{
                        backgroundColor: Colors.color4,
                        height: 25,
                        width: 25,
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        borderRadius: 5,
                        borderColor: Colors.color5,
                        borderWidth: 1,
                    }}
                >
                    {quantity}
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        incrementHandler(
                            _id,
                            name,
                            stock,
                            imgSrc,
                            price,
                            quantity
                        )
                    }
                >
                    <Avatar.Icon icon={'plus'} size={20} {...iconOptions} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartItem
