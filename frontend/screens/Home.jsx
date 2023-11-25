import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, defaultStyle } from '../styles/Styles'
import Header from '../component/Header'
import { Avatar, Button, Icon } from 'react-native-paper'
import SearchModel from '../component/SearchModel'
import ProductCart from '../component/ProductCart'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Footer from '../component/Footer'
import Heading from '../component/Heading'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsByFilter } from '../redux/actions/productAction'
import { useSetCategories } from '../utils/hooks'
import Toast from 'react-native-toast-message'

const Home = () => {
    const [category, setCategory] = useState('')
    const [activeSearch, setActiveSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [categories, setCategories] = useState([])

    const navigate = useNavigation()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const { products } = useSelector((state) => state.product)

    const categoryButtonHandler = (id) => {
        setCategory(id)
    }

    const addToCardHandler = (_id, name, price, image, stock) => {
        if (stock === 0) {
            return Toast.show({
                type: 'error',
                text1: 'Out of Stock',
                text2: 'Sorry, this product is out of stock',
            })
        }
        if (stock > 0) {
            dispatch({
                type: 'addToCart',
                payload: {
                    product: _id,
                    name,
                    price,
                    image,
                    stock,
                    quantity: 1,
                },
            })
            Toast.show({
                type: 'success',
                text1: 'Added to cart',
            })
        }
    }

    useSetCategories(setCategories, isFocused)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            dispatch(getAllProductsByFilter(searchQuery, category))
        }, 50)
        return () => {
            clearTimeout(timeOut)
        }
    }, [dispatch, searchQuery, category, isFocused])

    return (
        <>
            {activeSearch && (
                <SearchModel
                    searchQuery={searchQuery}
                    setActiveSearch={setActiveSearch}
                    setSearchQuery={setSearchQuery}
                    products={products}
                    setCategory={setCategory}
                    category={category}
                />
            )}
            <View style={defaultStyle}>
                <Header />
                <View
                    style={{
                        paddingTop: 70,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Heading />

                    {/* Serach bar */}
                    <View>
                        <TouchableOpacity
                            onPress={() => setActiveSearch((prev) => !prev)}
                        >
                            <Avatar.Icon
                                icon={'magnify'}
                                color="gray"
                                style={{
                                    backgroundColor: Colors.color2,
                                    elevation: 12,
                                }}
                                size={45}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View
                    style={{
                        flexDirection: 'row',
                        height: 80,
                    }}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                        }}
                    >
                        {categories.map((item, index) => (
                            <Button
                                key={item._id}
                                style={{
                                    backgroundColor:
                                        category === item._id
                                            ? Colors.color1
                                            : Colors.color5,
                                    borderRadius: 100,
                                    margin: 5,
                                }}
                                onPress={() => categoryButtonHandler(item._id)}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color:
                                            category === item._id
                                                ? 'white'
                                                : 'grey',
                                    }}
                                >
                                    {item.category}
                                </Text>
                            </Button>
                        ))}
                    </ScrollView>
                </View>

                {/* Products */}
                <View style={{ flex: 1 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {products.map((item, index) => (
                            <ProductCart
                                stock={item.stock}
                                price={item.price}
                                name={item.name}
                                image={item.images[0]?.url}
                                addToCardHandler={addToCardHandler}
                                _id={item._id}
                                key={item._id}
                                i={index}
                                navigate={navigate}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>

            <Footer />
        </>
    )
}

export default Home
