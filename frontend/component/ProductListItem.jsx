import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { useState } from 'react'
import MyModel from './MyModel'

const ProductListItem = ({
    key,
    _id,
    price,
    name,
    stock,
    category,
    image,
    navigate,
    deleteProductHandler,
    i,
}) => {
    const [openModel, setOpenModel] = useState(false)

    return (
        <>
            <TouchableOpacity
                onPress={() => navigate.navigate('productdetails', { _id })}
                onLongPress={() => setOpenModel((prev) => !prev)}
                activeOpacity={0.9}
            >
                <View
                    style={{
                        ...styles.container,
                        backgroundColor:
                            i % 2 === 0 ? Colors.color1 : Colors.color3,
                    }}
                >
                    <Image
                        source={{ uri: image }}
                        style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    />
                    <Text
                        style={{ width: 50, color: Colors.color2 }}
                        numberOfLines={2}
                    >
                        ₹{price}
                    </Text>
                    <Text
                        style={{ maxWidth: 120, color: Colors.color2 }}
                        numberOfLines={2}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{ width: 50, color: Colors.color2 }}
                        numberOfLines={1}
                    >
                        {category}
                    </Text>
                    <Text
                        style={{ width: 45, color: Colors.color2 }}
                        numberOfLines={1}
                    >
                        {stock}
                    </Text>
                </View>
            </TouchableOpacity>
            {openModel && (
                <MyModel
                    _id={_id}
                    deleteProductHandler={deleteProductHandler}
                    navigate={navigate}
                    setOpenModel={setOpenModel}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
})

export default ProductListItem
