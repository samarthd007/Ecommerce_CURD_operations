import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { Avatar } from 'react-native-paper'

const CategoryCard = ({ name, _id, key, deletehandler }) => {
    return (
        <View
            style={{
                backgroundColor: Colors.color2,
                elevation: 5,
                margin: 10,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 10,
            }}
        >
            <Text
                style={{
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                }}
            >
                {name}
            </Text>
            <TouchableOpacity onPress={() => deletehandler(_id)}>
                <Avatar.Icon
                    icon={'delete'}
                    size={30}
                    style={{ backgroundColor: Colors.color1 }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default CategoryCard
