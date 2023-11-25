import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { Colors } from '../styles/Styles'

const Loader = () => {
    return (
        <ActivityIndicator
            style={{
                top: '50%',
                position: 'absolute',
                alignSelf: 'center',
            }}
            size={100}
            color={Colors.color3}
        />
    )
}

export default Loader
