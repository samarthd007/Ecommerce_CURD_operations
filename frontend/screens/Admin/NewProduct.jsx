import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { Colors, defaultStyle, inputStyling } from '../../styles/Styles'
import Loader from '../../component/Loader'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import SelectComponet from '../../component/SelectComponet'
import {
    useMessageAndErrorAddCategory,
    useSetCategories,
} from '../../utils/hooks'
import { useDispatch } from 'react-redux'
import mime from 'mime'
import { createProduct } from '../../redux/actions/otherAction'

const NewProduct = ({ route }) => {
    const dispatch = useDispatch()
    const navigate = useNavigation()
    const isFocused = useIsFocused()

    const loadingOther = false
    const [visible, setVisible] = useState(false)

    const [name, setName] = useState('')

    const [image, setImage] = useState('')

    const [description, setDescription] = useState('')

    const [price, setPrice] = useState('')

    const [stock, setStock] = useState('')

    const [category, setCategory] = useState('Choose category')

    const [categoryId, setCategoryId] = useState(undefined)

    const [categories, setCategories] = useState([])

    useSetCategories(setCategories, isFocused)

    const condition = !name || !stock || !image || !price || !description

    const submitHandler = () => {
        const myForm = new FormData()
        myForm.append('name', name)
        myForm.append('stock', stock)
        myForm.append('price', price)
        myForm.append('description', description)
        myForm.append('file', {
            uri: image,
            type: mime.getType(image),
            name: image.split('/').pop(),
        })

        if (categoryId) {
            myForm.append('category', categoryId)
        }
        dispatch(createProduct(myForm))
    }

    const loading = useMessageAndErrorAddCategory(dispatch, 'adminpanel')

    useEffect(() => {
        if (route.params?.image) {
            setImage(route.params.image)
            route.params.image = ''
        }
    }, [route.params])

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
                    <Text style={styles.heading}>New Product</Text>
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
                            <View
                                style={{
                                    width: 80,
                                    height: 80,
                                    alignSelf: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <Avatar.Image
                                    size={80}
                                    style={{ backgroundColor: Colors.color1 }}
                                    source={{ uri: image ? image : null }}
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        navigate.navigate('camera', {
                                            NewProduct: true,
                                        })
                                    }
                                >
                                    <Avatar.Icon
                                        icon={'camera'}
                                        size={30}
                                        color={Colors.color3}
                                        style={{
                                            backgroundColor: 'white',
                                            position: 'absolute',
                                            bottom: 0,
                                            right: -5,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={inputStyling}
                                mode={'outlined'}
                                activeOutlineColor={Colors.color1}
                                placeholder="Name"
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={inputStyling}
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
                                onChangeText={setStock}
                                keyboardType="number-pad"
                            />
                            <Text
                                style={{
                                    ...inputStyling,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    borderRadius: 3,
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
                                loading={loading}
                                disabled={condition || loading}
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

export default NewProduct
