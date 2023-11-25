import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import { Avatar } from 'react-native-paper'
import { Colors, defaultStyle } from '../styles/Styles'
import * as ImagePicker from 'expo-image-picker'

const CameraComponent = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(false)

    const [type, setType] = useState(CameraType.back)

    const [camera, setCamera] = useState(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const openImagePicker = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult === false) {
            return alert('Permission to access gallery is required')
        }

        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (route.params?.NewProduct === true) {
            return navigation.navigate('newproduct', {
                image:
                    Platform.OS === 'android' ? data.assets[0].uri : data.assets[0].uri,
            })
        }
        if (route.params?.updateProduct === true) {
            return navigation.navigate('productimages', {
                image:
                    Platform.OS === 'android' ?data.assets[0].uri : data.assets[0].uri,
            })
        }
        if (route.params?.updateProfile === true) {
            return navigation.navigate('profile', {
                image:
                    Platform.OS === 'android'
                        ? data.assets[0].uri
                        : data.assets[0].uri,
            })
        } else {
            return navigation.navigate('signup', {
                image:
                    Platform.OS === 'android'
                        ? data.assets[0].uri
                        : data.assets[0].uri,
            })
        }
    }

    const ClickPicture = async () => {
        const data = await camera.takePictureAsync();


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;}
        

        if (route.params?.NewProduct === true) {
            return navigation.navigate('newproduct', {
                image:
                    Platform.OS === 'android' ? data.uri : data.uri,
            })
        }
        if (route.params?.updateProduct === true) {
            return navigation.navigate('productimages', {
                image:
                    Platform.OS === 'android' ? data.uri : data.uri,
            })
        }
        if (route.params?.updateProfile === true) {
            return navigation.navigate('profile', {
                image:
                    Platform.OS === 'android'
                        ? data.uri
                        : data.uri,
            })
        } else {
            return navigation.navigate('signup', {
                image:
                    Platform.OS === 'android'
                        ? data.uri
                        : data.uri,
            })
        }

        
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
             <Camera type={type} style={{ flex: 1, aspectRatio: 1 }} ratio="1:1" ref={(e) => setCamera(e)} />
            <View
                style={{
                    flexDirection: 'row',
                    bottom: 10,
                    width: '100%',
                    justifyContent: 'space-evenly',
                    position: 'absolute',
                    padding: 15,
                }}
            >
                <MyIcon icon={'image'} handler={openImagePicker} />

                <MyIcon icon={'camera'} handler={ClickPicture} />

                <MyIcon
                    icon={'camera-flip'}
                    handler={() => {
                        setType((prev) =>
                            prev === CameraType.back
                                ? CameraType.front
                                : CameraType.back
                        )
                    }}
                />
            </View>
        </View>
    )
}

const MyIcon = ({ icon, handler }) => (
    <TouchableOpacity onPress={handler}>
        <Avatar.Icon
            icon={icon}
            size={40}
            color={Colors.color2}
            style={{
                backgroundColor: Colors.color1,
            }}
        />
    </TouchableOpacity>
)

export default CameraComponent
