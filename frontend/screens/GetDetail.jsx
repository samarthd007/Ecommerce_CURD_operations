import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { Colors, defaultStyle } from '../styles/Styles'
import Header from '../component/Header'

const GetDetail = ({ route }) => {
    const products = route.params.detail

    return (
        <View style={{ ...defaultStyle, backgroundColor: Colors.color5 }}>
            <Header back={true} />
            <View
                style={{
                    marginBottom: 20,
                    paddingTop: 70,
                }}
            >
                <Text style={styles.heading}>Order Details </Text>
            </View>

            <View style={{ padding: 10, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.label}>Delivery Address:</Text>
                        <Text style={styles.addressText}>
                            {route.params.address}
                        </Text>
                        <Text style={styles.label}>Ordered on:</Text>
                        <Text style={styles.addressText}>
                            {route.params.createdAt}
                        </Text>
                    </View>

                    <View style={styles.productContainer}>
                        <Text style={styles.productName}>Products</Text>
                        <View style={styles.productContainer}>
                            {products.map((product, index) => (
                                <View key={index} style={styles.productItem}>
                                    <Image
                                        style={styles.productImage}
                                        source={{ uri: product.image }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: '600',
                                            marginBottom: 8,
                                            color: '#333',
                                            padding: 10,
                                        }}
                                    >{`${product.name} x${product.quantity}`}</Text>
                                    <Text
                                        style={styles.productPrice}
                                    >{`₹ ${product.price}`}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 8,
                        }}
                    >
                        <Text style={styles.label}>Total Price: </Text>
                        <Text
                            style={{
                                paddingHorizontal: 8,
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginBottom: 8,
                                color: '#333',
                            }}
                        >
                            ₹ {route.params.price}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',

                            alignItems: 'center',
                            padding: 8,
                            marginBottom: 8,
                        }}
                    >
                        <Text style={styles.label}>Payment Method:</Text>
                        <Text
                            style={{
                                paddingHorizontal: 8,
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginBottom: 8,
                                color: '#333',
                            }}
                        >
                            {route.params.paymentMethod}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 8,
                        }}
                    >
                        <Text style={styles.label}>Order Status:</Text>
                        <Text
                            style={{
                                paddingHorizontal: 8,
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginBottom: 8,
                                color: '#333',
                            }}
                        >
                            {route.params.status}
                        </Text>
                    </View>
                </ScrollView>
            </View>
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
    addressContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    addressText: {
        fontSize: 16,
        marginBottom: 12,
        color: '#555',
    },
    productName: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
        color: '#333',
        textAlign: 'center',
        padding: 10,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#201e1e',
        marginBottom: 16,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 12,
    },
    productContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
})

export default GetDetail
