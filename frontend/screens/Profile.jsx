import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, defaultStyle } from '../styles/Styles'
import { Avatar, Button } from 'react-native-paper'
import { useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { defaultImg } from './SignUp'
import ButtonBox from '../component/ButtonBox'
import Footer from '../component/Footer'
import Loader from '../component/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logoutUser } from '../redux/actions/userAction'
import {
    useMessageAndErrorOther,
    useMessageAndErrorUserLogout,
} from '../utils/hooks'
import mime from 'mime'
import { updateProfilePic } from '../redux/actions/otherAction'

const Profile = ({ route }) => {
    const { user } = useSelector((state) => state.user)

    const [avatar, setAvatar] = useState(defaultImg)

    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const navigate = useNavigation()

    const loading = useMessageAndErrorUserLogout(dispatch, 'login')

    const logoutHandler = () => {
        dispatch(logoutUser())
    }

    const loadingPic = useMessageAndErrorOther(dispatch, null, loadUser)

    useEffect(() => {
        if (route.params?.image) {
            setAvatar(route.params.image)
            const myForm = new FormData()
            myForm.append('file', {
                uri: route.params.image,
                type: mime.getType(route.params.image),
                name: route.params.image.split('/').pop(),
            })
            dispatch(updateProfilePic(myForm))
            route.params.image = ''
        }
        dispatch(loadUser())
    }, [route.params, dispatch, isFocused])

    useEffect(() => {
        if (user?.avatar) {
            setAvatar(user.avatar.url)
        }
    }, [user])

    return (
        <>
            <View style={defaultStyle}>
                <View
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <Text style={styles.heading}>Profile</Text>
                </View>

                {/* Loading */}
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <View style={styles.container}>
                            <Avatar.Image
                                source={{ uri: avatar ? avatar : defaultImg }}
                                style={{ backgroundColor: Colors.color1 }}
                                size={100}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    navigate.navigate('camera', {
                                        updateProfile: true,
                                    })
                                }
                                disabled={loadingPic}
                            >
                                <Button
                                    disabled={loadingPic}
                                    loading={loadingPic}
                                    textColor="white"
                                >
                                    Change Photo
                                </Button>
                            </TouchableOpacity>
                            <Text style={styles.name}>{user?.user?.name}</Text>
                            <Text
                                style={{
                                    fontWeight: '300',
                                    color: Colors.color2,
                                }}
                            >
                                {user?.user?.email}
                            </Text>
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
                                    handler={() => navigate.navigate('orders')}
                                    text={'Orders'}
                                    icon={'format-list-bulleted-square'}
                                />
                                {user?.user?.role === 'admin' && (
                                    <ButtonBox
                                        handler={() =>
                                            navigate.navigate('adminpanel')
                                        }
                                        icon={'view-dashboard'}
                                        text={'Admin'}
                                        reverse={true}
                                    />
                                )}
                                {user?.user?.role === 'user' && (
                                    <ButtonBox
                                        handler={() =>
                                            navigate.navigate('buyagain')
                                        }
                                        icon={'view-dashboard'}
                                        text={'Buy Again'}
                                        reverse={true}
                                    />
                                )}
                                <ButtonBox
                                    handler={() =>
                                        navigate.navigate('updateprofile')
                                    }
                                    icon={'pencil'}
                                    text={'Profile'}
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    margin: 10,
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <ButtonBox
                                    handler={() =>
                                        navigate.navigate('changepassword')
                                    }
                                    icon={'pencil'}
                                    text={'Password'}
                                />
                                <ButtonBox
                                    handler={logoutHandler}
                                    icon={'exit-to-app'}
                                    text={'Logout'}
                                />
                            </View>
                        </View>
                    </>
                )}
            </View>
            <Footer />
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
export default Profile
