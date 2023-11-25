import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native'
import React, { useEffect } from 'react'
import { Colors, defaultStyle } from '../../styles/Styles'
import Header from '../../component/Header'
import { useState } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import CmageCard from '../../component/CmageCart'
import { useMessageAndErrorProductUpdated } from '../../utils/hooks'
import { useDispatch } from 'react-redux'
import mime from 'mime'
import {
    deleteProductImage,
    updateProductImage,
} from '../../redux/actions/otherAction'

const ProductImages = ({ route }) => {
    const navigate = useNavigation()
    const dispatch = useDispatch()

    const [images, setImages] = useState(route.params.images)

    const [image, setImage] = useState(null)
    const [_id, setId] = useState(route.params.id)

    const [imageChanged, setImageChanged] = useState(false)

    const loading = useMessageAndErrorProductUpdated(dispatch, 'adminpanel')

    const submitHandler = () => {
        const myForm = new FormData()
        myForm.append('file', {
            uri: image,
            type: mime.getType(image),
            name: image.split('/').pop(),
        })

        dispatch(updateProductImage(_id, myForm))
    }
    const deleteHandler = (imageId) => {
        dispatch(deleteProductImage(_id, imageId))
    }

    useEffect(() => {
        if (route.params?.image) {
            setImage(route.params.image)
            setImageChanged(true)
        }
    }, [route.params])

    return (
        <View style={{ ...defaultStyle, backgroundColor: Colors.color5 }}>
            <Header back={true} />
            {/* Heading */}
            <View
                style={{
                    marginBottom: 20,
                    paddingTop: 70,
                }}
            >
                <Text style={styles.heading}>Images</Text>
            </View>
            <ScrollView style={{ marginBottom: 20 }}>
                <View
                    style={{
                        backgroundColor: Colors.color2,
                        padding: 40,
                        minHeight: 400,
                    }}
                >
                    {images.map((i) => (
                        <CmageCard
                            key={i._id}
                            _id={i._id}
                            src={i.url}
                            deleteHandler={deleteHandler}
                        />
                    ))}
                </View>
            </ScrollView>
            <View
                style={{
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: Colors.color3,
                }}
            >
                <Image
                    style={{
                        backgroundColor: Colors.color2,
                        width: 100,
                        height: 100,
                        alignSelf: 'center',
                        resizeMode: 'contain',
                    }}
                    source={{ uri: image }}
                />
                <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>
                            navigate.navigate('camera', { updateProduct: true })
                        }
                    >
                        <Avatar.Icon
                            icon={'camera'}
                            size={30}
                            color={Colors.color3}
                            style={{
                                backgroundColor: Colors.color2,
                                margin: 10,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <Button
                    style={{ backgroundColor: Colors.color1, padding: 6 }}
                    textColor={Colors.color2}
                    loading={loading}
                    onPress={() => submitHandler()}
                    disabled={!imageChanged}
                >
                    Add
                </Button>
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

export default ProductImages
