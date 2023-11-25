import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Colors, defaultStyle } from '../styles/Styles'
import Header from '../component/Header'
import Carousel from 'react-native-snap-carousel'
import { Avatar, Button } from 'react-native-paper'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { getProductDetails } from '../redux/actions/productAction'
import Loader from '../component/Loader'

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = SLIDER_WIDTH

export const iconOptions = {
    size: 18,
    style: {
        borderRadius: 5,
        backgroundColor: Colors.color5,
        height: 25,
        width: 25,
    },
}

const ProductDetails = ({ route }) => {
    const isCarousel = useRef(null)

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const { product, loading } = useSelector((state) => state.product)

    const decrement = () => {
        if (quantity <= 1) return
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }
    const increment = () => {
        if (product.stock <= quantity)
            return Toast.show({
                type: 'error',
                text1: 'Maximum number added',
            })
        setQuantity((prev) => prev + 1)
    }

    const addToCartHandler = () => {
        if (product.stock === 0) {
            return Toast.show({
                type: 'error',
                text1: 'Out of Stock',
                text2: 'Sorry, this product is out of stock',
            })
        }
        if (product.stock > 0) {
            dispatch({
                type: 'addToCart',
                payload: {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    image: product?.images[0]?.url,
                    stock: product.stock,
                    quantity: quantity,
                },
            })
            Toast.show({
                type: 'success',
                text1: 'Added to cart',
            })
        }
    }

    useEffect(() => {
        dispatch(getProductDetails(route.params._id))
    }, [dispatch, route.params._id, isFocused])
    return (
        <View
            style={{
                ...defaultStyle,
                padding: 0,
                backgroundColor: Colors.color1,
            }}
        >
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Header back={true} />

                    {/* Carosousil' */}

                    <Carousel
                        layout="stack"
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        ref={isCarousel}
                        data={product.images}
                        renderItem={carouselItem}
                    />

                    <View
                        style={{
                            backgroundColor: Colors.color2,
                            padding: 35,
                            flex: 1,
                            marginTop: -380,
                            borderTopLeftRadius: 55,
                            borderTopRightRadius: 55,
                        }}
                    >
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: 25,
                            }}
                        >
                            {product.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '900',
                            }}
                        >
                            ₹ {product.price}
                        </Text>
                        <Text
                            style={{
                                letterSpacing: 1,
                                lineHeight: 20,
                                marginVertical: 15,
                            }}
                            numberOfLines={8}
                        >
                            {product.description}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: 5,
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.color3,
                                    fontWeight: '300',
                                }}
                            >
                                Quantity Left
                            </Text>
                            <View
                                style={{
                                    width: 80,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity onPress={decrement}>
                                    <Avatar.Icon
                                        icon={'minus'}
                                        {...iconOptions}
                                    />
                                </TouchableOpacity>
                                <Text style={style.quantityStyle}>
                                    {quantity}
                                </Text>
                                <TouchableOpacity onPress={increment}>
                                    <Avatar.Icon
                                        icon={'plus'}
                                        {...iconOptions}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={addToCartHandler}
                        >
                            <Button
                                icon={'cart'}
                                style={style.btn}
                                textColor={Colors.color2}
                            >
                                Add To Cart
                            </Button>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    )
}

const carouselItem = ({ item, index }) => (
    <View style={style.container} key={index}>
        <Image source={{ uri: item.url }} style={style.image} />
    </View>
)

const style = StyleSheet.create({
    container: {
        backgroundColor: Colors.color1,
        width: ITEM_WIDTH,
        paddingVertical: 48,
        height: 380,
    },
    image: {
        width: ITEM_WIDTH,
        resizeMode: 'contain',
        height: 250,
    },
    quantityStyle: {
        backgroundColor: Colors.color4,
        height: 25,
        width: 25,
        textAlignVertical: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.color5,
    },
    btn: {
        backgroundColor: Colors.color3,
        borderRadius: 100,
        padding: 5,
        marginVertical: 35,
    },
})

export default ProductDetails
