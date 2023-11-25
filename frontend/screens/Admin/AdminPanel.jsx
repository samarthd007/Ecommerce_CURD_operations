import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { Colors, defaultStyle } from '../../styles/Styles'
import Loader from '../../component/Loader'
import ButtonBox from '../../component/ButtonBox'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ProductListHeading from '../../component/ProductListHeading'
import ProductListItem from '../../component/ProductListItem'
import { useDispatch } from 'react-redux'
import {
    useAdminProducts,
    useMessageAndErrorProductdeletion,
} from '../../utils/hooks'
import { deleteProduct } from '../../redux/actions/otherAction'
import { getAdminProducts } from '../../redux/actions/productAction'

const AdminPanel = () => {
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const { products, loading, outOfStock, inStock } = useAdminProducts(
        dispatch,
        isFocused
    )

    const navigationHandler = (text) => {
        switch (text) {
            case 'Category':
                navigate.navigate('categories')

                break
            case 'All-Orders':
                navigate.navigate('adminorders')

                break
            case 'Product':
                navigate.navigate('newproduct')

                break

            default:
                navigate.navigate('adminorders')
                break
        }
    }

    const deleteProductHandler = (id) => {
        id &&
            Alert.alert('Sure You want to delete the product?', '', [
                {
                    text: 'NO',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        dispatch(deleteProduct(id))
                    },
                },
            ])
    }

    useMessageAndErrorProductdeletion(dispatch, null, getAdminProducts)

    return (
        <View style={defaultStyle}>
            <Header back={true} />
            <View
                style={{
                    marginBottom: 20,
                    paddingTop: 70,
                }}
            >
                <Text style={styles.heading}>Admin</Text>
            </View>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <View
                        style={{
                            backgroundColor: Colors.color3,
                            borderRadius: 20,
                            alignItems: 'center',
                        }}
                    >
                        {/* <Chart inStock={10} outOfStock={3} /> */}
                    </View>

                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                margin: 10,
                                justifyContent: 'space-between',
                            }}
                        >
                            <ButtonBox
                                icon={'plus'}
                                text={'Product'}
                                handler={() => navigate.navigate('newproduct')}
                            />
                            <ButtonBox
                                icon={'format-list-bulleted-square'}
                                text={'All-Orders'}
                                handler={() => navigate.navigate('adminorders')}
                                reverse={true}
                            />
                            <ButtonBox
                                icon={'plus'}
                                text={'Category'}
                                handler={() => navigate.navigate('categories')}
                            />
                        </View>
                    </View>
                    <ProductListHeading />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {products &&
                                products.map((item, index) => (
                                    <ProductListItem
                                        key={item._id}
                                        _id={item._id}
                                        price={item.price}
                                        name={item.name}
                                        stock={item.stock}
                                        category={item.category?.category}
                                        image={item.images[0].url}
                                        navigate={navigate}
                                        deleteProductHandler={
                                            deleteProductHandler
                                        }
                                        i={index}
                                    />
                                ))}
                        </View>
                    </ScrollView>
                </>
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
        alignItems: 'center',
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
    name: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        color: Colors.color2,
    },
})

export default AdminPanel
