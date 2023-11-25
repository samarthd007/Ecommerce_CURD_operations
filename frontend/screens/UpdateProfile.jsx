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
import { updateProfile } from '../redux/actions/otherAction'
import { useMessageAndErrorOther } from '../utils/hooks'

const UpdateProfile = () => {
    const { user } = useSelector((state) => state.user)
    const [email, setEmail] = useState(user?.user?.email)
    const [avatar, setAvatar] = useState()
    const [name, setName] = useState(user?.user?.name)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [conutry, setCountry] = useState('')
    const [pincode, setPincode] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigation()
    const loading = useMessageAndErrorOther(dispatch, 'profile')

    const submitHandler = () => {
        dispatch(updateProfile(email, name, address, city, conutry, pincode))
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
                <Text style={styles.heading}>Edit Profile </Text>
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
                <View style={{ minHeight: 650 }}>
                    <Avatar.Image
                        style={{
                            alignSelf: 'center',
                            backgroundColor: Colors.color1,
                        }}
                        size={80}
                        source={{
                            uri: avatar ? avatar : defaultImg,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => navigate.navigate('camera')}
                    >
                        <Button textColor="white">+Change photo</Button>
                    </TouchableOpacity>
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
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
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="Country"
                        value={conutry}
                        onChangeText={setCountry}
                    />
                    <TextInput
                        style={inputStyling}
                        mode={'outlined'}
                        activeOutlineColor={Colors.color1}
                        placeholder="Pincode"
                        value={pincode}
                        onChangeText={setPincode}
                        keyboardType="numeric"
                    />

                    <Button
                        loading={loading}
                        style={styles.btn}
                        textColor="white"
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
export default UpdateProfile
