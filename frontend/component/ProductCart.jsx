import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { Button } from 'react-native-paper'

const ProductCart = ({
    stock,
    name,
    price,
    image,
    _id,
    addToCardHandler,
    i,
    key,
    navigate,
}) => {
    return (
        <TouchableOpacity
            onPress={() => navigate.navigate('productdetails', { _id })}
            activeOpacity={1}
        >
            <View
                style={{
                    elevation: 10,
                    width: 230,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 20,
                    borderRadius: 20,
                    height: 400,
                    backgroundColor:
                        i % 2 === 0 ? Colors.color1 : Colors.color2,
                }}
            >
                <Image
                    source={{
                        uri: image,
                    }}
                    style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain',
                        position: 'absolute',
                        left: 50,
                        top: 105,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        padding: 20,
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Text
                        numberOfLines={3}
                        style={{
                            color: i % 2 === 0 ? Colors.color2 : Colors.color3,
                            fontSize: 25,
                            fontWeight: '300',
                            width: '60%',
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={{
                            color: i % 2 === 0 ? Colors.color2 : Colors.color3,
                            fontSize: 20,
                            fontWeight: '700',
                        }}
                    >
                        ₹{price}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor:
                            i % 2 === 0 ? Colors.color2 : Colors.color3,
                        borderRadius: 0,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        width: '100%',
                        paddingVertical: 5,
                    }}
                >
                    <Button
                        textColor={i % 2 === 0 ? Colors.color1 : Colors.color2}
                        onPress={() =>
                            addToCardHandler(_id, name, price, image, stock)
                        }
                    >
                        Add to Cart
                    </Button>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCart
