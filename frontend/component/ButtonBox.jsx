import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { Avatar } from 'react-native-paper'

const ButtonBox = ({
    icon,
    text,
    handler,
    reverse = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: reverse ? Colors.color1 : Colors.color3,
                height: 80,
                width: 80,
                borderRadius: 20,
                alignItems: 'center',
            }}
            onPress={handler}
            disabled={loading}
        >
            <Avatar.Icon
                size={50}
                color={Colors.color2}
                style={{
                    backgroundColor: reverse ? Colors.color1 : Colors.color3,
                }}
                icon={icon}
            />
            <Text style={{ color: 'white', textAlign: 'center' }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ButtonBox
