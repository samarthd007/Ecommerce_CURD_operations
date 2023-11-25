import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, defaultStyle, inputStyling } from '../styles/Styles'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Footer from '../component/Footer'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions/userAction'
import { useMessageAndErrorUser } from '../utils/hooks'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const loading = useMessageAndErrorUser(dispatch, 'profile')

    const navigate = useNavigation()

    const submitHandler = async () => {
        dispatch(login(email, password))
    }
    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: Colors.color2 }}>
                {/* Heading */}

                <View
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <Text style={styles.heading}>Login</Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        onPress={() => navigate.navigate('forgotpassword')}
                    >
                        <Text style={styles.forget}> Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        loading={loading}
                        style={styles.btn}
                        textColor="white"
                        disabled={email === '' || password === ''}
                        onPress={submitHandler}
                    >
                        Log In
                    </Button>
                    <Text style={styles.or}>OR</Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigate.navigate('signup')}
                    >
                        <Text style={styles.link}>Sign-Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer activeRoute="profile" />
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
})

export default Login
