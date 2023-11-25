import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../styles/Styles'
import { Avatar } from 'react-native-paper'
import { useSelector } from 'react-redux'

const Footer = ({ activeRoute = 'home' }) => {
    const navigate = useNavigation()

    const { loading, isAuthenticated } = useSelector((state) => state.user)

    const navigationHandler = (key) => {
        switch (key) {
            case 0:
                navigate.navigate('home')

                break

            case 1:
                navigate.navigate('cart')
                break

            case 2:
                if (isAuthenticated) navigate.navigate('profile')
                else navigate.navigate('login')
                break

            default:
                navigate.navigate('home')
                break
        }
    }

    return (
        loading === false && (
            <View
                style={{
                    backgroundColor: Colors.color1,
                    borderTopRightRadius: 120,
                    borderTopLeftRadius: 120,
                    position: 'absolute',
                    width: '100%',
                    bottom: 2,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigationHandler(1)}
                    >
                        <Avatar.Icon
                            color={Colors.color2}
                            size={50}
                            style={{
                                backgroundColor: Colors.color1,
                            }}
                            icon={
                                activeRoute === 'cart'
                                    ? 'shopping'
                                    : 'shopping-outline'
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigationHandler(2)}
                    >
                        <Avatar.Icon
                            color={Colors.color2}
                            size={50}
                            style={{
                                backgroundColor: Colors.color1,
                            }}
                            icon={
                                isAuthenticated === false
                                    ? activeRoute === 'profile'
                                        ? 'login'
                                        : 'login'
                                    : activeRoute === 'profile'
                                    ? 'account'
                                    : 'account-outline'
                            }
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: 80,
                        height: 80,
                        backgroundColor: Colors.color2,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: -50,
                        alignSelf: 'center',
                    }}
                >
                    <View
                        style={{
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigationHandler(0)}
                        >
                            <Avatar.Icon
                                color={Colors.color2}
                                size={50}
                                style={{
                                    backgroundColor: Colors.color1,
                                }}
                                icon={
                                    activeRoute === 'home'
                                        ? 'home'
                                        : 'home-outline'
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    )
}

export default Footer
