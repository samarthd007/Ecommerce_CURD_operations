import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { Colors, defaultStyle, inputStyling } from '../styles/Styles'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Footer from '../component/Footer'
import Header from '../component/Header'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../redux/actions/otherAction'
import Toast from 'react-native-toast-message'
import { useMessageAndErrorOther } from '../utils/hooks'

const ChangePassword = () => {
    const [password, setPassword] = useState('')
    const [reEnter, setReEnter] = useState('')
    const [oldPassword, setOldPassword] = useState('')

    const dispatch = useDispatch()
    const loading = useMessageAndErrorOther(dispatch)

    const navigate = useNavigation()

    const submitHandler = () => {
        if (password !== reEnter) {
            return Toast.show({
                type: 'error',
                text1: `New password didn't match`,
            })
        }
        dispatch(updatePassword(oldPassword, password))
        setPassword('')
        setReEnter('')
        setOldPassword('')
    }

    return (
        <View style={{ ...defaultStyle, backgroundColor: Colors.color2 }}>
            {/* Heading */}

            <Header back={true} />

            <View
                style={{
                    marginBottom: 20,
                    paddingTop: 70,
                }}
            >
                <Text style={styles.heading}>Update Password </Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    padding: 20,
                    elevation: 10,
                    borderRadius: 10,
                    backgroundColor: Colors.color3,
                }}
            >
                <View>
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="Old Password"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="Enter-Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="Re-Enter Password"
                        value={reEnter}
                        onChangeText={setReEnter}
                    />

                    <Button
                        loading={loading}
                        style={styles.btn}
                        textColor="white"
                        disabled={
                            password === '' ||
                            reEnter === '' ||
                            oldPassword === ''
                        }
                        onPress={submitHandler}
                    >
                        Update Profile
                    </Button>
                </View>
            </ScrollView>
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
})

export const defaultImg =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH8AfwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAgMBB//EADYQAAICAQEDCAkDBQEAAAAAAAABAgMEEQUGIRITMTJBUXHhI1JhYpGTobHBFiJUQnKBktEU/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9wAAAAAAAABEzto0Ya0sbc+yEekqbN4Lm/R01xXvNsDQgz9W8FifpqIte49GW+Hm0ZlfKplxXWi+lASQAAAAAAAAAAAAAj5+SsTFnc+LXCK72SCi3msfoK0+HGT+y/IFJZZK2bssk5SlxbfacgFQPXGyLMa6NtT0lH6ruPIAbbHujfTC2HVmtUehU7uWOWFKDfUm9PB8f+lsRQAAAAAAAAAACg3mi+cx59jjJfYvyBtrFeThS5ta2QfKj7fYBlAAVAA+qLk1GKbbeiSA0O7UWsW2T6HZovgi4I2zsb/y4ldT6yWsvF9JJIoAAAAAAAAAAAOZzjXFynJRiult6aFdftzErekOXa/cXD6geO0tjc7OV2K4xk+tB8E/Ap7MDLreksez/ABHX7FpLeHjwxuHtn5Hz9Qv+KvmeQFbVs7MtaUcexe2S0X1LzZeyI4r525qd3Zp0R8yL+on/ABV8zyOo7wrX92M0vZPyAvAV1G2sO3RSlKpv11+UWEZKS1i00+1MD6AAAAAAAAQ9o7Qrwa9WuVZLqwXb5EqyShCU5dEVqzG5eRPJyJ22dLfBdy7EB9y8u/Lnyrp690V0LwPAAqAAAAAAScPOvw5a1S/b2wfQyMANhgZtWbVy6+El1oPpRKMds/KliZULV1ddJrvRsSKAAAAAIe2LOb2be++PJ+L0MiabeJ6bO077IozIAAFQAAAAAAAANphT5zEon61cX9DFmu2O9dmUf26fUipgAAAACs3hg5bObX9M039vyZg3E4Rsg4TSlGS0afaUOdsKcW54b5UfUb4rwYFKDu2qymXJthKD7pLQ4KgAAAAAAHUISm1GuLlJ9iWrA5NdsiLhs6hP1dfjxKvZ+xZykrMxcmK482nxfiX6SS0XBLuIr6AAAAAAADmcIWR5NkYyXdJakO3ZGFY9eZUX7jaJwAqJ7v4z6ltsfHRnk93o9mS/9PMvABRrd5duU/l+Z3Dd+pdfIsfgki5AFdXsXChxcJTfvSZOqpqpWlVcYL3VodgAAAAAA//Z'

export default ChangePassword
