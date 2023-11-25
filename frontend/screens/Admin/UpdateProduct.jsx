import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { Colors, defaultStyle, inputStyling } from '../../styles/Styles'
import Loader from '../../component/Loader'
import { Button, TextInput } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import SelectComponet from '../../component/SelectComponet'
import {
    useMessageAndErrorProductUpdated,
    useSetCategories,
} from '../../utils/hooks'
import { getProductDetails } from '../../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { updateCreatedProduct } from '../../redux/actions/otherAction'

const UpdateProduct = ({ route }) => {
    const loadingOther = false

    const navigate = useNavigation()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const { product } = useSelector((state) => state.product)

    const [id] = useState(route.params._id)
    const [name, setName] = useState('')

    const [description, setDescription] = useState('')

    const [price, setPrice] = useState('')

    const [stock, setStock] = useState('')

    const [category, setCategory] = useState('Select category')

    const [categoryId, setCategoryId] = useState('')

    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState(false)

    useSetCategories(setCategories, isFocused)

    const submitHandler = () => {
        dispatch(
            updateCreatedProduct(
                id,
                name,
                price,
                description,
                categoryId,
                stock
            )
        )
    }

    const loading = useMessageAndErrorProductUpdated(dispatch, 'adminpanel')
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id, isFocused])

    useEffect(() => {
        if (product) {
            setName(product?.name)
            setDescription(product?.description)
            setPrice(product?.price)
            setStock(product?.stock)
            setCategoryId(product?.category)
        }
    }, [product])
    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: Colors.color5 }}>
                <Header back={true} />

                {/* Heading */}
                <View
                    style={{
                        marginBottom: 20,
                        paddingTop: 70,
                    }}
                >
                    <Text style={styles.heading}>Update Product</Text>
                </View>
                {loading ? (
                    <Loader />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            padding: 20,
                            elevation: 10,
                            borderRadius: 10,
                            backgroundColor: Colors.color3,
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                height: 650,
                            }}
                        >
                            <Button
                                onPress={() =>
                                    navigate.navigate('productimages', {
                                        id,
                                        images: product?.images,
                                    })
                                }
                                textColor={Colors.color1}
                            >
                                Manage Images
                            </Button>
                            <TextInput
                                style={inputStyling}
                                mode={'outlined'}
                                activeOutlineColor={Colors.color1}
                                placeholder="Name"
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={{
                                    ...inputStyling,
                                }}
                                mode={'outlined'}
                                activeOutlineColor={Colors.color1}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                            />
                            <TextInput
                                style={inputStyling}
                                mode={'outlined'}
                                activeOutlineColor={Colors.color1}
                                placeholder="Price"
                                value={price}
                                keyboardType="number-pad"
                                onChangeText={setPrice}
                            />
                            <TextInput
                                style={inputStyling}
                                mode={'outlined'}
                                activeOutlineColor={Colors.color1}
                                placeholder="Stock"
                                value={stock}
                                keyboardType="number-pad"
                                onChangeText={setStock}
                            />
                            <Text
                                style={{
                                    ...inputStyling,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    borderRadius: 3,
                                    fontWeight: '400',
                                    fontSize: 22,
                                }}
                                onPress={() => setVisible(true)}
                            >
                                {category}
                            </Text>
                            <Button
                                textColor="white"
                                style={{
                                    backgroundColor: Colors.color1,
                                    margin: 20,
                                    padding: 6,
                                }}
                                onPress={() => submitHandler()}
                                loading={loadingOther}
                                disabled={
                                    name === '' ||
                                    description === '' ||
                                    price === '' ||
                                    stock === '' ||
                                    category === ''
                                        ? true
                                        : false
                                }
                            >
                                Update
                            </Button>
                        </View>
                    </ScrollView>
                )}
            </View>
            <SelectComponet
                visible={visible}
                setVisible={setVisible}
                setCategory={setCategory}
                setCategoryId={setCategoryId}
                categories={categories}
            />
        </>
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
})

export default UpdateProduct
